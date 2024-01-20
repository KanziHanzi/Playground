import p5 from "p5";
import { Boundaries, Particle } from "src/common";
import { createParticle } from "./utils";

const particleLimit = 100;

const sketch = (context: p5) => {
  const particles: Particle[] = [];
  let boundaries: Boundaries;

  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
  };

  context.draw = () => {
    context.background("#000");
    boundaries = {
      x: context.windowWidth,
      y: context.windowHeight,
      negativeX: -context.windowWidth,
      negativeY: -context.windowHeight,
    };

    particles.forEach((particle: Particle, index: number) => {
      if (particle.isOutOfBounds(boundaries)) {
        particles.splice(index, 1);
      } else {
        particle.update();
        particle.show();
      }
    });
  };

  context.mouseMoved = () => {
    if (particles.length >= particleLimit) return;

    const particle = createParticle(context);

    particles.push(particle);
  };
};

new p5(sketch);
