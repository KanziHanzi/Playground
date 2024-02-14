import p5 from "p5";
import { isPrimeNumber } from "src/utils";

const maxNumber = 1000;

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.background(10, 20, 30);
    context.stroke("#fff");
  };

  context.draw = () => {
    context.translate(context.windowWidth / 2, context.windowHeight / 2);

    for (let i = 1; i <= maxNumber; i++) {
      if (isPrimeNumber(i)) {
        const angle = context.random(0, context.TWO_PI);
        const distance = i;

        const x = distance * context.sin(angle);
        const y = distance * context.cos(angle);

        context.point(x, y);
      }
    }
  };
};

new p5(sketch);
