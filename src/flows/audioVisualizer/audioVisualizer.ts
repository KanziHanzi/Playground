import p5 from "p5";
import "p5/lib/addons/p5.sound";
import { drawCircle, handlePlayback } from "./utils";

const sketch = (context: p5) => {
  let sound: p5.SoundFile;
  let fft: p5.FFT;

  context.preload = () => {
    sound = context.loadSound(
      "src/flows/audioVisualizer/assets/CantinaBand.mp3",
      () => console.log("success"),
      () => console.log("error")
    );
  };

  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.noFill();
    context.angleMode("degrees");

    fft = new p5.FFT();
  };

  context.draw = () => {
    context.background("#000");
    context.stroke("#fff");

    context.translate(context.windowWidth / 2, context.windowHeight / 2);

    const wave: number[] = fft.waveform();

    drawCircle(context, wave);
  };

  context.mousePressed = () => {
    handlePlayback(sound, context);
  };

  context.keyPressed = (event: KeyboardEvent) => {
    const pressedKey = event.code; // returns keyCode

    if (pressedKey !== "Space") return;

    handlePlayback(sound, context);
  };
};

new p5(sketch);
