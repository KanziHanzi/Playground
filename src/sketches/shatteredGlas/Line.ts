import p5, { p5InstanceExtensions } from "p5";
import { Boundaries } from "src/common";
import { Position } from "src/utils";

export class Line {
  context: p5InstanceExtensions;
  position: p5.Vector;
  velocity: p5.Vector;
  angle: number;

  constructor(context: p5InstanceExtensions, position: p5.Vector) {
    this.context = context;
    this.position = position;

    const angle = context.random(0, context.TWO_PI);
    this.angle = angle;

    const angleVector = p5.Vector.fromAngle(angle);

    this.velocity = angleVector;
  }

  public drawCurrentPixel() {
    const { x, y } = this.position;

    this.context.point(x, y);
  }

  public updatePosition() {
    this.position.add(this.velocity);
  }

  public applyNoise() {
    const noise = this.context.noise(this.position.x, this.position.y);
    const noiseAngle = noise * this.context.TWO_PI;

    const newAngle = (this.angle + noiseAngle / 4);

    const angleVector = p5.Vector.fromAngle(newAngle);

    this.velocity = angleVector;
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
    const { x, y } = this.position;

    return { x, y };
  }

  public getNextPosition(): Position {
    const { x, y } = this.position.copy().add(this.velocity);

    return { x, y };
  }

  public setStartingPosition(pos: Position): void {
    this.position.x = pos.x;
    this.position.y = pos.y;
  }
}
