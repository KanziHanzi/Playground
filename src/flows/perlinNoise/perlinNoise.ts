import p5, { Noise } from "p5";
import { getRandomStrokeColor } from "src/utils/color";

const vectors: p5.Vector[] = [];

const particleCount = 2000;
const noiseScale = 0.01;

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.stroke(getRandomStrokeColor());
    context.strokeWeight(2);

    for (let i = 0; i < particleCount; i++) {
      const vector = context.createVector(
        context.random(context.windowWidth),
        context.random(context.windowHeight)
      );

      vectors.push(vector);
    }
  };

  context.draw = () => {
    context.background(10, 20);

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

    context.noiseSeed(context.random(300));
    context.stroke(getRandomStrokeColor());
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
