import constant from "./constant";
import poly from "./regularPolygon";
import interpolator from "./interpolator";

export default function() {
  var sides = constant(6),
      radius = constant(64),
      delta = constant(0.5),
      p = poly(),
      i = interpolator()


  function star() {
    p.sides(sides).radius(radius)
    i.delta(delta())

    return i(p())
  }

  // star.sides = p.sides;
  star.sides = function(_) {
    return arguments.length ? (sides = typeof _ === "function" ? _ : constant(+_), star) : sides;
  };

  // star.radius = p.radius;
  star.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), star) : radius;
  };

  // star.delta = i.delta;
  star.delta = function(_) {
    return arguments.length ? (delta = typeof _ === "function" ? _ : constant(+_), star) : delta;
  };

  return star;
};
