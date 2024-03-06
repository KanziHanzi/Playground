import { Boundaries } from "src/common";

export type Position = {
  x: number;
  y: number;
};

export const getFrameBoundaries = (boundaries: Boundaries) => {
  const points: Position[] = [];

  for (let x = 0; x <= boundaries.x; x++) {
    points.push({ x: x, y: 0 });
  }

  for (let y = 0; y <= boundaries.y; y++) {
    points.push({ x: 0, y: y });
  }

  for (let x = boundaries.x; x >= boundaries.negativeX; x--) {
    points.push({ x: x, y: boundaries.y });
  }

  for (let y = boundaries.y; y >= boundaries.negativeY; y--) {
    points.push({ x: boundaries.x, y: y });
  }

  return points;
};
