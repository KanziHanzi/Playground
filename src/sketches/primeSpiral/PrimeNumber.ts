import { p5InstanceExtensions } from "p5";

export type Position = {
  x: number;
  y: number;
};

export type View = {
  width: number;
  height: number;
};
export class PrimeNumber {
  context: p5InstanceExtensions;
  position: Position;
  content: number;
  size: number;

  constructor(
    context: p5InstanceExtensions,
    position: Position,
    content: number,
    maxNumber: number
  ) {
    this.context = context;
    this.position = position;
    this.content = content;

    const size = context.map(this.content, 1, maxNumber, 0.5, 500);

    this.size = size;
  }

  public show(scale: number): void {
    this.context.push();

    if (scale > 0.2 && this.size * scale > 8) {
      this.context.textSize(this.size);
      this.context.text(this.content, this.position.x, this.position.y);
    } else {
      this.context.ellipse(this.position.x, this.position.y, this.size);
    }

    this.context.pop();
  }

  public isInView(view: View): boolean {
    switch (true) {
      case this.position.x < -view.width:
        return false;
      case this.position.x > view.width:
        return false;
      case this.position.y < -view.height:
        return false;
      case this.position.y > view.height:
        return false;
      default:
        return true;
    }
  }
}
