import p5, { p5InstanceExtensions } from "p5";
import { getRandomStrokeColor } from "src/utils/randomStroke";
import { drawShape } from "./utils";

const circleDiameter = 50;
const centerOffset = 100;
const accelerationFactor = 0.1;

let progress; // animation progress between 0 and 360

let rotationValue = 0;
let rotationSpeed = 1;

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

    progress = context.map(rotationValue, 0, 360, 0, 1);

    if (rotationValue <= 180) {
      rotationSpeed += accelerationFactor;
    } else if (rotationValue >= 360) {
      rotationValue = 0;
      rotationSpeed = 1;
      const color = getRandomStrokeColor();
      context.fill(color);
      context.stroke(color);
    } else {
      rotationSpeed -= accelerationFactor;
    }

    rotationValue = Math.floor(rotationValue + rotationSpeed);

    const scaleFactor = context.map(progress, 0, 0.5, 0.8, 1.6);
    const negativeScaleFactor = context.map(progress, 0.5, 1, 1.6, 0.8);

    context.push();
    if (progress <= 0.5) {
      context.scale(scaleFactor);
    } else {
      context.scale(negativeScaleFactor);
    }

    context.rotate(rotationValue);

    drawShape(context, 0, -centerOffset, circleDiameter);
    context.pop();

    drawLoadingBar(context);

    const loadingBarProgress = context.map(progress, 0, 1, 0, 590);

    context.push();
    context.rect(-295, 305, loadingBarProgress, 40, 1);

    context.stroke("#fff");
    context.fill('#fff')
    context.strokeWeight(1);

    context.text(`${Math.floor(progress * 100)}%`, -20, 328);
    context.pop();
  };
};

const drawLoadingBar = (context: p5InstanceExtensions) => {
  context.push();
  context.noFill();
  context.stroke("#fff");
  context.strokeWeight(1);

  context.rect(-300, 300, 600, 50, 10);
  context.pop();
};

new p5(sketch);
