import p5 from "p5";
import { Boundaries } from "src/common";
import { Position, getFrameBoundaries } from "src/utils";
import { Line } from "./Line";

const lineCount = 100;

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
    context.createCanvas(boundaries.x, boundaries.y);

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
    context.strokeWeight(2);
  };

  context.draw = () => {
    if (accessIndex === lineCount - 1) {
      console.log("finished drawing");
      context.noLoop();
    }

    const currentLine = lines[accessIndex];

    setStartingPosition(currentLine);

    drawPosition(currentLine);

    handleCollision(currentLine);

    updatePaintedPixels(currentLine.getPosition());
  };

  const setStartingPosition = (element: Line) => {
    if (element.getPosition().x === 0 && element.getPosition().y === 0) {
      const index = Math.floor(context.random(0, paintedPixels.length));
      const startingPosition = paintedPixels[index];

      element.setStartingPosition(startingPosition);
    }
  };

  const drawPosition = (element: Line) => {
    if (!element.isOutOfBounds(boundaries)) {
      element.drawCurrentPixel();
      element.updatePosition();
    } else {
      accessIndex++;
    }
  };

  const handleCollision = (element: Line) => {
    if (
      paintedPixels.find((pixel) => {
        const { x, y } = element.getNextPosition();
        const drawingPosition = { x: Math.floor(x), y: Math.floor(y) };

        const isColliding =
          drawingPosition.x === pixel.x && drawingPosition.y === pixel.y;

        return isColliding;
      })
    ) {
      accessIndex++;
    }
  };

  const updatePaintedPixels = (pixel: Position) => {
    const { x, y } = pixel;

    const flooredPixel = { x: Math.floor(x), y: Math.floor(y) };
    paintedPixels.push(flooredPixel);
  };
};

new p5(sketch);
