// https://www.regextester.com/94502

import { ValidationError } from "https://deno.land/x/cliffy/command/mod.ts";

// Turbo regex to check that a url is valid
const URL_MATCH_REGEX =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export function validateWebsite(input: string): boolean {
  if (input.match(URL_MATCH_REGEX) == null) {
    throw new ValidationError("Invalid URL.");
  }
  return true;
}

export function validateAlgorithm(algorithm: string): boolean {
  if (algorithm.search("{master}") == -1) {
    throw new ValidationError("No master logic block in algorithm.");
  }
  return true;
}
