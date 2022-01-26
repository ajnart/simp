import {
  Command,
  ITypeInfo,
  ValidationError,
} from "https://deno.land/x/cliffy/command/mod.ts";
import { validateAlgorithm, validateWebsite } from "../models/validator.ts";
import { runConfig } from "./config.ts";

export async function runCli() {
  const command = new Command()
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
      try {
        validateWebsite(value);
      } catch (e) {
        throw new ValidationError(
          `${label} "${name}" must be a valid website.Error: "${e}"`,
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
  return (options);
}
