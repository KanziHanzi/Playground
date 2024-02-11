import p5 from "p5";
import { Button } from "./Button";
import { Position } from "./types";
import { createButton, isColliding } from "./utils";

const buttonWidth = 200;
const buttonHeight = 60;

const sketch = (context: p5) => {
  let button: Button;
  let mousePosition: Position;
  let buttonPosition: Position;

  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.fill("blue");
    context.angleMode("degrees")

    button = createButton(context, buttonWidth, buttonHeight);
    buttonPosition = button.getPosition();
  };

  context.draw = () => {
    context.background("#fefefe");

    context.push();
    context.noStroke();
    button.render();
    context.pop();

    context.push();
    context.drawingContext.setLineDash([]);
    context.line(
      context.mouseX,
      context.mouseY,
      button.getCenterPoint().x,
      button.getCenterPoint().y
    );
    context.pop();

    button.showHitbox();
  };

  context.mouseMoved = () => {
    mousePosition = { x: context.mouseX, y: context.mouseY };

    if (isColliding(mousePosition, button.getHitbox())) {
      const angle = context.atan2(
        button.getCenterPoint().y - context.mouseY,
        button.getCenterPoint().x - context.mouseX
      );

      const maxDistanceX =
        button.getCenterPoint().x - button.getHitbox().topLeftX;

      const maxDistanceY =
        button.getCenterPoint().y - button.getHitbox().topLeftY;

      const distanceToCenterX = button.getCenterPoint().x - mousePosition.x;
      const distanceToCenterY = button.getCenterPoint().y - mousePosition.y;

      let transformX: number;
      let transformY: number;

      if (angle >= 0) {
        transformY = maxDistanceY - distanceToCenterY;
      } else {
        transformY = -maxDistanceY - distanceToCenterY;
      }

      if (angle <= 90) {
        transformX = maxDistanceX - distanceToCenterX;
      } else {
        transformX = -maxDistanceX - distanceToCenterX;
      }

      console.log(angle);

      button.setPosition({
        x: buttonPosition.x + transformX,
        y: buttonPosition.y + transformY,
      });

      // console.log(angle);
      // context.rotate(180);

      context.fill("orange");
    } else {
      button.resetPosition();
      context.fill("blue");
    }
  };

  const getDistance = (): Position => {
    return { x: 0, y: 0 };
  };
};

new p5(sketch);
