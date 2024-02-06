import p5 from "p5";
import { Button } from "./Button";
import { Position } from "./types";
import { createButton, isColliding } from "./utils";

const buttonWidth = 200;
const buttonHeight = 60;

const sketch = (context: p5) => {
  let button: Button;
  let mousePosition: Position;

  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.fill("blue");

    button = createButton(context, buttonWidth, buttonHeight);
  };

  context.draw = () => {
    context.background("#fefefe");

    context.push();
    context.noStroke();
    button.render();
    context.pop();

    button.showHitbox();
  };

  context.mouseMoved = () => {
    mousePosition = { x: context.mouseX, y: context.mouseY };

    if (isColliding(mousePosition, button.getHitbox())) {
      button.setPosition({
        x: context.random(context.windowWidth),
        y: context.random(context.windowHeight),
      });
      context.fill("orange");
    } else {
      context.fill("blue");
    }
  };
};

new p5(sketch);
