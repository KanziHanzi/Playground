import p5 from "p5";

const CANVAS_DIMENSION = 600;

const zoomFactor = 100;

const sketch = (context: p5) => {
  context.setup = () => {
    context.createCanvas(CANVAS_DIMENSION, CANVAS_DIMENSION);

    const main = context.select("main");
    main?.addClass("center_canvas");
  };

  context.draw = () => {
    for (let x = 0; x < context.width; x++) {
      for (let y = 0; y < context.height; y++) {
        const noiseValue = context.noise(x / zoomFactor, y / zoomFactor);

        let color: p5.Color;

        switch (true) {
          case noiseValue < 0.35:
            color = context.color(28, 163, 236);
            //   color = context.color(
            //     context.map(noiseValue, 0, 0.25, 0, 28),
            //     context.map(noiseValue, 0, 0.25, 0, 163),
            //     context.map(noiseValue, 0, 0.25, 0, 236)
            //   );
            break;
          case noiseValue < 0.45:
            color = context.color(245, 215, 176);
            //   color = context.color(
            //     context.map(noiseValue, 0.25, 0.5, 0, 245),
            //     context.map(noiseValue, 0.25, 0.5, 0, 215),
            //     context.map(noiseValue, 0.25, 0.5, 0, 176)
            //   );
            break;
          case noiseValue < 0.85:
            color = context.color(38, 139, 7);
            //   color = context.color(
            //     context.map(noiseValue, 0.5, 0.75, 0, 38),
            //     context.map(noiseValue, 0.5, 0.75, 0, 139),
            //     context.map(noiseValue, 0.5, 0.75, 0, 7)
            //   );
            break;
          default:
            color = context.color(136, 140, 141);
            //   color = context.color(
            //     context.map(noiseValue, 0.75, 1, 0, 136),
            //     context.map(noiseValue, 0.75, 1, 0, 140),
            //     context.map(noiseValue, 0.75, 1, 0, 141)
            //   );
            break;
        }

        context.set(x, y, color);
      }
    }

    context.updatePixels();
  };
};

new p5(sketch);
