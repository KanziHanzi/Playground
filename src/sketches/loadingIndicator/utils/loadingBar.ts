import { p5InstanceExtensions } from "p5";

export const drawLoadingBar = (context: p5InstanceExtensions) => {
  context.push();
  context.noFill();
  context.stroke("#fff");
  context.strokeWeight(1);

  context.rect(-300, 300, 600, 50, 10);
  context.pop();
};

export const animateLoadingBar = (
  context: p5InstanceExtensions,
  loadingBarProgress: number,
  progress: number
) => {
  context.push();
  context.rect(-295, 305, loadingBarProgress, 40, 5);

  context.stroke("#fff");
  context.fill("#fff");
  context.strokeWeight(1);

  context.text(`${Math.floor(progress * 100)}%`, -20, 328);
  context.pop();
};
