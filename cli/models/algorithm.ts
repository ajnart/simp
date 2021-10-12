import { Token } from "./token.ts";

export class customAlgorithm {
  algorithm: string;
  constructor(stringAlgorithm: string) {
    this.algorithm = stringAlgorithm;
  }

  getParsedTokens(): Token[] {
    const parsedTokens: Token[] = [];
    this.algorithm.split(/[{}]/).filter((token) => token != "").forEach(
      (token) => {
        parsedTokens.push(new Token(token));
      },
    );
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
