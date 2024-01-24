import p5, { p5InstanceExtensions } from "p5";

export type Boundaries = {
  x: number;
  y: number;
  negativeX: number;
  negativeY: number;
};

interface IParticle {
  show: () => void;
  update: (amplitude?: number) => void;
  freeze: (ms: number) => void;
  isOutOfBounds: (boundaries: Boundaries) => boolean;
}

type ParticleProps = {
  context: p5InstanceExtensions;
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  size?: number;
  color?: string;
};

export class Particle implements IParticle {
  private context: p5InstanceExtensions;
  private position: p5.Vector;
  private velocity: p5.Vector;
  private acceleration: p5.Vector;
  private size: number;
  private color: string;

  constructor({
    context,
    position,
    velocity,
    acceleration,
    size = 4,
    color = "#fff",
  }: ParticleProps) {
    this.context = context;

    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.size = size;
    this.color = color;
  }

  public update(amplitude?: number) {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    if (amplitude && amplitude > 210) {
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

  public freeze(ms: number) {
    const frozen = this.acceleration.copy();
    this.velocity.sub(frozen); // substract acceleration vector to freeze particle in place

    setTimeout(() => {
      this.velocity.add(this.acceleration);
    }, ms);
  }

  public isOutOfBounds(boundaries: Boundaries): boolean {
    switch (true) {
      case this.position.x < boundaries.negativeX:
        return true;
      case this.position.x > boundaries.x:
        return true;
      case this.position.y < boundaries.negativeY:
        return true;
      case this.position.y > boundaries.y:
      default:
        return false;
    }
  }

  public getPosition() {
    return { x: this.position.x, y: this.position.y, z: this.position.z };
  }
}
