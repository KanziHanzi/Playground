import p5 from "p5";
import { Boundaries, Particle } from "src/common";
import { createParticle } from "./utils";

const particleCount = 50;

const sketch = (context: p5) => {
  const particles: Particle[] = [];
  const boundaries: Boundaries = {
    x: context.windowWidth,
    y: context.windowHeight,
    negativeX: 0,
    negativeY: 0,
  };
  let freeze: boolean = false;

  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
  };

  context.draw = () => {
    context.background(10, 20, 30);

    particles.forEach((particle: Particle, index: number) => {
      if (particle.isOutOfBounds(boundaries)) {
        particles.splice(index, 1);
      } else if (freeze) {
        particle.freeze(5000);
        particle.update();
        particle.show();
      } else {
        particle.update();
        particle.show();
      }
    });

    console.log(particles.length);
  };

  context.mouseClicked = () => {
    for (let i = 0; i < particleCount; i++) {
      const particle = createParticle(context);

      particles.push(particle);
    }
  };

  context.keyPressed = (event: KeyboardEvent) => {
    const pressedKey = event.code; // returns keyCode

    if (pressedKey !== "Space") return;

    freeze = !freeze;
  };
};

new p5(sketch);
