import { expect, test } from "vitest";
import { getFrameBoundaries } from "./frame";
import { Boundaries } from "src/common";

const boundaries: Boundaries = {
  x: 100,
  y: 100,
  negativeX: 0,
  negativeY: 0,
};

test("returns an array of points", () => {
  const points = getFrameBoundaries(boundaries);

  expect(points.length).to.not.equal(0);
});

test("returns correct points across the borders of a boundary object", () => {
  const points = getFrameBoundaries(boundaries);

  const validPoint = { x: 13, y: 0 };
  const invalidPoint = { x: 25, y: 77 };

  expect(points).toContainEqual(validPoint);
  expect(points).not.toContainEqual(invalidPoint);
});
