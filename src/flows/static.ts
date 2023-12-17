import { getRandomStrokeColor } from "../utils/randomStroke";

export const drawStaticFlow = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const particleCount = 100000;
  context.lineWidth = 0.25;

  for (let i = 0; i < particleCount; i++) {
    context.strokeStyle = getRandomStrokeColor();
    const x = Math.random() * width;
    const y = Math.random() * height;

    const rotationValue = getRotationValue(x, y);

    context.save();
    context.translate(x, y);

    renderLine(context, rotationValue);

    context.restore();
  }
};

const getRotationValue = (x: number, y: number) => {
  return (Math.sin(x * 0.01) + Math.sin(y * 0.01)) * Math.PI * 2;
};

const renderLine = (context: CanvasRenderingContext2D, value: number) => {
  context.rotate(value);
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(Math.random() * 30 + 30, 1);
  context.stroke();
};
