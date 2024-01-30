import p5 from "p5";
import { expect, test } from "vitest";
import { Boundaries, isOutOfBounds } from ".";

test("detects if vector is out of bounds", () => {
  const mockVector: p5.Vector = new p5.Vector(71, 204);
  const boundaries: Boundaries = { x: 100, negativeX: 0, y: 200, negativeY: 0 };

  const testResult = isOutOfBounds(mockVector, boundaries);

  console.log(mockVector);

  expect(testResult).toBe(true);
});
