import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import buble from "rollup-plugin-buble";
import uglify from "rollup-plugin-uglify";
import { minify } from "uglify-es";

export default {
  input: "index.js",
  plugins: [json(), resolve(), buble(), uglify({}, minify)],
  name: "pathlogical",
  sourcemap: true,
  output: [
    { file: "dist/pathlogical.node.js", format: "cjs" },
    { file: "dist/pathlogical.js", format: "umd" }
  ]
};
