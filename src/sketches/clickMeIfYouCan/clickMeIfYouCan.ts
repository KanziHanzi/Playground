import p5 from "p5";

type Position = {
  x: number;
  y: number;
}

const sketch = (context: p5) => {
  let button: p5.Element;
  let mousePosition: Position

  context.setup = () => {
    context.createCanvas(context.windowWidth, context.windowHeight);

    button = context.createButton("Click me");
    button.addClass("click_me");
  };

  context.draw = () => {};

  context.mouseMoved = () => {
    mousePosition = {x: context.mouseX, y: context.mouseY}

    // const distance = 

    // const radius = Math.max( button.offsetWidth*0.75, button.offsetHeight*0.75, 100 );
    // const bx = button.parentNode.offsetLeft + button.offsetLeft + button.offsetWidth/2;
    // const by = button.parentNode.offsetTop + button.offsetTop + button.offsetHeight/2;
    // const dist = distanceBetween( event.clientX, event.clientY, bx, by );
    // const angle = Math.atan2( event.clientY - by, event.clientX - bx );
    // const ox = -1 * Math.cos( angle ) * Math.max( ( radius - dist ), 0 );
    // const oy = -1 * Math.sin( angle ) * Math.max( ( radius - dist ), 0 );
    // const rx = oy / 2;
    // const ry = -ox / 2;
    // button.style.transition = `all 0.1s ease`;
    // button.style.transform = `translate(${ox}px, ${oy}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    // button.style.boxShadow = `0px ${Math.abs(oy)}px ${Math.abs(oy)/radius*40}px rgba(0,0,0,0.15)`;
  };

  const getDistanceBetween = (
    mouseX: number,
    mouseY: number,
    buttonWrapperX: number,
    buttonWrapperY: number
  ) => {
    const dx = mouseX - buttonWrapperX;
    const dy = mouseY - buttonWrapperY;

    return Math.sqrt(dx * dx + dy * dy);
  };
};

new p5(sketch);
