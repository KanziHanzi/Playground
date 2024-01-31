import p5, { p5InstanceExtensions } from "p5";
import { Particle } from "src/common";
import { createParticle } from "./utils";

const cellSize = 20;
let time = 0;

const noiseIncrement = 0.01; // change this to a lower number for a smoother perlin noise value
const timeIncrement = 0.00003; // change this to control how frequently the noise value changes

const particles: Particle[] = [];
const particleCount = 200;

let rows: number;
let columns: number;

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.stroke("#000");

    rows = Math.floor(context.windowHeight / cellSize);
    columns = Math.floor(context.windowWidth / cellSize);

    for (let i = 0; i < particleCount; i++) {
      const particle = createParticle(
        context,
        context.random(context.windowWidth),
        context.random(context.windowHeight)
      );
      particles.push(particle);
    }
  };

  context.draw = () => {
    context.background("#fefefe");

    let xOffset = 0;
    for (let x = 0; x <= columns; x++) {
      let yOffset = 0;
      for (let y = 0; y <= rows; y++) {
        const noise = context.noise(xOffset, yOffset, time);
        const angle = noise * context.TWO_PI;

        context.push();
        context.translate(x * cellSize, y * cellSize);

        const vector = p5.Vector.fromAngle(angle);

        drawVector(context, vector);
        context.pop();

        yOffset += noiseIncrement;
      }
      xOffset += noiseIncrement;
      time += timeIncrement;
    }

    particles.forEach((particle) => {
      console.log(particles[1].getPosition());

      particle.wrapAround();
      particle.update();
      particle.show(true);
    });
  };

  const drawVector = (context: p5InstanceExtensions, vector: p5.Vector) => {
    const drawX = vector.x * cellSize;
    const drawY = vector.y * cellSize;

    context.line(0, 0, drawX, drawY);
  };
};

new p5(sketch);
