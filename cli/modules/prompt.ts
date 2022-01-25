import {
  Confirm,
  Input,
  Secret,
} from "https://deno.land/x/cliffy/prompt/mod.ts";
import { Loader } from "../models/loader.ts";
import { validateAlgorithm, validateWebsite } from "../models/validator.ts";

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

  if (usesConfig && algorithm == undefined) {
    algorithm = Loader.getItem("algorithm");
  }

  if (usesConfig && masterPassword == undefined) {
    masterPassword = Loader.getItem("masterPassword");
  }

  if (algorithm != undefined) {
    console.log(`Found algorithm!`);
  } else {
    algorithm = await Input.prompt({
      message: "Enter your algorithm:",
      validate: validateAlgorithm,
    });
    Loader.setItem("algorithm", algorithm);
    console.log("Algorithm saved!");
  }

  if (masterPassword) {
    console.log(`Found master password!`);
  } else {
    console.log(`No master password found`);

    masterPassword = await Secret.prompt({
      message: "Choose a master password",
      minLength: 4,
    });

    Loader.setItem("masterPassword", masterPassword);
    console.log("Master password saved!");
  }
  if (website) {
    console.log(`Found website! (${website})`);
  } else {
    website = await Input.prompt({
      message: "Enter website:",
      validate: validateWebsite,
    });
  }
  return [algorithm, masterPassword, website];
}
