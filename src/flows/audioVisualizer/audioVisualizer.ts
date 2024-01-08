import p5, { p5InstanceExtensions } from "p5";
import "p5/lib/addons/p5.sound";
import { drawCircle, handlePlayback } from "./utils";
import { getRandomStrokeColor } from "../../utils/randomStroke";

const sketch = (context: p5) => {
  let sound: p5.SoundFile;
  let fft: p5.FFT;
  const particles: Particle[] = [];

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
    context.background("#000");
    context.stroke(getRandomStrokeColor());
    context.strokeWeight(3);

    context.translate(context.windowWidth / 2, context.windowHeight / 2);

    fft.analyze();
    const amplitude = fft.getEnergy("bass");

    const wave: number[] = fft.waveform();

    drawCircle(context, wave);

    const particle = new Particle(context);
    particles.push(particle);

    particles.forEach((particle: Particle, index: number) => {
      if (particle.isOutOfBounds()) {
        // remove particel from array if out of window bounds
        particles.splice(index, 1);
      } else {
        particle.update(amplitude);
        particle.show();
      }
    });
  };
};

const accelerationMultiplier = 0.0001;
const positionMultiplier = 360; // average between min and max y scale

interface IParticle {
  show: () => void;
  update: (amplitude: number) => void;
  hide: () => void;
  isOutOfBounds: () => boolean;
}

class Particle implements IParticle {
  private context: p5InstanceExtensions;
  private position: p5.Vector;
  private velocity: p5.Vector;
  private acceleration: p5.Vector;
  private size: number;
  private color: string;

  constructor(context: p5InstanceExtensions) {
    this.context = context;

    this.position = p5.Vector.random2D().mult(positionMultiplier);
    this.velocity = context.createVector(0, 0);
    this.acceleration = this.position
      .copy()
      .mult(Math.random() * accelerationMultiplier);
    this.size = context.random(3, 5);
    this.color = getRandomStrokeColor();
  }

  public update(amplitude: number) {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    if (amplitude > 210) {
      this.position.add(this.velocity);
      this.position.add(this.velocity);
      this.position.add(this.velocity);
    }
  }

  public show() {
    this.context.noStroke();
    this.context.fill(this.color);
    this.context.ellipse(this.position.x, this.position.y, this.size);
  }

  public isOutOfBounds(): boolean {
    switch (true) {
      case this.position.x < -this.context.windowWidth / 2:
        return true;
      case this.position.x > this.context.windowWidth / 2:
        return true;
      case this.position.y < -this.context.windowHeight / 2:
        return true;
      case this.position.y > this.context.windowHeight / 2:
      default:
        return false;
    }
  }

  public hide() {}
}

new p5(sketch);
