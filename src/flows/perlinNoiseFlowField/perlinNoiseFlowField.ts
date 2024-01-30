import p5 from "p5";

const cellSize = 20;

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.background("#fefefe");
    context.stroke("#000");
  };

  context.draw = () => {
    for (let x = 0; x < context.windowWidth; x += cellSize) {
      for (let y = 0; y < context.windowHeight; y += cellSize) {
        const noise = context.noise(x, y);
        const angle = noise;

        context.push();
        context.translate(x, y);

        const vector = p5.Vector.fromAngle(angle);

        context.line(0, 0, vector.x * cellSize, vector.y * cellSize);

        context.pop();
      }
    }
  };
};

new p5(sketch);
