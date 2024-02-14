import p5, { p5InstanceExtensions } from "p5";
import { Particle } from "src/common";
import { getRandomStrokeColor } from "src/utils";

const accelerationMultiplier = 0.1;
const randomRange = { x: -10, y: 10 };

export const createParticle = (context: p5InstanceExtensions) => {
  const positionVector = context.createVector(
    context.winMouseX + context.random(randomRange.x, randomRange.y),
    context.winMouseY + context.random(randomRange.x, randomRange.y)
  );

  const velocityVector = context.createVector(
    context.random(randomRange.x, randomRange.y),
    context.random(randomRange.x, randomRange.y)
  );
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
