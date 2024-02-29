import p5 from "p5";

const lineCount = 10;

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

    context.background("#FFFFF8");
  };

  context.draw = () => {
    for (let i = 0; i < lineCount; i++) {
      context.line(
        context.random(0, 600),
        0,
        context.random(0, 600),
        800
      );
    }

    context.noLoop();
  };

  context.mouseMoved = () => {
    console.log(context.mouseX, context.mouseY);
  };
};

new p5(sketch);
