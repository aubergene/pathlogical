import constant from "./constant";

export default function() {
  var origin = constant([0, 0]),
      angle = constant(Math.PI / 2)

  function rotate(p) {
    var a = angle(),
        o = origin(),
        ca = Math.cos(a),
        sa = Math.sin(a)

    return [
      ca * (p[0]-o[0]) - sa * (p[1]-o[1]) + o[0],
      sa * (p[0]-o[0]) + ca * (p[1]-o[1]) + o[1]
    ];
  }

  rotate.angle = function(_) {
    return arguments.length ? (angle = typeof _ === "function" ? _ : constant(+_), rotate) : angle;
  };

  rotate.origin = function(_) {
    return arguments.length ? (origin = typeof _ === "function" ? _ : constant(_), rotate) : origin;
  };

  return rotate;
};
