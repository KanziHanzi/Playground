import p5 from "p5";
import { Button, Hitbox, Position } from "./Button";

const buttonWidth = 200;
const buttonHeight = 60;

const sketch = (context: p5) => {
  let button: Button;
  let mousePosition: Position;

  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.background("#fefefe");
    context.fill("blue");

    button = new Button(
      context,
      {
        x: context.windowWidth / 2 - buttonWidth / 2,
        y: context.windowHeight / 2 - buttonHeight / 2,
      },
      { width: buttonWidth, height: buttonHeight }
    );
  };

  context.draw = () => {
    context.push();
    context.noStroke();
    button.render();
    context.pop();

    button.showHitbox();
  };

  context.mouseMoved = () => {
    mousePosition = { x: context.mouseX, y: context.mouseY };

    if (isColliding(mousePosition, button.getHitbox())) {
      context.fill("orange");
    } else {
      context.fill("blue");
    }
  };

  const isColliding = (mousePosition: Position, hitbox: Hitbox): boolean => {
    const mouseInXRange =
      mousePosition.x >= hitbox.topLeftX && mousePosition.x <= hitbox.topRightX;
    const mouseInYRange =
      mousePosition.y >= hitbox.topLeftY &&
      mousePosition.y <= hitbox.bottomLeftY;

    if (mouseInXRange && mouseInYRange) {
      return true;
    } else {
      return false;
    }
  };
};

new p5(sketch);
