import { p5InstanceExtensions } from "p5";

type Position = {
  x: number;
  y: number;
};

type Dimensions = {
  width: number;
  height: number;
};

export type Hitbox = {
  topLeftX: number;
  topLeftY: number;
  topRightX: number;
  topRightY: number;
  bottomLeftX: number;
  bottomLeftY: number;
  bottomRightX: number;
  bottomRightY: number;
};

interface IButton {
  render: () => void;
  getPosition: () => Position;
  setPosition: (pos: Position) => void;
  getDimensions: () => Dimensions;
  showHitbox: () => void;
}

class Button implements IButton {
  context: p5InstanceExtensions;
  position: Position;
  dimensions: Dimensions;
  hitbox: Hitbox;

  constructor(
    context: p5InstanceExtensions,
    startingPosition: Position,
    dimensions: Dimensions
  ) {
    this.context = context;
    this.position = startingPosition;

    this.dimensions = dimensions;

    const hitboxPadding = 50;

    this.hitbox = {
      topLeftX: this.position.x - hitboxPadding,
      topLeftY: this.position.y - hitboxPadding,
      topRightX: this.position.x + this.dimensions.width + hitboxPadding,
      topRightY: this.position.y - hitboxPadding,
      bottomLeftX: this.position.x - hitboxPadding,
      bottomLeftY: this.position.y + this.dimensions.height + hitboxPadding,
      bottomRightX: this.position.x + this.dimensions.width + hitboxPadding,
      bottomRightY: this.position.y + this.dimensions.height + hitboxPadding,
    };
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
  }

  public getDimensions(): Dimensions {
    return this.dimensions;
  }

  public getHitbox(): Hitbox {
    return this.hitbox;
  }
}

export { Button };
export type { IButton, Dimensions, Position };
