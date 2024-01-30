import p5, { p5InstanceExtensions } from "p5";

export type Boundaries = {
  x: number;
  y: number;
  negativeX: number;
  negativeY: number;
};

type Position = {
  x: number;
  y: number;
  z: number;
};

interface IParticle {
  show: () => void;
  update: (amplitude?: number) => void;
  freeze: (ms: number) => void;
  resumeMotion: () => void;
  isOutOfBounds: (boundaries: Boundaries) => boolean;
  getPosition: () => Position;
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
  private frozen: boolean;

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
    this.frozen = false;
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

  public freeze(ms?: number) {
    const accelerationVectorCopy = this.acceleration.copy();
    this.velocity.sub(accelerationVectorCopy); // substract acceleration vector to freeze particle in place
    this.frozen = true;

    if (!ms) return;

    setTimeout(() => {
      this.velocity.add(this.acceleration);
      this.frozen = false;
    }, ms);
  }

  public resumeMotion() {
    this.velocity.add(this.acceleration);
    this.frozen = false;
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
        return true;
      default:
        return false;
    }
  }

  public getPosition(): Position {
    return { x: this.position.x, y: this.position.y, z: this.position.z };
  }

  public isFrozen() {
    return this.frozen;
  }
}
