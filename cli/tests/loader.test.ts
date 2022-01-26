import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";

import { Loader } from "../models/loader.ts";

const base_algo =
  "{domainName.firstLetter+1}{domainExtension.length*2}{master}";
const complex_master = "H4ck3ing1sLif3";
Deno.test("Loader basics", () => {
  Loader.setItem(
    "algorithm",
    base_algo,
  );
  const algorithm = Loader.getItem("algorithm");
  assertEquals(algorithm, base_algo);
});

Deno.test("Loader complex password", () => {
  Loader.setItem(
    "masterPassword",
    complex_master,
  );
  const algorithm = Loader.getItem("masterPassword");
  assertEquals(algorithm, complex_master);
});

Deno.test("Value not found", () => {
  const value = Loader.getItem(
    "unknown",
  );
  assertEquals(value, undefined);
});
