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

      const maxDistanceX = pivotPoint.x - button.getHitbox().topLeftX;
      const maxDistanceY = pivotPoint.y - button.getHitbox().topLeftY;

      const distanceX = mousePosition.x - pivotPoint.x;
      const distanceY = mousePosition.y - pivotPoint.y;

      console.log(maxDistanceX - distanceX, maxDistanceY - distanceY);

      const directionalForce = context.createVector(distanceX, distanceY);

      const angleVector = p5.Vector.fromAngle(angle);
      // console.log(vector.x, vector.y, mousePosition);

      console.log(angleVector);

      button.updatePosition(angleVector);

      context.fill("orange");
    } else {
      button.resetPosition();
      context.fill("blue");
    }
  };
};

new p5(sketch);
