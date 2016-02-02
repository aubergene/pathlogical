import npm from "rollup-plugin-npm";
import json from "rollup-plugin-json";

export default {
  entry: "index.js",
  dest: "build/pathlogical.js",
  plugins: [npm({jsnext: true}), json()],
  moduleName: "pathlogical",
  format: "umd"
};
