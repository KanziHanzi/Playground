import p5 from "p5";

let cols: number;
let rows: number;

const width: number = 1200;
const height: number = 900;

const scale = 20;

let terrain: number[][];

const sketch = (context: p5) => {
  context.preload = () => {
    // pre load assets or do some stuff in advance before the "setup" method runs
  };

  context.setup = () => {
    const { windowWidth, windowHeight } = context;

    context.createCanvas(windowWidth, windowHeight, context.WEBGL);

    cols = Math.floor(width / scale);
    rows = Math.floor(height / scale);

    // context.angleMode(context.DEGREES);
    context.stroke(255);
    context.noFill();

    terrain = Array.from({ length: cols }, () => Array(rows).fill(0));

    for (let y = 0; y < rows - 1; y++) {
      for (let x = 0; x < cols; x++) {
        terrain[x][y] = context.random(-10, 10);
      }
    }

    console.log(terrain);
  };

  context.draw = () => {
    context.background(0, 0, 0);

    context.translate(-width / 2, -height / 10);
    context.rotateX(Math.PI / 3);

    for (let y = 0; y < rows - 1; y++) {
      context.beginShape(context.TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        context.vertex(x * scale, y * scale, terrain[x][y]);
        context.vertex(x * scale, (y + 1) * scale, terrain[x][y + 1]);
      }
      context.endShape();
    }
  };

  context.mouseMoved = () => {
    // one of many event methods to do stuff based on user input
  };
};

new p5(sketch);
