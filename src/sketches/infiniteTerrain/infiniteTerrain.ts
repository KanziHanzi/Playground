import p5 from "p5";

let cols: number;
let rows: number;

let width: number;
let height: number;

const scale = 20;
let flying = 0;

let terrain: number[][];

const sketch = (context: p5) => {
  context.preload = () => {
    // pre load assets or do some stuff in advance before the "setup" method runs
  };

  context.setup = () => {
    const { windowWidth, windowHeight } = context;

    width = windowWidth + 200;
    height = windowHeight + 200;

    context.createCanvas(windowWidth, windowHeight, context.WEBGL);

    cols = Math.floor(width / scale);
    rows = Math.floor(height / scale);

    context.stroke(255);
    context.noFill();
    context.frameRate(60);

    terrain = Array.from({ length: cols }, () => Array(rows).fill(0));
  };

  context.draw = () => {
    // console.log(context.frameRate(60))

    flying -= 0.1;
    let yOffset = flying;

    for (let y = 0; y < rows - 1; y++) {
      let xOffset = 0;
      for (let x = 0; x < cols; x++) {
        terrain[x][y] = context.map(
          context.noise(xOffset, yOffset),
          0,
          1,
          -80,
          80
        );
        xOffset += 0.2;
      }
      yOffset += 0.2;
    }

    context.background(0, 0, 0);

    context.translate(-width / 2, -height / 10);
    context.rotateX(Math.PI / 3);

    for (let y = 0; y < rows - 1; y++) {
      context.beginShape(context.TRIANGLE_STRIP);
      context.fill(100, 200, 1);
      context.stroke(0, 0, 0);
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
