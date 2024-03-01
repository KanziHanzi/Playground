import p5, { p5InstanceExtensions } from "p5";
import { Boundaries } from "src/common";

type Position = {
  x: number;
  y: number;
};

const lineCount = 10;

const paintedPixels: Position[] = [];

const lines: Line[] = [];

let accessIndex = 0;

const boundaries: Boundaries = {
  x: 600,
  y: 800,
  negativeX: 0,
  negativeY: 0,
};

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

    for (let i = 0; i < lineCount; i++) {
      const vector = context.createVector(
        context.random(0, 600),
        context.random(0, 800)
      );

      const line = new Line(context, vector);

      lines.push(line);
    }

    context.background("#FFFFF8");
    context.stroke("#000");
  };

  context.draw = () => {
    const line = lines[accessIndex];

    if (!line.isOutOfBounds(boundaries)) {
      line.drawCurrentPixel();
      line.updatePosition();
    } else {
      if (accessIndex === lineCount - 1) return;

      accessIndex++;
    }

    if (
      paintedPixels.find((pixel) => {
        const { x, y } = line.getPosition();
        const drawingPosition = { x: Math.floor(x), y: Math.floor(y) };

        const isColliding = drawingPosition.x === pixel.x && drawingPosition.y === pixel.y;
        if (isColliding) {
          console.log(drawingPosition, pixel)
        }

        return isColliding
      })
    ) {
      console.log("collision");
      if (accessIndex === lineCount - 1) return;

      accessIndex++;
    }

    const { x, y } = line.getPosition();
    const flooredPixel = { x: Math.floor(x), y: Math.floor(y) };
    paintedPixels.push(flooredPixel);
  };
};

class Line {
  context: p5InstanceExtensions;
  position: p5.Vector;
  velocity: p5.Vector;

  constructor(context: p5InstanceExtensions, position: p5.Vector) {
    this.context = context;
    this.position = position;

    const angle = context.random(0, context.TWO_PI);
    const angleVector = p5.Vector.fromAngle(angle);

    this.velocity = angleVector;
  }

  public drawCurrentPixel() {
    const { x, y } = this.position;

    this.context.point(x, y);
  }

  public updatePosition() {
    this.position.add(this.velocity);
  }

  public isOutOfBounds(boundaries: Boundaries): boolean {
    switch (true) {
      case this.position.x < boundaries.negativeX:
        return true;
      case this.position.x > boundaries.x:
        return true;
      case this.position.y < boundaries.negativeY:
        return true;
      case this.position.y > boundaries.y:
        return true;
      default:
        return false;
    }
  }

  public getPosition(): Position {
    const { x, y } = this.position;

    return { x, y };
  }
}

new p5(sketch);
