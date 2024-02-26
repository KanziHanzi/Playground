import p5 from "p5";
import { degreesToRadians, isPrimeNumber } from "src/utils";
import { PrimeNumber, View } from "./PrimeNumber";
import { ColorStop, drawGradientBackground } from "./utils";

let angle = 0;
let scale = 50;

let friction = 0.95;
let scaleFactor;

let rotationAngle = 0;
let rotationFactor = 0.1;

let angleMode: "radians" | "degrees";

const maxNumber = 50000;
const primeNumbers: PrimeNumber[] = [];
const view: View = { width: 0, height: 0 };

const gradientSteps: ColorStop[] = [
  { progress: 0, color: "#2b324f" },
  { progress: 0.45, color: "#151728" },
  { progress: 1, color: "#030411" },
];

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.fill("#fefefe");
    context.noStroke();
    // context.angleMode("degrees");
    angleMode = context.angleMode();

    rotationFactor =
      angleMode === "radians"
        ? degreesToRadians(rotationFactor)
        : rotationFactor;

    for (let i = 1; i <= maxNumber; i++) {
      if (isPrimeNumber(i)) {
        const distance = i;

        const x = Math.floor(distance * context.sin(angle));
        const y = Math.floor(distance * context.cos(angle));

        const item = new PrimeNumber(context, { x, y }, i, maxNumber);
        primeNumbers.push(item);
      }
      angle++;
    }
  };

  context.draw = () => {
    drawGradientBackground(context, gradientSteps);

    context.translate(context.windowWidth / 2, context.windowHeight / 2);

    view.width = context.windowWidth / scale;
    view.height = context.windowHeight / scale;

    context.scale(scale);
    if (!primeNumbers[primeNumbers.length - 1].isInView(view)) {
      friction = context.map(scale, 30, 0.1, 0.95, 1);
      scaleFactor = context.map(scale, 30, 0.1, 0.1, 0.001);

      scale -= scaleFactor * friction;
    } else {
      rotationAngle += rotationFactor;

      context.rotate(rotationAngle);
    }

    primeNumbers.forEach((element) => {
      if (element.isInView(view)) {
        element.show(scale);
      }
    });
  };
};

new p5(sketch);
