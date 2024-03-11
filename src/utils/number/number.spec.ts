import { expect, test } from "vitest";
import { isPrimeNumber } from "./number";

test("detects if number is prime", () => {
  const primeNumber = 12;
  const nonPrimeNumber = 9;

  expect(isPrimeNumber(primeNumber)).toBe(true)
  expect(isPrimeNumber(nonPrimeNumber)).toBe(false)
});
