import p5 from "p5";
import "p5/lib/addons/p5.sound";

const sketch = (context: p5) => {
  let sound: p5.SoundFile;

  context.preload = () => {
    sound = context.loadSound(
      "src/assets/CantinaBand.mp3",
      () => console.log("success"),
      () => console.log("error")
    );
  };

  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.background("#000");
  };

  context.draw = () => {
    // context.fill(255, 0, 0);
    // context.noStroke();
    // context.rectMode(context.CENTER);
    // context.rect(context.mouseX, context.mouseY, 50, 50);
  };

  context.mousePressed = () => {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.play();
    }
  };
};

new p5(sketch);
