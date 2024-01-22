import p5 from "p5";
import { getRandomStrokeColor } from "src/utils/randomStroke";

const rectWidth = 600;
const rectHeight = 600;

const limit = 200;

const sketch = (context: p5) => {
  let width: number;
  let height: number;

  context.preload = () => {
    width = context.windowWidth;
    height = context.windowHeight;
  };

  context.setup = () => {
    context.createCanvas(width, height);

    context.angleMode("degrees");
    context.rectMode("center"); // set (0,0) starting point of rects to center position instead of top left
  };

  context.draw = () => {
    context.background(10, 20, 30);
    context.strokeWeight(2)
    context.noFill();

    context.translate(width / 2, height / 2);

    for (let i = 0; i <= limit; i++) {
      context.push();

      if (i % 5 === 0) {
        // context.stroke(getRandomStrokeColor());
      } else {
        context.stroke("#fff");
      }

      context.rotate(context.sin(context.frameCount + i * 3) * 100);

      context.rect(0, 0, rectWidth - i * 3, rectHeight - i * 3, limit - i);

      context.pop();
    }
  };
};

new p5(sketch);
