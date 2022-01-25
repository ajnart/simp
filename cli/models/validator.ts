// https://www.regextester.com/94502
// Turbo regex to check that a url is valid
const URL_MATCH_REGEX =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export function validateWebsite(input: string): boolean | string {
  if (input.match(URL_MATCH_REGEX)) {
    return true;
  }
  return "Invalid URL";
}

export function validateAlgorithm(algorithm: string): string | boolean {
  if (algorithm.search("{master}") == -1) {
    return ("No master logic block in algorithm.");
  }
  return true;
}
