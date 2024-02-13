import { Position, Hitbox } from "../types";

const isColliding = (mousePosition: Position, hitbox: Hitbox): boolean => {
  const mouseInXRange =
    mousePosition.x >= hitbox.topLeftX && mousePosition.x <= hitbox.topRightX;
  const mouseInYRange =
    mousePosition.y >= hitbox.topLeftY && mousePosition.y <= hitbox.bottomLeftY;

  if (mouseInXRange && mouseInYRange) {
    return true;
  } else {
    return false;
  }
};

export { isColliding };
