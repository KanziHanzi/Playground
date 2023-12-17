import { getRandomStrokeColor } from "../utils/randomStroke";

interface IPoint {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}

export const drawAnimatedCanvas = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const points: IPoint[] = [];

  context.lineWidth = 0.5;
  context.strokeStyle = getRandomStrokeColor();

  // random attractor points
  const a = Math.random() * 4 - 2;
  const b = Math.random() * 4 - 2;
  const c = Math.random() * 4 - 2;
  const d = Math.random() * 4 - 2;

  for (let y = 0; y < height; y += 5) {
    const startingPoint: IPoint = {
      x: 0,
      y: y,
      velocityX: 0,
      velocityY: 0,
    };

    points.push(startingPoint);
  }

  render(context, points, width, height, a, b, c, d);
};

const render = (
  context: CanvasRenderingContext2D,
  points: IPoint[],
  width: number,
  height: number,
  a: number,
  b: number,
  c: number,
  d: number
) => {
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const value = getValue(point.x, point.y, width, height, a, b, c, d);

    point.velocityX += Math.cos(value) * 0.3;
    point.velocityY += Math.sin(value) * 0.3;

    context.beginPath();
    context.moveTo(point.x, point.y);

    point.x += point.velocityX;
    point.y += point.velocityY;

    context.lineTo(point.x, point.y);
    context.stroke();

    // friction to slow down acceleration
    point.velocityX *= 0.99;
    point.velocityY *= 0.99;

    // screen boundaries
    if (point.x > width) point.x = 0;
    if (point.y > height) point.y = 0;
    if (point.x < 0) point.x = width;
    if (point.y < 0) point.y = height;
  }

  // recursively call itself every one frame
  requestAnimationFrame(() => {
    render(context, points, width, height, a, b, c, d);
  });
};

const getValue = (
  x: number,
  y: number,
  width: number,
  height: number,
  a: number,
  b: number,
  c: number,
  d: number
) => {
  const scaleFactor = 0.005;
  x = (x - width / 2) * scaleFactor;
  y = (y - height / 2) * scaleFactor;
  // return (x + y) * 0.01 * Math.PI * 2;

  const x1 = Math.sin(a * y) + c * Math.cos(a * x);
  const y1 = Math.sin(b * x) + d * Math.cos(b * y);

  return Math.atan2(y1 - y, x1 - x);
};
