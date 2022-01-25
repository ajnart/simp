import {
  Confirm,
  Input,
  Secret,
} from "https://deno.land/x/cliffy/prompt/mod.ts";
import { Loader } from "../models/loader.ts";

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

  if (usesConfig) {
    masterPassword = Loader.getItem("masterPassword");
    algorithm = Loader.getItem("algorithm");
  }

  if (algorithm != undefined) {
    console.log(`Found algorithm!`);
  } else {
    algorithm = await Input.prompt({
      message: "Enter your algorithm:",
      validate: (input) => input.search("{master}") != -1,
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
      validate: (input) => {
        // https://www.regextester.com/94502
        // Turbo regex to check that a url is valid
        if (
          input.match(
            /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
          ) != null
        ) {
          return true;
        } else return "Invalid URL";
      },
    });
  }
  return [algorithm, masterPassword, website];
}
