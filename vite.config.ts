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
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "happy-dom",
  },
});
