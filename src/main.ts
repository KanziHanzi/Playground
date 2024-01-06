import { drawAnimatedCanvas } from "./flows/dynamic";
import { mouseTrail } from "./flows/mousetrail";
import { drawStaticFlow } from "./flows/static";

const button = document.querySelector("button");

const drawCanvas = () => {
  const canvas = document.querySelector("canvas");

  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  canvas.style.backgroundColor = "#000000";

  // drawStaticFlow(context, width, height);
  // drawAnimatedCanvas(context, width, height);
  mouseTrail(context, width, height);
};

drawCanvas();
button!.addEventListener("click", drawCanvas);
