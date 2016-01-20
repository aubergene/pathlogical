import constant from "./constant";

export default function() {
  var xDelta = constant(-0.5),
      yDelta = constant(-0.5);

  function interpolator(points) {
    var tmp = [];
    for (var i = 1; i <= points.length; i++) {
      tmp.push(points[i - 1]);
      var p = i == points.length ? points[0] : points[i];
      var x = (p[0] + points[i - 1][0]) / 2;
      var y = (p[1] + points[i - 1][1]) / 2;
      x += x * xDelta();
      y += y * yDelta();
      tmp.push([x, y]);
    }
    return tmp;
  }

  interpolator.xDelta = function(_) {
    return arguments.length ? (xDelta = typeof _ === "function" ? _ : constant(_), interpolator) : xDelta;
  };

  interpolator.yDelta = function(_) {
    return arguments.length ? (yDelta = typeof _ === "function" ? _ : constant(_), interpolator) : yDelta;
  };

  interpolator.delta = function(_) {
    if (!arguments.length) return [xDelta(), yDelta()];
    xDelta = constant(_);
    yDelta = constant(_);
    return interpolator;
  };

  return interpolator;
};
