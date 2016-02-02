import chunk from "lodash-es/chunk";
import zip from "lodash-es/zip";
import flatten from "lodash-es/flatten";
import reverse from "lodash-es/reverse";
import d3line from "d3-shape/src/line";
import category10 from "d3-scale/src/category10";

import constant from "./constant";
import poly from "./regularPolygon";

export default function() {
  var sides = constant(6),
      radius = constant(64),
      innerRadius = constant(32),
      p1 = poly(), p2 = poly()

  function roundel() {
    var s = Math.round(sides() / 2) * 2
    p1.sides(s)
    p2.sides(s)

    var _1 = p1.radius(radius())()
    var _2 = p2.radius(innerRadius())()

    return zip(chunk(_1, 2), chunk(_2, 2).map(reverse)).map(flatten)
  }

  roundel.path = function(_) {
    var line = d3line()
    return roundel().map(line).join()
  };

  roundel.sides = function(_) {
    return arguments.length ? (sides = typeof _ === "function" ? _ : constant(+_), roundel) : sides;
  };

  roundel.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), roundel) : innerRadius;
  };

  roundel.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), roundel) : radius;
  };

  return roundel;
};
