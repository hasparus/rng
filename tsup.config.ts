import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  format: ["esm", "cjs", "iife"],
  minify: !options.watch,
  dts: true,
}));
