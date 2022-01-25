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
