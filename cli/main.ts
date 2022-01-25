import { runPrompt } from "./modules/prompt.ts";
import { Command } from "https://deno.land/x/cliffy/command/mod.ts";

const { options } = await new Command()
  .name("simp")
  .description("Simple password manager")
  .version("0.0.1")
  .option(
    "-a, --algorithm <string>",
    "use the specified algorithm instead",
  )
  .option(
    "-p, --password <string>",
    "use the specified password instead",
  )
  .option(
    "-w, --website <string>",
    "use the specified website instead",
  )
  .parse(Deno.args);

async function main() {
  const [algorithm, password, website] = await runPrompt(
    options.algorithm,
    options.password,
    options.website,
  );
  console.log(`algorithm: ${algorithm}`);
  console.log(`password: ${password}`);
  console.log(`website: ${website}`);
}

main();
