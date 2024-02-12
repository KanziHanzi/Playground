import p5, { p5InstanceExtensions } from "p5";
import { getRandomStrokeColor } from "src/utils/color";
import { Particle } from "src/common";

const accelerationMultiplier = 0.0001;
const positionMultiplier = 360; // average between min and max y scale

export const createParticle = (context: p5InstanceExtensions) => {
  const positionVector = p5.Vector.random2D().mult(positionMultiplier);
  const velocityVector = context.createVector(0, 0);
  const accelerationVector = positionVector
    .copy()
    .mult(Math.random() * accelerationMultiplier);
  const size = context.random(3, 5);
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
