import p5 from "p5";
import { getRandomStrokeColor } from "src/utils/color";
import { Boundaries, isOutOfBounds } from "./utils";

const vectors: p5.Vector[] = [];

const particleCount = 2000;
const noiseScale = 0.01;

let backgroundColor: p5.Color;
let backgroundAlpha: number = 30;

let boundaries: Boundaries;

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.stroke(getRandomStrokeColor());
    context.strokeWeight(2);

    boundaries = {
      x: context.windowWidth,
      negativeX: 0,
      y: context.windowHeight,
      negativeY: 0,
    };

    backgroundColor = context.color(10, 20, 30, backgroundAlpha);

    const inputSlider = context.createInput("30", "range");
    inputSlider.position(context.windowWidth / 2 - 50, 0);
    inputSlider.attribute("min", "0");
    inputSlider.attribute("max", "55");

    inputSlider.elt.addEventListener("change", (event: any) => {
      backgroundAlpha = event.target.value;
      backgroundColor.setAlpha(backgroundAlpha);
    });

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

      if (isOutOfBounds(vector, boundaries)) {
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
    context.background(0); // reset particle trails
  };
};

new p5(sketch);
