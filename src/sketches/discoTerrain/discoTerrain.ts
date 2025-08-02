import p5, { Renderer } from "p5";

const width = 600;
const height = 600;

const size = 10;

let cols: number;
let rows: number;

let zOff = 0;

const increment = 0.05;

const sketch = (context: p5) => {
  context.setup = () => {
    const { windowWidth, windowHeight } = context;

    context.createCanvas(windowWidth, windowHeight, context.WEBGL);

    cols = Math.floor(width / size);
    rows = Math.floor(height / size);

    context.angleMode("degrees");
    context.camera(0, -700, 1000);
  };

  context.draw = () => {
    // context.orbitControl();
    // drawAxesHelper(context);

    context.background(220);

    context.rotateX(90);
    context.rotateZ(45);

    context.push();
    context.fill(220);
    context.noStroke();
    context.translate(0, 0, -100);
    context.plane(width * 2, height * 2);
    context.pop();

    let r = context.noise(zOff + 0) * 255;
    let g = context.noise(zOff + 10) * 255;
    let b = context.noise(zOff + 20) * 255;

    context.translate(-(width - size) / 2, -(height - size) / 2);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        context.push();
        context.fill(r, g, b);
        context.translate(size * i, size * j);

        const xNoise = i * increment;
        const yNoise = j * increment;
        const noise = context.noise(xNoise, yNoise, zOff);

        const depth = context.map(noise, 0, 1, 250, 500);

        context.box(size, size, depth);
        context.pop();
      }

      zOff += 0.0003;
    }
  };

  context.mouseClicked = () => {
    console.log(context.mouseX, context.mouseY);
  };
};

new p5(sketch);
