import p5 from "p5";

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.background(10, 20, 30);
  };

  context.draw = () => {
    // runs every frame, main method to draw and render on the canvas
  };
};

new p5(sketch);
