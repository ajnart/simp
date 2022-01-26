import { parseTokens } from "../models/parser.ts";
import { Token } from "../models/token.ts";
import { attributesList } from "./attributes.ts";

const attributesNames = attributesList.map((fct) => fct.name);

export function compute(
  algorithm: string,
  password: string,
  website: { name: string; extension: string },
) {
  const tokens: Token[] = parseTokens(algorithm);
  let computedPassword = "";
  for (const token of tokens) {
    token.logicblock = (() => {
      switch (token.logicblock) {
        case "master":
          return password;
        case "domainName":
          return website.name;
        case "domainExtension":
          return website.extension;
        default:
          return token.logicblock;
      }
    })() as string;
  }
  for (const token of tokens) {
    let computedToken: string = token.logicblock;
    for (const attribute of token.attribute) {
      computedToken = attributesList[attributesNames.indexOf(attribute)].call(
        null,
        computedToken,
      );
    }
    computedPassword += computedToken;
  }
  console.log(tokens);
  console.log(`Final computed password: ${computedPassword}`);
}
