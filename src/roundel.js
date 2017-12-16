import chunk from "lodash-es/chunk";
import zip from "lodash-es/zip";
import flatten from "lodash-es/flatten";
import reverse from "lodash-es/reverse";
import d3line from "d3-shape/src/line";

import constant from "./constant";
import poly from "./regularPolygon";
import rotate from "./rotate";

export default function() {
  var sides = constant(6),
    radius = constant(64),
    innerRadius = constant(32),
    rotateAngle = constant(0),
    p1 = poly(),
    p2 = poly(),
    rt = rotate();

  function roundel() {
    var s = Math.round(sides() / 2) * 2;
    p1.sides(s);
    p2.sides(s);

    // rt.angle(Math.PI / 60)
    // rt.angle(15 * Math.PI / 180).origin([20, 40])
    rt.angle(rotateAngle());

    var _1 = p1.radius(radius())();
    var _2 = p2
      .radius(innerRadius())()
      .map(function(dd) {
        rt(dd);
        // console.log(dd, rt(dd))
        // return dd.map(rt)
        return rt(dd);
        // return dd
      });

    return zip(chunk(_1, 2), chunk(_2, 2).map(reverse)).map(flatten);
  }

  roundel.path = function(_) {
    var line = d3line();
    return roundel()
      .map(line)
      .join();
  };

  roundel.sides = function(_) {
    return arguments.length
      ? ((sides = typeof _ === "function" ? _ : constant(+_)), roundel)
      : sides;
  };

  roundel.innerRadius = function(_) {
    return arguments.length
      ? ((innerRadius = typeof _ === "function" ? _ : constant(+_)), roundel)
      : innerRadius;
  };

  roundel.radius = function(_) {
    return arguments.length
      ? ((radius = typeof _ === "function" ? _ : constant(+_)), roundel)
      : radius;
  };

  roundel.rotate = function(_) {
    return arguments.length
      ? ((rotateAngle = typeof _ === "function" ? _ : constant(+_)), roundel)
      : rotateAngle;
  };

  return roundel;
}
