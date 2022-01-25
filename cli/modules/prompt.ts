import {
  Confirm,
  Input,
  Secret,
} from "https://deno.land/x/cliffy/prompt/mod.ts";
import { Loader } from "../models/loader.ts";
import { validateAlgorithm, validateWebsite } from "../models/validator.ts";
import * as log from "https://deno.land/std/log/mod.ts";

export async function runPrompt(
  algorithm: string,
  masterPassword: string,
  website: string,
): Promise<[string, string, string]> {
  const usesConfig = (algorithm || masterPassword || website)
    ? true
    : await Confirm.prompt({
      message: "Load data from config file ?",
      default: true,
    });

  log.debug(`uses config: ${usesConfig}`);
  if (usesConfig == true) {
    [masterPassword, algorithm] = Loader.getConfigItems(
      "masterPassword",
      "algorithm",
    );
  }
  if (algorithm == undefined) {
    algorithm = await Input.prompt({
      message: "Enter your algorithm:",
      validate: validateAlgorithm,
    });
  }

  if (masterPassword == undefined) {
    masterPassword = await Secret.prompt({
      message: "Choose a master password",
      minLength: 4,
    });
  }
  if (website) {
    console.log(`Found website! (${website})`);
  } else {
    website = await Input.prompt({
      message: "Enter website:",
      validate: (website) => {
        try {
          validateWebsite(website);
        } catch (error) {
          return error.message;
        }
      },
    });
  }
  return [algorithm, masterPassword, website];
}
