import { parseTokens } from "../models/parser.ts"
import { Token } from "../models/token.ts";

function computeAttribute(
    block: string,
    attribute: string
): string
{
    switch (attribute) {
        case "firstLetter":
            return block[0];
        case "lastLetter":
            return block[-1];
        case "length":
            return block.length.toString();
        default:
            console.log("unknown attribute: " + attribute)
            return ""
    }
}

export function compute(
  algorithm: string,
  password: string,
  website: {name: string, extension: string},
) {
    let tokens: Token[] = parseTokens(algorithm)
    let computedPassword: string = ""
    for (var token of tokens) {
        if (token.logicblock == "master") token.logicblock = password;
        else if (token.logicblock == "domainName") token.logicblock = website.name;
        else if (token.logicblock == "domainExtension") token.logicblock = website.extension
    }
    for (var token of tokens) {
        let computedToken: string = token.logicblock;
        if (token.attribute) {
            computedToken = computeAttribute(computedToken, token.attribute);
        }
        // if (token.modifier) {
        //     // compute modifier
        // }
        computedPassword += computedToken;
    }
    console.log(tokens)
}
