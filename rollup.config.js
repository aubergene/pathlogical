import json from 'rollup-plugin-json'
import resolve from "rollup-plugin-node-resolve"
import buble from "rollup-plugin-buble"

export default {
  input: "index.js",
  plugins: [
    json(),
    resolve(),
    buble()
  ],
  name: "pathlogical",
  sourcemap: true,
  output: [
    { file: "dist/pathlogical.es.js", format: 'es' },
    { file: "dist/pathlogical.umd.js", format: 'umd' },
    { file: "dist/pathlogical.cjs.js", format: 'cjs' }
  ]
}
