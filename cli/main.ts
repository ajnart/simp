import { runPrompt } from "./modules/prompt.ts";
import * as log from "https://deno.land/std/log/mod.ts";
import { Website } from "./models/parser.ts";
import { compute } from "./modules/computer.ts";
import { runCli } from "./modules/cli.ts";

const options = await runCli();

async function main() {
  log.debug(JSON.stringify(options, null, 2));
  const [algorithm, password, website] = await runPrompt(
    options.algorithm,
    options.password,
    options.website,
  );
  compute(algorithm, password, new Website(website));
}

main();
