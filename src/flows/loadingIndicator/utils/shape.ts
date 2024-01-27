import { p5InstanceExtensions } from "p5";

export const drawShape = (
  context: p5InstanceExtensions,
  x: number,
  y: number,
  diameter: number,
  color?: string
) => {
  if (color) context.fill(color);

  return context.ellipse(x, y, diameter);
};
