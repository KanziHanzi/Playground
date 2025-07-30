import p5 from "p5";

const gridWidth = 600;
const gridHeight = 600;

let sizes: number[][] = [];

let cols: number;
let rows: number;
let size: number = 20;

let xOff = 0;
let yOff = 0;
let zOff = 0;

const increment = 0.1;

const sketch = (context: p5) => {
  context.setup = () => {
    const { windowWidth, windowHeight } = context;

    context.createCanvas(windowWidth, windowHeight);
  };

  context.draw = () => {
    const { windowWidth, windowHeight } = context;
    context.background(223, 215, 200);

    xOff = 0;

    cols = gridWidth / size;
    rows = gridHeight / size;

    for (let i = 0; i < cols; i++) {
      sizes[i] = [];
      yOff = 0;
      for (let j = 0; j < rows; j++) {
        const noiseValue = context.noise(xOff, yOff, zOff);

        sizes[i][j] = context.map(noiseValue, 0, 1, 0, size * 1.7);
        yOff += increment;
      }
      xOff += increment;
      zOff += 0.0003;
    }

    let r = context.noise(zOff + 0) * 255;
    let g = context.noise(zOff + 10) * 255;
    let b = context.noise(zOff + 20) * 255;

    context.push();

    context.translate(
      (windowWidth - gridWidth) / 2,
      (windowHeight - gridHeight) / 2
    );

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        context.fill(r, g, b);
        context.noStroke();

        context.rect(i * size, j * size, sizes[i][j], sizes[i][j]);
      }
    }

    context.pop();
  };
};

new p5(sketch);
