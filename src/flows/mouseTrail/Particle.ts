import p5, { p5InstanceExtensions } from "p5";
import { getRandomStrokeColor } from "src/utils/randomStroke";

interface IParticle {
  show: () => void;
  update: () => void;
  isOutOfBounds: (x: number, y: number) => boolean;
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
    this.position = context.createVector(context.winMouseX, context.winMouseY);
    this.velocity = context.createVector(0, 0);
    this.acceleration = p5.Vector.random2D().normalize().mult(0.1, 0.1);

    this.size = 10;
    this.color = getRandomStrokeColor();
  }

  public show() {
    this.context.stroke(this.color);
    this.context.ellipse(this.position.x, this.position.y, this.size);
  }

  public update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  public isOutOfBounds(x: number, y: number): boolean {
    switch (true) {
      case this.position.x < -x:
        return true;
      case this.position.x > x:
        return true;
      case this.position.y < -y:
        return true;
      case this.position.y > y:
        return true;
      default:
        return false;
    }
  }
}
