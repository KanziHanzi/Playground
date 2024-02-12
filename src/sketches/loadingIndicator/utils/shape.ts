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

export const scaleShape = (context: p5InstanceExtensions, progress: number) => {
  const scaleFactor = context.map(progress, 0, 0.5, 0.8, 1.6);
  const negativeScaleFactor = context.map(progress, 0.5, 1, 1.6, 0.8);

  if (progress <= 0.5) {
    context.scale(scaleFactor);
  } else {
    context.scale(negativeScaleFactor);
  }
};
