import p5 from "p5";

const drawAxesHelper = (context: p5) => {
  context.push();
  // xAxis
  context.stroke("red");
  context.line(0, 0, 0, 999, 0, 0);

  // yAxis
  context.stroke("green");
  context.line(0, 0, 0, 0, -999, 0);

  // zAxis
  context.stroke("blue");
  context.line(0, 0, 0, 0, 0, 999);
  context.pop();
};

export { drawAxesHelper };
