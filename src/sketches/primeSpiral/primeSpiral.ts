import p5, { p5InstanceExtensions } from "p5";
import { isPrimeNumber } from "src/utils";

let angle = 0;
let scaleFactor = 5;

const friction = 0.95;

const maxNumber = 50000;
const primeNumbers: PrimeNumber[] = [];
const view: View = { width: 0, height: 0 };

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.fill("#fefefe");
    context.noStroke();
    context.angleMode("degrees");

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
    context.translate(context.windowWidth / 2, context.windowHeight / 2);

    view.width = context.windowWidth / scaleFactor;
    view.height = context.windowHeight / scaleFactor;

    context.scale(scaleFactor);
    if (!primeNumbers[primeNumbers.length - 1].isInView(view)) {
      scaleFactor -= 0.01 * friction;
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

    const size = context.map(this.content, 1, maxNumber, 5, 500);

    this.fontSize = size;
  }

  public show(): void {
    this.context.push();

    if (scaleFactor > 0.5) {
      this.context.textSize(this.fontSize);
      this.context.text(this.content, this.position.x, this.position.y);
    } else {
      this.context.rect(this.position.x, this.position.y, this.fontSize);
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
