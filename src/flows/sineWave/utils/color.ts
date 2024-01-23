import { p5InstanceExtensions } from "p5";

const startRange = -1;
const stopRange = 1;
const rgbMinValue = 0;
const rgbMaxValue = 255;

export const getRgbValues = (context: p5InstanceExtensions) => {
  const r = context.map(
    context.sin(context.frameCount),
    startRange,
    stopRange,
    rgbMinValue,
    rgbMaxValue
  );

  const g = context.map(
    context.sin(context.frameCount / 2),
    startRange,
    stopRange,
    rgbMinValue,
    rgbMaxValue
  );

  const b = context.map(
    context.sin(context.frameCount / 4),
    startRange,
    stopRange,
    rgbMinValue,
    rgbMaxValue
  );

  return { r, g, b };
};
