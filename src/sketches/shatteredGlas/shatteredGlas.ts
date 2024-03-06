import p5, { p5InstanceExtensions } from "p5";
import { Boundaries } from "src/common";
import { Position, getFrameBoundaries } from "src/utils";

const lineCount = 10;

let paintedPixels: Position[] = [];

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
      const vector = context.createVector(0, 0);

      const line = new Line(context, vector);

      lines.push(line);
    }

    paintedPixels = getFrameBoundaries(boundaries);

    context.background("#FFFFF8");
    context.stroke("#000");
  };

  context.draw = () => {
    if (accessIndex === lineCount - 1) {
      console.log("finished drawing");
      context.noLoop();
    }

    const line = lines[accessIndex];

    if (line.getPosition().x === 0 && line.getPosition().y === 0) {
      const index = Math.floor(context.random(0, paintedPixels.length));
      const startingPosition = paintedPixels[index];

      if (startingPosition) {
        line.setStartingPosition(startingPosition);
      } else {
        line.setStartingPosition({ x: context.random(0, 600), y: 800 });
      }
    }

    if (!line.isOutOfBounds(boundaries)) {
      line.drawCurrentPixel();
      line.updatePosition();
    } else {
      accessIndex++;
    }

    if (
      paintedPixels.find((pixel) => {
        const { x, y } = line.getNextPosition();
        const drawingPosition = { x: Math.floor(x), y: Math.floor(y) };

        const isColliding =
          drawingPosition.x === pixel.x && drawingPosition.y === pixel.y;

        return isColliding;
      })
    ) {
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

  public getNextPosition(): Position {
    const { x, y } = this.position.copy().add(this.velocity);

    return { x, y };
  }

  public setStartingPosition(pos: Position): void {
    this.position.x = pos.x;
    this.position.y = pos.y;
  }
}

new p5(sketch);
