import p5, { p5InstanceExtensions } from "p5";
import { getRandomStrokeColor } from "src/utils/randomStroke";

const circleDiameter = 50;
const centerOffset = 100;
const accelerationFactor = 0.3;

let progress = 0; // animation progress between 0 and 360
let rotationSpeed = 0.5;

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.angleMode("degrees");

    const color = getRandomStrokeColor();
    context.fill(color);
    context.stroke(color);
    context.strokeWeight(5);
  };

  context.draw = () => {
    context.background(10, 20, 30);

    context.translate(context.windowWidth / 2, context.windowHeight / 2);

    if (progress <= 180) {
      rotationSpeed += accelerationFactor;
    } else {
      rotationSpeed -= accelerationFactor;
    }

    console.log(rotationSpeed);

    progress = Math.floor(progress + rotationSpeed);

    context.rotate(progress);
    context.push();

    context.scale(progress / 100);
    drawShape(context, 0, -centerOffset, circleDiameter);
    context.pop();
  };
};

const drawShape = (
  context: p5InstanceExtensions,
  x: number,
  y: number,
  diameter: number,
  color?: string
) => {
  if (color) context.fill(color);

  return context.ellipse(x, y, diameter);
};

new p5(sketch);
