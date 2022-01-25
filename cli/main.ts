import { runPrompt } from "./modules/prompt.ts";
import {
  Command,
  ITypeInfo,
  ValidationError,
} from "https://deno.land/x/cliffy/command/mod.ts";
import * as log from "https://deno.land/std/log/mod.ts";
import { validateAlgorithm, validateWebsite } from "./models/validator.ts";
import { runConfig } from "./modules/config.ts";

const command = await new Command()
  .name("simp")
  .description("Simple password manager")
  .version("0.0.1")
  .option("-c, --config", "re-start config.")
  .type("algorithm", ({ value }: ITypeInfo): string => {
    validateAlgorithm(value);
    return value;
  })
  .arguments("[algorithm:algorithm]")
  .option("-a, --algorithm <value:algorithm>", "Your algorithm.")
  .option(
    "-p, --password <string>",
    "use the specified password instead",
  )
  .type("website", ({ label, name, value }: ITypeInfo): string => {
    const error = validateWebsite(value);
    if (typeof error === "string") {
      throw new ValidationError(
        `${label} "${name}" must be a valid website.Error: "${error}"`,
      );
    }
    return value;
  })
  .arguments("[website:website]")
  .option(
    "-w, --website <value:website>",
    "use the specified website instead",
  )
  .command(
    "config",
    new Command()
      .description("Configure the password manager")
      .action(
        async () => {
          await runConfig();
          Deno.exit(0);
        },
      ),
  );

let options: {
  algorithm: string;
  password: string;
  website: string;
};

try {
  ({ options } = await command.parse());
} catch (error) {
  if (error instanceof ValidationError) {
    command.showHelp();
    Deno.exit(1);
  }
  throw error;
}

async function main() {
  log.debug(JSON.stringify(options, null, 2));
  const [algorithm, password, website] = await runPrompt(
    options.algorithm,
    options.password,
    options.website,
  );
  log.debug(JSON.stringify({ algorithm, password, website }, null, 2));
}

main();
