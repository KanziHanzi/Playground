import p5, { p5InstanceExtensions } from "p5";
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

const hitboxPadding = 50;

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
      topLeftX: buttonPosition.x - hitboxPadding,
      topLeftY: buttonPosition.y - hitboxPadding,
      topRightX: buttonPosition.x + buttonDimensions.width + hitboxPadding,
      topRightY: buttonPosition.y - hitboxPadding,
      bottomLeftX: buttonPosition.x - hitboxPadding,
      bottomLeftY: buttonPosition.y + buttonDimensions.height + hitboxPadding,
      bottomRightX: buttonPosition.x + buttonDimensions.width + hitboxPadding,
      bottomRightY: buttonPosition.y + buttonDimensions.height + hitboxPadding,
    };

    context.push();
    context.noStroke();
    button.render();
    context.pop();

    drawHitbox(context, hitbox);
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

  const drawHitbox = (context: p5InstanceExtensions, hitbox: CollisionBox) => {
    context.strokeWeight(1);
    context.drawingContext.setLineDash([5, 5]);

    context.push();
    context.translate(hitbox.topLeftX, hitbox.topLeftY);
    context.line(0, 0, hitbox.topRightX - hitbox.topLeftX, 0);
    context.pop();

    context.push();
    context.translate(hitbox.topRightX, hitbox.topRightY);
    context.line(0, 0, 0, hitbox.bottomRightY - hitbox.topRightY);
    context.pop();

    context.push();
    context.translate(hitbox.bottomRightX, hitbox.bottomRightY);
    context.line(0, 0, hitbox.bottomLeftX - hitbox.bottomRightX, 0);
    context.pop();

    context.push();
    context.translate(hitbox.bottomLeftX, hitbox.bottomLeftY);
    context.line(0, 0, 0, hitbox.topLeftY - hitbox.bottomLeftY);
    context.pop();
  };
};

new p5(sketch);
