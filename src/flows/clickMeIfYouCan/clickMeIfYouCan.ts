import p5 from "p5";
import { Button } from "./Button";

const buttonWidth = 200;
const buttonHeight = 60;

const sketch = (context: p5) => {
  let button: Button;

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

    button.render();

    context.pop();
  };

  context.mouseMoved = () => {};
};

new p5(sketch);
