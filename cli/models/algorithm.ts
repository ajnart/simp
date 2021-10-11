import { Token } from "./token.ts";

export class customAlgorithm {
  algorithm: string;
  constructor(stringAlgorithm: string) {
    this.algorithm = stringAlgorithm;
  }

  parseTokens(): string[] {
    return this.algorithm.split(/[{}]/).filter((token) => token != "");
  }

  compute(masterPassword: string, websiteUsed: string): string {
    const parsedTokens: Token[] = [];
    this.parseTokens().forEach((token) => {
      parsedTokens.push(new Token(token));
    });
    console.log(parsedTokens);
    return masterPassword + websiteUsed;
  }
}
