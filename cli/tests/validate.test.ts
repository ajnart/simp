import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";

import { validateAlgorithm } from "../models/validator.ts";

Deno.test("Validate basic algorithm", () => {
  const algorithm =
    "{domainName.firstLetter+1}{domainExtension.length*2}{master}";
  assertEquals(validateAlgorithm(algorithm), true);
});

Deno.test("Failed to validate algorithm", () => {
  const algorithm = "{domainName.firstLetter+1}{domainExtension.length*2}";
  assertThrows(() => validateAlgorithm(algorithm));
});
