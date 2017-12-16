import d3line from "d3-shape/src/line";
import constant from "./constant";

export default function() {
  let sides = constant(6);
  let radius = constant(64);
  let flatTop = constant(false);
  let line = d3line();

  function regularPolygon() {
    let points = [];
    let n = sides();
    let a = Math.PI * 2 / n;
    let r = radius();

    if (flatTop()) {
      n -= 0.5;
    }

    for (var i = n; i > 0; i--) {
      points.push([r * -Math.sin(a * i), r * -Math.cos(a * i)]);
    }

    return line(points);
  }

  regularPolygon.sides = function(_) {
    return arguments.length
      ? ((sides = typeof _ === "function" ? _ : constant(+_)), regularPolygon)
      : sides;
  };

  regularPolygon.radius = function(_) {
    return arguments.length
      ? ((radius = typeof _ === "function" ? _ : constant(+_)), regularPolygon)
      : radius;
  };

  regularPolygon.flatTop = function(_) {
    return arguments.length
      ? ((flatTop = typeof _ === "function" ? _ : constant(_)), regularPolygon)
      : flatTop;
  };

  regularPolygon.line = function(_) {
    return arguments.length ? ((line = _), regularPolygon) : line;
  };

  return regularPolygon;
}
