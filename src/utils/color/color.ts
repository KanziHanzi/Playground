import { p5InstanceExtensions } from "p5";

export const getRandomStrokeColor = () => {
  return "#" + (((1 << 24) * Math.random()) | 0).toString(16);
};

export const setColor = (context: p5InstanceExtensions, color: string) => {
  context.fill(color);
  context.stroke(color);
};
