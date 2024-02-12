import { p5InstanceExtensions } from "p5";

const circleRadius = 180;

const drawHalfCircle = (
  context: p5InstanceExtensions,
  wave: number[],
  isMirrored?: boolean
) => {
  context.noFill();

  context.beginShape();
  for (let i = 0; i <= circleRadius; i++) {
    const index = Math.floor(
      context.map(i, 0, circleRadius, 0, wave.length - 1)
    ); // interpolate waveform data to match the range of window size

    const radius = Math.floor(
      context.map(wave[index], -1, 1, circleRadius, circleRadius * 3)
    );

    const pointX = radius * (isMirrored ? -context.sin(i) : context.sin(i));
    const pointY = radius * context.cos(i);

    context.vertex(pointX, pointY);
  }
  context.endShape();
};

export const drawCircle = (context: p5InstanceExtensions, wave: number[]) => {
  drawHalfCircle(context, wave, false);
  drawHalfCircle(context, wave, true);
};
