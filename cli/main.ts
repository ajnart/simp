import { CustomAlgorithm } from "./models/algorithm.ts";
import { Loader } from "./models/loader.ts";
import { Input, Secret } from "https://deno.land/x/cliffy/prompt/mod.ts";
import { validateAlgorithm } from "./models/validator.ts";

async function main() {
  const algorithm: string = Loader.getItem("algorithm");
  let _algorithm: CustomAlgorithm;

  if (algorithm != undefined) {
    _algorithm = new CustomAlgorithm(algorithm);
    console.log(`Found algorithm: ${_algorithm.algorithm}`);
  } else {
    const Inputedalgorithm = await Input.prompt({
      message: "Enter your algorithm:",
      validate: (input) => validateAlgorithm(input),
    });
    _algorithm = new CustomAlgorithm(Inputedalgorithm);
    Loader.setItem("algorithm", _algorithm.algorithm);
    console.log("Algorithm saved!");
  }
  // try {
  //   const parsedTokens: Token[] = _algorithm.getParsedTokens();
  // } catch (error) {
  //   console.log(`Error: ${error.message}`);
  //   Deno.exit(1);
  // }
  let masterPassword: string | null = Loader.getItem("masterPassword");
  if (masterPassword) {
    console.log(`Found master password: ${masterPassword}`);
  } else {
    console.log(`No master password found`);

    masterPassword = await Secret.prompt({
      message: "Choose a master password",
      minLength: 4,
    });

    Loader.setItem("masterPassword", masterPassword as string);
  }
}

main();
