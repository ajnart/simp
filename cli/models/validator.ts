// https://www.regextester.com/94502

import { ValidationError } from "https://deno.land/x/cliffy/command/mod.ts";
import { parseTokens } from "./parser.ts";
import { attributesList } from "../modules/attributes.ts";
import { logicBlocksList } from "../modules/logicblocks.ts";

// Turbo regex to check that a url is valid
const URL_MATCH_REGEX =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export function validateWebsite(input: string): boolean {
  if (input.match(URL_MATCH_REGEX) == null) {
    throw new ValidationError("Invalid URL.");
  }
  return true;
}

export function validateAlgorithm(algorithm: string): boolean {
  if (algorithm.search("{master}") == -1) {
    throw new ValidationError("No master logic block in algorithm.");
  }
  // Extracts all the logic blocks from the algorithm
  // Logic block is a block of code between { and }
  const tokens = parseTokens(algorithm);
  // Check that there is only one master logic block
  const masterBlocks = tokens.filter((token) => token.logicblock == "master");
  if (masterBlocks.length != 1) {
    throw new ValidationError("Only one master logic block is allowed.");
  }
  // All the logic blocks are defined in logicblocks.ts
  // A logic block is a block of code between { and }
  // Find all logicblocks in the algorithm using a regex
  const logicBlocks = algorithm.match(/\{[^}]*\}/g);
  logicBlocks!.forEach((logicBlock) => {
    // Remove the { and }
    logicBlock = logicBlock.substring(1, logicBlock.length - 1);
    logicBlock = logicBlock.split(".")[0];
    // Check that the logic block is defined in logicblocks.ts
    if (logicBlocksList.indexOf(logicBlock) == -1) {
      throw new ValidationError(
        `Logic block ${logicBlock} is not defined in logicblocks.ts.`,
      );
    }
  });

  // Ensure that all the attributes are defined
  // all the attributes are defined in attributes.ts
  const attributesNames = attributesList.map((fct) => fct.name);
  // if any of the attributes is not defined, throw an error
  for (const token of tokens) {
    for (const attribute of token.attribute) {
      if (!attributesNames.includes(attribute)) {
        throw new ValidationError(`Attribute ${attribute} is not defined.`);
      }
    }
  }
  return true;
}
