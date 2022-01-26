import { parseTokens } from "../models/parser.ts";
import { Token } from "../models/token.ts";
import Attributes from "./attributes.ts";

const attributesNames = [
  "firstLetter",
  "lastLetter",
  "length_",
  "reverse",
  "upper",
  "lower",
  "capitalize",
  "camelCase",
  "snakeCase",
  "default_"
];

export function compute(
  algorithm: string,
  password: string,
  website: { name: string; extension: string; },
) {
  const tokens: Token[] = parseTokens(algorithm);
  let computedPassword = "";
  for (const token of tokens) {
    token.logicblock = () => {
      switch (token.logicblock) {
        case "master":
          return password;
        case "domainName":
          return website.name;
        case "domainExtension":
          return website.extension;
      }
    };
  }
  for (const token of tokens) {
    let computedToken: string = token.logicblock;
    for (const attribute of token.attribute) {
      computedToken = Attributes[attributesNames.indexOf(attribute) || -1](computedToken);
    }
    computedPassword += computedToken;
  }
  console.log(tokens);
  console.log(`Final computed password: ${computedPassword}`);
}
