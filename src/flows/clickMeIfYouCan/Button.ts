import { p5InstanceExtensions } from "p5";
import { Dimensions, Hitbox, Position } from "./types";

interface IButton {
  render: () => void;
  getPosition: () => Position;
  setPosition: (pos: Position) => void;
  getDimensions: () => Dimensions;
  showHitbox: () => void;
  getCenterPoint: () => void;
}

class Button implements IButton {
  private context: p5InstanceExtensions;
  private position: Position;
  private dimensions: Dimensions;
  private hitbox: Hitbox;
  private centerPoint: Position;

  constructor(
    context: p5InstanceExtensions,
    startingPosition: Position,
    dimensions: Dimensions
  ) {
    this.context = context;
    this.position = startingPosition;

    this.dimensions = dimensions;

    this.hitbox = this.updateHitbox();

    this.centerPoint = this.updateCenterPoint();
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

  public getPosition(): Position {
    return this.position;
  }

  public setPosition(pos: Position): void {
    this.position = pos;
    this.hitbox = this.updateHitbox();
    this.centerPoint = this.updateCenterPoint();
  }

  public getDimensions(): Dimensions {
    return this.dimensions;
  }

  public getHitbox(): Hitbox {
    return this.hitbox;
  }

  public getCenterPoint(): Position {
    return this.centerPoint;
  }

  private updateHitbox(): Hitbox {
    const padding = 50;

    return {
      topLeftX: this.position.x - padding,
      topLeftY: this.position.y - padding,
      topRightX: this.position.x + this.dimensions.width + padding,
      topRightY: this.position.y - padding,
      bottomLeftX: this.position.x - padding,
      bottomLeftY: this.position.y + this.dimensions.height + padding,
      bottomRightX: this.position.x + this.dimensions.width + padding,
      bottomRightY: this.position.y + this.dimensions.height + padding,
    };
  }

  private updateCenterPoint(): Position {
    const centerX = this.position.x + this.dimensions.width / 2;
    const centerY = this.position.y + this.dimensions.height / 2;

    return { x: centerX, y: centerY };
  }
}

export { Button };
export type { IButton, Dimensions, Position };
