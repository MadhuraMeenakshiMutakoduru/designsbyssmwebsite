// Bundles src/ + styles.css into one self-contained dist/index.html (host anywhere, or open directly).
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const result = await build({
  entryPoints: ["src/main.js"],
  bundle: true,
  minify: true,
  format: "iife",
  write: false,
  target: "es2019"
});

const js = result.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
const css = readFileSync("styles.css", "utf8");
let page = readFileSync("index.html", "utf8");

page = page
  .replace('<link rel="stylesheet" href="styles.css" />', () => `<style>\n${css}\n</style>`)
  .replace('<script type="module" src="src/main.js"></script>', () => `<script>\n${js}\n</script>`);

mkdirSync("dist", { recursive: true });
writeFileSync("dist/index.html", page);
console.log(`dist/index.html written (${(page.length / 1024).toFixed(1)} KB)`);
