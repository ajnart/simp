import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { parseTokens } from "../models/parser.ts";
import { Token } from "../models/token.ts";

Deno.test("A little bit of parsing", () => {
  const algorithm = "{domainName.firstLetter+1}{domainLenght*2}{master}";
  const token: Token[] = [];
  token.push(new Token("domainName.firstLetter+1"));
  token.push(new Token("domainLenght*2"));
  token.push(new Token("master"));
  assertEquals(parseTokens(algorithm), token);
});

Deno.test("Advanced parsing", () => {
  const algorithm = "abc{domainLenght*2+1}{master}";
  const token: Token[] = [];
  token.push(new Token("abc"));
  token.push(new Token("domainLenght*2+1"));
  token.push(new Token("master"));
  assertEquals(parseTokens(algorithm), token);
});
