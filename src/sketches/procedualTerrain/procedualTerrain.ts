import p5 from "p5";

const CANVAS_DIMENSION = 600;

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(CANVAS_DIMENSION, CANVAS_DIMENSION);
    context.background("lightGrey");

    const main = context.select("main");
    main?.addClass("center_canvas");
  };

  context.draw = () => {};
};

new p5(sketch);
