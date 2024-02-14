import p5 from "p5";
import "p5/lib/addons/p5.sound";
import { drawCircle, handlePlayback } from "./utils";
import { getRandomStrokeColor } from "src/utils";
import { createParticle } from "./utils";
import { Boundaries, Particle } from "src/common";

const sketch = (context: p5) => {
  let sound: p5.SoundFile;
  let fft: p5.FFT;
  const particles: Particle[] = [];
  let boundaries: Boundaries;

  context.mousePressed = () => {
    handlePlayback(sound, context);
  };

  context.keyPressed = (event: KeyboardEvent) => {
    const pressedKey = event.code; // returns keyCode

    if (pressedKey !== "Space") return;

    handlePlayback(sound, context);
  };

  context.preload = () => {
    sound = context.loadSound(
      "src/flows/audioVisualizer/assets/CantinaBand.mp3",
      () => console.log("success"),
      () => console.log("error")
    );
    context.noLoop();
  };

  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);
    context.angleMode("degrees");

    fft = new p5.FFT();
  };

  context.draw = () => {
    context.background(10, 20, 30);
    context.stroke(getRandomStrokeColor());
    context.strokeWeight(3);
    boundaries = {
      x: context.windowWidth / 2,
      y: context.windowHeight / 2,
      negativeX: -context.windowWidth / 2,
      negativeY: -context.windowHeight / 2,
    };

    context.translate(context.windowWidth / 2, context.windowHeight / 2);

    fft.analyze();
    const amplitude = fft.getEnergy("bass");

    const wave: number[] = fft.waveform();

    drawCircle(context, wave);

    const particle = createParticle(context);
    particles.push(particle);

    particles.forEach((particle: Particle, index: number) => {
      if (particle.isOutOfBounds(boundaries)) {
        // remove particel from array if out of window bounds
        particles.splice(index, 1);
      } else {
        particle.update(amplitude);
        particle.show();
      }
    });
  };
};

new p5(sketch);
