import p5 from "p5";

export type Boundaries = {
  x: number;
  y: number;
  negativeX: number;
  negativeY: number;
};

export const isOutOfBounds = (vector: p5.Vector, boundaries: Boundaries) => {
  switch (true) {
    case vector.x < boundaries.negativeX:
      return true;
    case vector.x > boundaries.x:
      return true;
    case vector.y < boundaries.negativeY:
      return true;
    case vector.y > boundaries.y:
      return true;
    default:
      return false;
  }
};
