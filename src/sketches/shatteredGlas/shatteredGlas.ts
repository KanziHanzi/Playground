import p5 from "p5";

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(600, 800);

    const main = context.select("main");
    const canvas = context.select("canvas");
    const background = context.createDiv();
    background.addClass("background");
    const frame = context.createDiv();
    frame.addClass("frame");

    main?.child(background);
    background.child(frame);
    if (canvas) {
      frame.child(canvas);
    }

  };

  context.draw = () => {
    context.background("red");
  };
};

new p5(sketch);
