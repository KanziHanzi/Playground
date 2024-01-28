import p5, { p5InstanceExtensions } from "p5";
import { Particle } from "src/common";
import { getRandomStrokeColor } from "src/utils/color";

const accelerationMultiplier = 0.1;

export const createParticle = (context: p5InstanceExtensions) => {
  const positionVector = context.createVector(
    context.winMouseX,
    context.winMouseY
  );
  const velocityVector = context.createVector(0, 0);
  const accelerationVector = p5.Vector.random2D()
    .normalize()
    .mult(accelerationMultiplier, accelerationMultiplier);
  const size = 14;
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
