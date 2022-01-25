import { parseTokens } from "../models/parser.ts";
import { Token } from "../models/token.ts";

function computeAttribute(
  block: string,
  attribute: string,
): string {
  switch (attribute) {
    case "firstLetter":
      return block[0];
    case "lastLetter":
      return block[block.length - 1];
    case "length":
      return block.length.toString();
    default:
      return "";
  }
}

export function compute(
  algorithm: string,
  password: string,
  website: { name: string; extension: string },
) {
  const tokens: Token[] = parseTokens(algorithm);
  let computedPassword = "";
  for (const token of tokens) {
    if (token.logicblock == "master") token.logicblock = password;
    else if (token.logicblock == "domainName") token.logicblock = website.name;
    else if (token.logicblock == "domainExtension") {
      token.logicblock = website.extension;
    }
  }
  for (const token of tokens) {
    let computedToken: string = token.logicblock;
    if (token.attribute) {
      computedToken = computeAttribute(computedToken, token.attribute);
    }
    computedPassword += computedToken;
  }
  console.log(tokens);
  console.log(`Final computed password: ${computedPassword}`);
}
