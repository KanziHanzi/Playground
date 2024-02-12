import p5 from "p5";

const sketch = (context: p5) => {
  context.preload = () => {
    // pre load assets or do some stuff in advance before the "setup" method runs
  };

  context.setup = () => {
    // setup canvas and any static params that won't change during renderr
    context.createCanvas(context.windowWidth, context.windowHeight);
  };

  context.draw = () => {
    // runs every frame, main method to draw and render on the canvas
  };

  context.mouseMoved = () => {
    // one of many event methods to do stuff based on user input
  }
};

new p5(sketch);
