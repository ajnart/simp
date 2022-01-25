import { Token } from "./token.ts";
import { validateAlgorithm } from "./validator.ts";

export class CustomAlgorithm {
  algorithm: string;
  constructor(stringAlgorithm: string) {
    this.algorithm = stringAlgorithm;
  }

  getParsedTokens(): Token[] {
    validateAlgorithm(this.algorithm);
    const parsedTokens: Token[] = [];
    this.algorithm.split(/[{}]/).filter((token) => token != "").forEach(
      (token) => {
        parsedTokens.push(new Token(token));
      },
    );
    if (
      parsedTokens.find((token) => token.logicblock == "master") == undefined
    ) {
      throw Error("No master logic block in algorithm.");
    }
    return parsedTokens;
  }
  //TODO: Implement the function that will compute the resulting password after every operation
  compute(
    masterPassword: string,
    websiteUsed: string,
    tokens: Token[],
  ): string {
    return masterPassword + websiteUsed +
      tokens.map((token) => token.attribute).join("");
  }
}
