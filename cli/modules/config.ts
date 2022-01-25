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
  const config = await prompt([{
    name: "algorithm",
    message: "Enter your algorithm:",
    type: Input,
    validate: (algorithm) => {
      try {
        validateAlgorithm(algorithm);
      } catch (error) {
        return (error.me);
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
