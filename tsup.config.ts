import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  entry: {
    index: "bin/index.ts",
  },
  format: ["esm"],
  minify: true,
  outDir: "dist",
})
