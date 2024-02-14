import { expect, test } from "vitest";
import { getRandomStrokeColor } from "./color";

test("returns valid hex color string", () => {
  const regex = RegExp("^#");
  expect(getRandomStrokeColor()).toMatch(regex);
});
