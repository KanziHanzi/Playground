import p5, { Renderer } from "p5";

const width = 600;
const height = 600;

const size = 50;

let cols: number;
let rows: number;

let zOff = 0;

const sketch = (context: p5) => {
  context.setup = () => {
    const { windowWidth, windowHeight } = context;

    context.createCanvas(windowWidth, windowHeight, context.WEBGL);

    cols = Math.floor(width / size);
    rows = Math.floor(height / size);

    context.angleMode("degrees");
  };

  context.draw = () => {
    const { windowWidth, windowHeight } = context;

    context.orbitControl();
    context.background(220);

    drawAxesHelper(context);

    context.translate(-(width - size) / 2, -(height - size) / 2);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        context.push();
        context.translate(size * i, size * j);
        const depth = context.random(10, 300);
        context.box(30, 30, depth);
        context.pop();
      }
      zOff + 1;
    }
  };

  context.mouseClicked = () => {
    console.log(context.mouseX, context.mouseY);
  };
};

const drawAxesHelper = (context: p5) => {
  context.push();
  // xAxis
  context.stroke("red");
  context.line(0, 0, 0, 999, 0, 0);

  // yAxis
  context.stroke("green");
  context.line(0, 0, 0, 0, -999, 0);

  // zAxis
  context.stroke("blue");
  context.line(0, 0, 0, 0, 0, 999);
  context.pop();
};

new p5(sketch);
