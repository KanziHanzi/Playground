import p5 from "p5";
// import SoundFile from "p5/lib/addons/p5.sound";

const sketch = (context: p5) => {
  // console.log(SoundFile);

  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.background("#000");
  };

  context.draw = () => {
    context.fill(255, 0, 0);
    context.noStroke();
    context.rectMode(context.CENTER);
    context.rect(context.mouseX, context.mouseY, 50, 50);
  };

  context.mousePressed = () => {
    context.background("#000");
  };
};

new p5(sketch);
