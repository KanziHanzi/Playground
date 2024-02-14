import p5 from "p5";
import { getRandomStrokeColor, setColor } from "src/utils";
import {
  animateLoadingBar,
  drawLoadingBar,
  drawShape,
  scaleShape,
} from "./utils";

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

    setColor(context, getRandomStrokeColor());
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
      setColor(context, getRandomStrokeColor());
    } else {
      rotationSpeed -= accelerationFactor;
    }

    rotationValue = Math.floor(rotationValue + rotationSpeed);

    context.push();
    scaleShape(context, progress);

    context.rotate(rotationValue);

    drawShape(context, 0, -centerOffset, circleDiameter);
    context.pop();

    drawLoadingBar(context);

    const loadingBarProgress = context.map(progress, 0, 1, 0, 590);

    animateLoadingBar(context, loadingBarProgress, progress);
  };
};

new p5(sketch);
