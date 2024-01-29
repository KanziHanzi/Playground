import p5 from "p5";
import { getRandomStrokeColor } from "src/utils/color";

const vectors: p5.Vector[] = [];

const particleCount = 2000;
const noiseScale = 0.01;

let backgroundColor: p5.Color;

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.stroke(getRandomStrokeColor());
    context.strokeWeight(2);

    backgroundColor = context.color(10, 20, 30, 55);

    for (let i = 0; i < particleCount; i++) {
      const vector = context.createVector(
        context.random(context.windowWidth),
        context.random(context.windowHeight)
      );

      vectors.push(vector);
    }
  };

  context.draw = () => {
    context.background(backgroundColor);

    for (let i = 0; i < vectors.length; i++) {
      const vector = vectors[i];
      context.push();

      context.point(vector.x, vector.y);

      const noise = context.noise(vector.x * noiseScale, vector.y * noiseScale);
      const angle = noise * context.TWO_PI;

      vector.x += context.cos(angle);
      vector.y += context.sin(angle);

      if (isOutOfBounds(vector)) {
        vector.x = context.random(context.windowWidth);
        vector.y = context.random(context.windowHeight);
      }
      context.pop();
    }
  };

  context.keyPressed = (event: KeyboardEvent) => {
    const pressedKey = event.code; // returns keyCode

    if (pressedKey !== "Space") return;

    context.noiseSeed(context.millis());
    context.stroke(getRandomStrokeColor());
    backgroundColor.setAlpha(context.random(55));
  };

  const isOutOfBounds = (vector: p5.Vector) => {
    switch (true) {
      case vector.x < 0:
        return true;
      case vector.x > context.windowWidth:
        return true;
      case vector.y < 0:
        return true;
      case vector.y > context.windowHeight:
      default:
        return false;
    }
  };
};

new p5(sketch);
