import p5 from "p5";
import { Button, Dimensions, Position } from "./Button";

type CollisionBox = {
  topLeftX: number;
  topLeftY: number;
  topRightX: number;
  topRightY: number;
  bottomLeftX: number;
  bottomLeftY: number;
  bottomRightX: number;
  bottomRightY: number;
};

const buttonWidth = 200;
const buttonHeight = 60;

const sketch = (context: p5) => {
  let button: Button;
  let buttonDimensions: Dimensions;
  let buttonPosition: Position;
  let mousePosition: Position;

  let hitbox: CollisionBox;

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

    buttonDimensions = button.getDimensions();
  };

  context.draw = () => {
    buttonPosition = button.getPosition();

    hitbox = {
      topLeftX: buttonPosition.x,
      topLeftY: buttonPosition.y,
      topRightX: buttonPosition.x + buttonDimensions.width,
      topRightY: buttonPosition.y,
      bottomLeftX: buttonPosition.x,
      bottomLeftY: buttonPosition.y + buttonDimensions.height,
      bottomRightX: buttonPosition.x + buttonDimensions.width,
      bottomRightY: buttonPosition.y + buttonDimensions.height,
    };

    context.push();

    button.render();

    context.pop();
  };

  context.mouseMoved = () => {
    mousePosition = { x: context.mouseX, y: context.mouseY };

    if (isColliding(mousePosition, hitbox)) {
      context.fill("orange");
    } else {
      context.fill("blue");
    }
  };

  const isColliding = (
    mousePosition: Position,
    hitbox: CollisionBox
  ): boolean => {
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
