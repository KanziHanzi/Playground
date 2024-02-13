type Position = {
  x: number;
  y: number;
};

type Dimensions = {
  width: number;
  height: number;
};

type Hitbox = {
  topLeftX: number;
  topLeftY: number;
  topRightX: number;
  topRightY: number;
  bottomLeftX: number;
  bottomLeftY: number;
  bottomRightX: number;
  bottomRightY: number;
};

export type { Position, Dimensions, Hitbox };
