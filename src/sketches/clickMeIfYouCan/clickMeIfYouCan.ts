import p5 from "p5";
import { Button } from "./Button";
import { Position } from "./types";
import { createButton, isColliding } from "./utils";

const buttonWidth = 200;
const buttonHeight = 60;

const sketch = (context: p5) => {
  let button: Button;
  let mousePosition: Position;
  let pivotPoint: Position;

  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.fill("blue");

    button = createButton(context, buttonWidth, buttonHeight);
    pivotPoint = button.getPivotPoint();
  };

  context.draw = () => {
    context.background("#fefefe");

    context.push();
    context.noStroke();

    context.constrain(button.getPosition().x, 500, 600);
    context.constrain(button.getPosition().y, 400, 600);

    button.render();
    context.pop();

    context.push();
    context.drawingContext.setLineDash([]);
    context.line(
      context.mouseX,
      context.mouseY,
      button.getPosition().x,
      button.getPosition().y
    );
    context.pop();

    button.showHitbox();
  };

  context.mouseMoved = () => {
    mousePosition = { x: context.mouseX, y: context.mouseY };

    if (isColliding(mousePosition, button.getHitbox())) {
      const angle = context.atan2(
        button.getPosition().y - context.mouseY,
        button.getPosition().x - context.mouseX
      );

      // const maxDistanceX = pivotPoint.x - button.getHitbox().topLeftX;
      // const maxDistanceY = pivotPoint.y - button.getHitbox().topLeftY;

      const distanceX = mousePosition.x - pivotPoint.x;
      const distanceY = mousePosition.y - pivotPoint.y;

      const previousDistanceX = context.pmouseX - pivotPoint.x;
      const previousDistanceY = context.pmouseY - pivotPoint.y;

      const totalDistance = distanceX + distanceY;
      const previousTotalDistance = previousDistanceX + previousDistanceY;

      console.log(totalDistance - previousTotalDistance);

      console.log(button.getPosition().x);

      const angleVector = p5.Vector.fromAngle(angle);

      // if (totalDistance - previousTotalDistance > 0) {
      //   button.updatePosition(angleVector, "sub");
      // } else {
      //   button.updatePosition(angleVector, "add");
      // }
      button.updatePosition(angleVector, "add");

      context.fill("orange");
    } else {
      button.resetPosition();
      context.fill("blue");
    }
  };
};

new p5(sketch);
