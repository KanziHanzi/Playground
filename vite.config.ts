/// <reference types="vitest" />
import { defineConfig } from "vite";
import inject from "@rollup/plugin-inject";
import path from "path";

export default defineConfig({
  plugins: [
    inject({
      p5: "p5",
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, "index.html"),
        shatteredGlas: path.resolve(
          __dirname,
          "src/sketches/shatteredGlas/index.html"
        ),
        primeSpiral: path.resolve(
          __dirname,
          "src/sketches/primeSpiral/index.html"
        ),
        sineWave: path.resolve(__dirname, "src/sketches/sineWave/index.html"),
        perlinNoiseTrajectory: path.resolve(
          __dirname,
          "src/sketches/perlinNoiseTrajectory/index.html"
        ),
        perlinNoiseFlowField: path.resolve(
          __dirname,
          "src/sketches/perlinNoiseFlowField/index.html"
        ),
        particleBomb: path.resolve(
          __dirname,
          "src/sketches/particleBomb/index.html"
        ),
        mouseTrail: path.resolve(
          __dirname,
          "src/sketches/mouseTrail/index.html"
        ),
        loadingIndicator: path.resolve(
          __dirname,
          "src/sketches/loadingIndicator/index.html"
        ),
        infiniteTerrain: path.resolve(
          __dirname,
          "src/sketches/infiniteTerrain/index.html"
        ),
      },
      output: {
        entryFileNames: "src/sketches/[name]/index.js",
        chunkFileNames: "src/sketches/[name]/index.js",
      },
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "happy-dom",
  },
});
