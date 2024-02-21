import p5, { p5InstanceExtensions } from "p5";
import { isPrimeNumber } from "src/utils";

let angle = 0;
let scaleFactor = 3;

const friction = 0.95;

const maxNumber = 10000;
const primeNumbers: PrimeNumber[] = [];
const view: View = { width: 0, height: 0 };

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.fill("#fefefe");
    context.noStroke();

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
    if (scaleFactor > 0.1) {
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

  constructor(
    context: p5InstanceExtensions,
    position: Position,
    content: number
  ) {
    this.context = context;
    this.position = position;
    this.content = content;
  }

  public show(): void {
    this.context.push()
    this.context.textSize(12 * scaleFactor);
    console.log(12 * scaleFactor)
    this.context.text(this.content, this.position.x, this.position.y);
    this.context.pop()
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
