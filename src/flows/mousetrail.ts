export const mouseTrail = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  document.addEventListener("mousemove", (e: MouseEvent) =>
    onCursorMove(e, context)
  );

  context.strokeStyle = "#fff";
};

// const particleNum = 50;

const onCursorMove = (e: MouseEvent, context: CanvasRenderingContext2D) => {
  const cursorX = e.pageX;
  const cursorY = e.pageY;

  draw(context, cursorX, cursorY);
  // for (let i = 0; i <= particleNum; i++) {
  //   console.log(i);
  //   draw(context, cursorX, cursorY);
  // }
};

const particleSize = 10;
const radius = 30;

const draw = (context: CanvasRenderingContext2D, x: number, y: number) => {
  context.beginPath();
  context.moveTo(x - radius, y - radius);
  context.rect(x - radius, y - radius, 5, 5);
  context.stroke();

  // requestAnimationFrame(() => context.rotate(360));
};
