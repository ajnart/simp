import {
  Input,
  prompt,
  Secret,
} from "https://deno.land/x/cliffy/prompt/mod.ts";
import { Loader } from "../models/loader.ts";
import { validateAlgorithm } from "../models/validator.ts";

export async function runConfig(): Promise<
  [string | undefined, string | undefined]
> {
  const style = "color:yellow; font-weight: bold";
  console.log("%c Welcome to SIMP config!", style);
  console.log(
    "If you have not read it already, please read the README.md",
    "and then come back here.",
    "\nIt will explain to you all the details about creating your custom algorithm.",
    "\nAlright, let's get started!",
  );
  const config = await prompt([{
    name: "algorithm",
    message: "Enter your algorithm:",
    type: Input,
    validate: (algorithm) => {
      try {
        validateAlgorithm(algorithm);
      } catch (error) {
        return (error.message);
      }
    },
  }, {
    name: "masterPassword",
    message: "Choose a master password",
    type: Secret,
    minLength: 4,
  }]);
  Loader.setConfig(config);
  console.log("Config saved!");
  return [config.algorithm, config.masterPassword];
}
