import p5, { p5InstanceExtensions } from "p5";
import { Particle } from "src/common";
import { getRandomStrokeColor } from "src/utils/color";

export const createParticle = (
  context: p5InstanceExtensions,
  startX: number,
  startY: number
) => {
  const positionVector = context.createVector(startX, startY);
  const velocityVector = context.createVector(0, 0);
  const accelerationVector = context.createVector(0, 0);

  const size = 5;
  const color = getRandomStrokeColor();

  return new Particle({
    context,
    position: positionVector,
    velocity: velocityVector,
    acceleration: accelerationVector,
    size,
    color,
  });
};
