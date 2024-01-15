import p5 from "p5";
import { Particle } from "./Particle";

const sketch = (context: p5) => {
  const particles: Particle[] = [];

  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
  };

  context.draw = () => {
    context.background("#000");

    particles.forEach((particle: Particle, index: number) => {
      if (particle.isOutOfBounds(context.mouseX + 20, context.mouseY + 20)) {
        particles.splice(index, 1);
      } else {
        particle.update();
        particle.show();
      }
    });
  };

  context.mouseMoved = () => {
    if (particles.length >= 20) return;

    const particle = new Particle(context);

    particles.push(particle);
  };
};

new p5(sketch);
