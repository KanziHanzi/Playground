import { p5InstanceExtensions } from "p5";

type Position = {
  x: number;
  y: number;
};

type Dimensions = {
  width: number;
  height: number;
};

interface IButton {
  render: () => void;
  getPosition: () => Position;
  setPosition: (pos: Position) => void;
}

class Button implements IButton {
  context: p5InstanceExtensions;
  position: Position;
  dimensions: Dimensions;

  constructor(
    context: p5InstanceExtensions,
    startingPosition: Position,
    dimensions: Dimensions
  ) {
    this.context = context;
    this.position = startingPosition;

    this.dimensions = dimensions;
  }

  public render(): void {
    this.context.rect(
      this.position.x,
      this.position.y,
      this.dimensions.width,
      this.dimensions.height
    );
  }

  public getPosition(): Position {
    return this.position;
  }

  public setPosition(pos: Position): void {
    this.position = pos;
  }
}

export { Button };
export type { IButton };
