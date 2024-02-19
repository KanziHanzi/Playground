import p5 from "p5";
import { isPrimeNumber } from "src/utils";

const maxNumber = 1000;
let angle = 0;
let scaleFactor = 0.2;

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.background(10, 20, 30);
    context.fill("#fefefe");
    context.noStroke();
    context.angleMode("degrees");
  };

  context.draw = () => {
    context.translate(context.windowWidth / 2, context.windowHeight / 2);

    for (let i = 1; i <= maxNumber; i++) {
      if (isPrimeNumber(i)) {
        const distance = i;

        const x = distance * context.sin(angle);
        const y = distance * context.cos(angle);

        context.text(i, x, y);
        // context.scale(scaleFactor + i);
      }
      angle++;
    }
    context.noLoop();
  };
};

new p5(sketch);
