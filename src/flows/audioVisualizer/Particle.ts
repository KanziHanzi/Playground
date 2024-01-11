import p5, { p5InstanceExtensions } from "p5";
import { getRandomStrokeColor } from "src/utils/randomStroke";

const accelerationMultiplier = 0.0001;
const positionMultiplier = 360; // average between min and max y scale

interface IParticle {
  show: () => void;
  update: (amplitude: number) => void;
  hide: () => void;
  isOutOfBounds: () => boolean;
}

export class Particle implements IParticle {
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
