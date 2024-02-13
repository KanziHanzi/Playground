import p5, { p5InstanceExtensions } from "p5";
import { Dimensions, Hitbox, Position } from "./types";

interface IButton {
  render: () => void;
  getDimensions: () => Dimensions;
  showHitbox: () => void;
  getPosition: () => p5.Vector;
  updatePosition: (pos: p5.Vector) => void;
  resetPosition: () => void;
  getPivotPoint: () => void;
}

class Button implements IButton {
  private context: p5InstanceExtensions;
  private position: p5.Vector;
  private startingPostion: p5.Vector;
  private dimensions: Dimensions;
  private hitbox: Hitbox;
  private pivotPoint: Position;

  constructor(
    context: p5InstanceExtensions,
    startingPosition: p5.Vector,
    dimensions: Dimensions
  ) {
    this.context = context;
    this.position = startingPosition;

    this.startingPostion = this.position.copy();

    this.pivotPoint = { x: this.startingPostion.x, y: this.startingPostion.y };

    this.dimensions = dimensions;

    this.hitbox = this.updateHitbox();

    this.context.rectMode("center");
  }

  public render(): void {
    this.context.rect(
      this.position.x,
      this.position.y,
      this.dimensions.width,
      this.dimensions.height
    );
  }

  public showHitbox(): void {
    this.context.strokeWeight(1);
    this.context.drawingContext.setLineDash([5, 5]);

    this.context.push();
    this.context.translate(this.hitbox.topLeftX, this.hitbox.topLeftY);
    this.context.line(0, 0, this.hitbox.topRightX - this.hitbox.topLeftX, 0);
    this.context.pop();

    this.context.push();
    this.context.translate(this.hitbox.topRightX, this.hitbox.topRightY);
    this.context.line(
      0,
      0,
      0,
      this.hitbox.bottomRightY - this.hitbox.topRightY
    );
    this.context.pop();

    this.context.push();
    this.context.translate(this.hitbox.bottomRightX, this.hitbox.bottomRightY);
    this.context.line(
      0,
      0,
      this.hitbox.bottomLeftX - this.hitbox.bottomRightX,
      0
    );
    this.context.pop();

    this.context.push();
    this.context.translate(this.hitbox.bottomLeftX, this.hitbox.bottomLeftY);
    this.context.line(0, 0, 0, this.hitbox.topLeftY - this.hitbox.bottomLeftY);
    this.context.pop();
  }

  public getPosition(): p5.Vector {
    return this.position;
  }

  public updatePosition(pos: p5.Vector): void {
    this.position = this.position.add(pos);
  }

  public getDimensions(): Dimensions {
    return this.dimensions;
  }

  public getHitbox(): Hitbox {
    return this.hitbox;
  }

  public resetPosition(): void {
    this.position.x = this.startingPostion.x;
    this.position.y = this.startingPostion.y;
  }

  public getPivotPoint(): Position {
    return this.pivotPoint;
  }

  private updateHitbox(): Hitbox {
    const padding = 50;

    return {
      topLeftX: this.position.x - this.dimensions.width / 2 - padding,
      topLeftY: this.position.y - this.dimensions.height / 2 - padding,

      topRightX: this.position.x + this.dimensions.width / 2 + padding,
      topRightY: this.position.y - this.dimensions.height / 2 - padding,

      bottomLeftX: this.position.x - this.dimensions.width / 2 - padding,
      bottomLeftY: this.position.y + this.dimensions.height / 2 + padding,

      bottomRightX: this.position.x + this.dimensions.width / 2 + padding,
      bottomRightY: this.position.y + this.dimensions.height / 2 + padding,
    };
  }
}

export { Button };
export type { IButton, Dimensions, Position };
