import p5, { p5InstanceExtensions } from "p5";
import { degreesToRadians, isPrimeNumber } from "src/utils";

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

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.fill("#fefefe");
    context.noStroke();
    context.angleMode("degrees");
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

        const item = new PrimeNumber(context, { x, y }, i);
        primeNumbers.push(item);
      }
      angle++;
    }
  };

  context.draw = () => {
    context.background(10, 20, 30);
    context.text(context.frameRate(), 10, 10);
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
        element.show();
      }
    });
  };
};

type Position = {
  x: number;
  y: number;
};

type View = {
  width: number;
  height: number;
};
class PrimeNumber {
  context: p5InstanceExtensions;
  position: Position;
  content: number;
  fontSize: number;

  constructor(
    context: p5InstanceExtensions,
    position: Position,
    content: number
  ) {
    this.context = context;
    this.position = position;
    this.content = content;

    const size = context.map(this.content, 1, maxNumber, 0.5, 500);

    this.fontSize = size;
  }

  public show(): void {
    this.context.push();

    if (scale > 0.5) {
      this.context.textSize(this.fontSize);
      this.context.text(this.content, this.position.x, this.position.y);
    } else {
      this.context.ellipse(this.position.x, this.position.y, this.fontSize);
    }

    this.context.pop();
  }

  public isInView(view: View): boolean {
    switch (true) {
      case this.position.x < -view.width:
        return false;
      case this.position.x > view.width:
        return false;
      case this.position.y < -view.height:
        return false;
      case this.position.y > view.height:
        return false;
      default:
        return true;
    }
  }
}

new p5(sketch);
