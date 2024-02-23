import { p5InstanceExtensions } from "p5";

export type ColorStop = { progress: number; color: string };

export const drawGradientBackground = (
  context: p5InstanceExtensions,
  gradientSteps: ColorStop[]
) => {
  context.push();

  const radialGradient = context.drawingContext.createRadialGradient(
    context.windowWidth / 2,
    context.windowHeight / 2,
    0,
    context.windowWidth / 2,
    context.windowHeight / 2,
    context.windowWidth
  );

  gradientSteps.forEach((stop: ColorStop) => {
    radialGradient.addColorStop(stop.progress, stop.color);
  });

  context.drawingContext.fillStyle = radialGradient;
  context.rect(0, 0, context.windowWidth, context.windowHeight);

  context.pop();
};
