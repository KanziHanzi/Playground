import { p5InstanceExtensions } from "p5";
import { Button } from "../Button";
import { Dimensions } from "../types";

const createButton = (
  context: p5InstanceExtensions,
  width: number,
  height: number
): Button => {
  const startingX = context.windowWidth / 2;
  const startingY = context.windowHeight / 2;

  const startingPosition = context.createVector(startingX, startingY);

  const dimensions: Dimensions = { width: width, height: height };

  return new Button(context, startingPosition, dimensions);
};

export { createButton };
