import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { customAlgorithm } from "../models/algorithm.ts";
import { Token } from "../models/token.ts";

Deno.test("hello world #1", () => {
  const algorithm = new customAlgorithm(
    "{domainName.firstLetter+1}{domainLenght*2}{master}",
  );
  const token: Token[] = [];
  token.push(new Token("domainName.firstLetter+1"));
  token.push(new Token("domainLenght*2"));
  token.push(new Token("master"));
  assertEquals(algorithm.getParsedTokens(), token)
//   assertEquals(algorithm.getParsedTokens(), [{
//     "attribute": "firstLetter",
//     "logicblock": "domainName",
//     "modifier": "+1",
//   }, {
//     "attribute": undefined,
//     "logicblock": "domainLenght",
//     "modifier": "*2",
//   }, {
//     "attribute": undefined,
//     "logicblock": "master",
//     "modifier": undefined,
//   }]);
});
