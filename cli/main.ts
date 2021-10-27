import { customAlgorithm } from "./models/algorithm.ts";

// TODO: Implement cli interface
const algorithm = new customAlgorithm(
  "{domainName.firstLetter+1}gen{domainLenght*2}{master}",
);
const parsedTokens = algorithm.getParsedTokens();
let masterPassword: string | null = localStorage.getItem("masterPassword");
if (masterPassword) {
  console.log(`Found master password: ${masterPassword}`);
} else {
  console.log(`No master password found`);
  masterPassword = prompt("Master password:");
  localStorage.setItem("masterPassword", masterPassword as string);
}
