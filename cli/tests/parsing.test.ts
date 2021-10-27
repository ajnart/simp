import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { CustomAlgorithm } from "../models/algorithm.ts";
import { Token } from "../models/token.ts";

Deno.test("A little bit of parsing", () => {
  const algorithm = new CustomAlgorithm(
    "{domainName.firstLetter+1}{domainLenght*2}{master}",
  );
  const token: Token[] = [];
  token.push(new Token("domainName.firstLetter+1"));
  token.push(new Token("domainLenght*2"));
  token.push(new Token("master"));
  assertEquals(algorithm.getParsedTokens(), token);
});

Deno.test("Advanced parsing", () => {
  const algorithm = new CustomAlgorithm(
    "abc{domainLenght*2+1}{master}",
  );
  const token: Token[] = [];
  token.push(new Token("abc"));
  token.push(new Token("domainLenght*2+1"));
  token.push(new Token("master"));
  assertEquals(algorithm.getParsedTokens(), token);
});

Deno.test("Error: No master password", () => {
  const algorithm = new CustomAlgorithm(
    "{domainLenght*2+1}",
  );
  assertThrows(
    algorithm.getParsedTokens.bind(algorithm),
    Error,
    "No master logic block in algorithm.",
  );
});
