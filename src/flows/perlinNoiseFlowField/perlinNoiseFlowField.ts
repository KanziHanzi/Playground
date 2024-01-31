import p5, { p5InstanceExtensions } from "p5";

const cellSize = 20;
let time = 0;

const noiseIncrement = 0.01; // change this to a lower number for a smoother perlin noise value
const timeIncrement = 0.00003; // change this to control how frequently the noise value changes

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    // context.background("#fefefe");
    context.stroke("#000");
  };

  context.draw = () => {
    context.background("#fefefe");

    let xOffset = 0;
    for (let x = 0; x < context.windowWidth; x += cellSize) {
      let yOffset = 0;
      for (let y = 0; y < context.windowHeight; y += cellSize) {
        const noise = context.noise(xOffset, yOffset, time);
        const angle = noise * context.TWO_PI;

        context.push();
        context.translate(x, y);

        drawVector(context, angle);
        context.pop();

        yOffset += noiseIncrement;
      }
      xOffset += noiseIncrement;
      time += timeIncrement;
    }
  };

  const drawVector = (context: p5InstanceExtensions, angle: number) => {
    const vector = p5.Vector.fromAngle(angle);

    const drawX = vector.x * cellSize;
    const drawY = vector.y * cellSize;

    context.line(0, 0, drawX, drawY);
  };
};

new p5(sketch);
