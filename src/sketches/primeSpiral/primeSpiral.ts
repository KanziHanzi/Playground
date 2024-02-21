import p5, { p5InstanceExtensions } from "p5";
import { isPrimeNumber } from "src/utils";

let angle = 0;
let scaleFactor = 2;

const friction = 0.95;

const maxNumber = 10000;
const primeNumbers: PrimeNumber[] = [];

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

    context.scale(scaleFactor);
    if (scaleFactor > 0.1) {
      scaleFactor -= 0.01 * friction;
      console.log(context)
    }

    primeNumbers.forEach((prime) => {
      prime.show();
    });
  };
};

type Position = {
  x: number;
  y: number;
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
    this.context.text(this.content, this.position.x, this.position.y);
  }

  // public isVisible(): boolean {

  // }
}

new p5(sketch);
