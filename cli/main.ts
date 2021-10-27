import { CustomAlgorithm } from "./models/algorithm.ts";
import { Token } from "./models/token.ts";

// TODO: Implement cli interface

function main() {
  const algorithm: string | null = localStorage.getItem("algorithm");
  let _algorithm: CustomAlgorithm;

  if (algorithm) {
    _algorithm = new CustomAlgorithm(algorithm);
    console.log(`Found algorithm: ${_algorithm.algorithm}`);
  } else {
    _algorithm = new CustomAlgorithm(
      prompt("Please enter your algorithm:") as string,
    );
    localStorage.setItem("algorithm", _algorithm.algorithm);
    console.log("Algorithm saved!");
  }
  try {
    const parsedTokens: Token[] = _algorithm.getParsedTokens();
  } catch (error) {
    console.log(`Error: ${error.message}`);
    Deno.exit(1);
  }
  let masterPassword: string | null = localStorage.getItem("masterPassword");
  if (masterPassword) {
    console.log(`Found master password: ${masterPassword}`);
  } else {
    console.log(`No master password found`);
    masterPassword = prompt("Master password:");
    localStorage.setItem("masterPassword", masterPassword as string);
  }
}

main();
