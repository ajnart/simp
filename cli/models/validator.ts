function _validate(algorithm: string) {
  if (algorithm.search("{master}") == -1) {
    return Error("No master logic block in algorithm.");
  }
}

export function validateAlgorithm(algorithm: string): string | boolean {
  if (algorithm.search("{master}") == -1) {
    return ("No master logic block in algorithm.");
  }
  return true;
}
