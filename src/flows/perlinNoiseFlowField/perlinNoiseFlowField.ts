import p5, { p5InstanceExtensions } from "p5";
import { Particle } from "src/common";
import { createParticle } from "./utils";

const cellSize = 20;

const noiseScale = 0.1; // change this to a lower number for a smoother perlin noise value

const particles: Particle[] = [];
const particleCount = 200;

let rows: number;
let columns: number;

let flowField: number[][];
let strokeShade: number[][];

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.stroke("#000");

    rows = Math.floor(context.windowHeight / cellSize) + 1;
    columns = Math.floor(context.windowWidth / cellSize) + 1;

    flowField = generateFlowField(context, noiseScale);

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
    context.background(10, 20, 30, 100);

    drawFlowField(context, flowField);

    drawParticles(context, particles);
  };
};

const generateFlowField = (
  context: p5InstanceExtensions,
  noiseScale: number
) => {
  const grid: number[][] = Array.from(Array(columns), () =>
    new Array(rows).fill(0)
  );
  const strokes: number[][] = Array.from(Array(columns), () =>
    new Array(rows).fill(0)
  );

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      const noise = context.noise(x * noiseScale, y * noiseScale);
      const angle = noise * context.TWO_PI;

      const shade = context.map(angle, 0, context.TWO_PI, 0, 255);

      strokes[x][y] = shade;
      grid[x][y] = angle;
    }
  }

  strokeShade = strokes;
  return grid;
};

const drawFlowField = (
  context: p5InstanceExtensions,
  flowField: number[][]
) => {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      const angle = flowField[x][y];

      const vector = p5.Vector.fromAngle(angle);

      context.push();
      context.translate(x * cellSize, y * cellSize);

      context.stroke(strokeShade[x][y], 41, 41, 100);

      context.line(0, 0, vector.x * cellSize, vector.y * cellSize);

      context.pop();
    }
  }
};

const drawParticles = (
  context: p5InstanceExtensions,
  particles: Particle[]
) => {
  particles.forEach((particle) => {
    const particlePosition = particle.getPosition();
    const { x, y } = particlePosition;

    const columnIndex = Math.floor(x / cellSize);
    const rowIndex = Math.floor(y / cellSize);

    const angle = flowField[columnIndex][rowIndex];

    const forceVector = p5.Vector.fromAngle(angle);

    context.push();
    context.noStroke();

    particle.applyForce(forceVector);
    particle.applyFriction(0.5);
    particle.update();
    particle.resetAcceleration();
    particle.wrapAround();
    particle.show(true);

    context.pop();
  });
};

new p5(sketch);
