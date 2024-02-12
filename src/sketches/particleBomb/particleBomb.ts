import p5 from "p5";
import { Boundaries, Particle } from "src/common";
import { createParticle } from "./utils";

const sketch = (context: p5) => {
  const particles: Particle[] = [];
  const boundaries: Boundaries = {
    x: context.windowWidth,
    y: context.windowHeight,
    negativeX: 0,
    negativeY: 0,
  };
  let stopMotion: boolean = false;

  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
  };

  context.draw = () => {
    context.background(10, 20, 30);

    particles.forEach((particle: Particle, index: number) => {
      if (particle.isOutOfBounds(boundaries)) {
        particles.splice(index, 1);
        return;
      }

      switch (true) {
        case stopMotion && particle.isFrozen():
          particle.show();
          break;
        case stopMotion && !particle.isFrozen():
          particle.freeze();
          particle.show();
          break;
        case !stopMotion && particle.isFrozen():
          particle.resumeMotion();
          particle.show();
          break;
        default:
          particle.update();
          particle.show();
      }
    });

    console.log(particles.length);
  };

  context.mouseClicked = () => {
    const particleCount = context.random(40, 90);

    for (let i = 0; i < particleCount; i++) {
      const particle = createParticle(context);

      particles.push(particle);
    }
  };

  context.keyPressed = (event: KeyboardEvent) => {
    const pressedKey = event.code; // returns keyCode

    if (pressedKey !== "Space") return;

    stopMotion = !stopMotion;
  };
};

new p5(sketch);
