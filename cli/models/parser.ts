import { Token } from "./token.ts";

export function parseTokens(algorithm: string): Token[] {
  const parsedTokens: Token[] = [];
  algorithm.split(/[{}]/).filter((token) => token != "").forEach(
    (token) => {
      parsedTokens.push(new Token(token));
    },
  );
  return parsedTokens;
}

export class Website {
  name: string;
  url: string;
  extension: string;
  constructor(url: string) {
    //TODO: Use regex to get base domain name and extension
    this.url = url;
    this.name = url.split(".")[0];
    this.extension = url.split(".")[1];
  }
}
