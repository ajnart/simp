import { customAlgorithm } from "./models/algorithm.ts";

function computeResult(
  algorithmUsed: customAlgorithm,
  masterPassword: string,
  websiteUsed: string,
): string {
  return algorithmUsed.compute(masterPassword, websiteUsed);
}

// TODO: Implement cli interface
computeResult(
  new customAlgorithm("{domainName.firstLetter+1}{domainLenght*2}{master}"),
  "Toto",
  "gmail.com",
);
