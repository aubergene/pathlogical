import constant from "./constant";

export default function() {
  var sides = constant(6),
    radius = constant(64);

  function regularPolygon() {
    var points = [],
      n = sides(),
      r = radius(),
      a = Math.PI * 2 / n;

    for (var i = 0; i < n; i++) {
      points.push([r * -Math.sin(a * i), r * -Math.cos(a * i)]);
    }

    return points;
  }

  regularPolygon.sides = function(_) {
    return arguments.length
      ? ((sides = typeof _ === "function" ? _ : constant(_)), regularPolygon)
      : sides;
  };

  regularPolygon.radius = function(_) {
    return arguments.length
      ? ((radius = typeof _ === "function" ? _ : constant(+_)), regularPolygon)
      : radius;
  };

  return regularPolygon;
}
