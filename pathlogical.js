!function() {
  'use strict'

  var pathlogical = {
    version: "0.0.0"
  };

  var ε = 1e-6, ε2 = ε * ε, π = Math.PI, τ = 2 * π, τε = τ - ε, halfπ = π / 2, radians = π / 180, degrees = 180 / π;

  function functor(v) {
    return typeof v === "function" ? v : function() {
      return v;
    };
  }

  var pathlogical = function(t) {
    var type = t ? functor(t) : symbolType,
        size = defaultSize,
        outerRadius = defaultOuterRadius,
        innerRadius = defaultInnerRadius,
        sides = defaultSides;

    function symbol(d, i) {
      return symbols[type.call(this, d, i)](size.call(this, d, i));
    }

    symbol.type = function(x) {
      if (!arguments.length) return type;
      type = functor(x);
      return symbol;
    };

    symbol.size = function(x) {
      if (!arguments.length) return size;
      size = functor(x);
      return symbol;
    };

    symbol.outerRadius = function(x) {
      if (!arguments.length) return outerRadius;
      outerRadius = functor(x);
      return symbol;
    };

    symbol.innerRadius = function(x) {
      if (!arguments.length) return innerRadius;
      innerRadius = functor(x);
      return symbol;
    };

    symbol.sides = function(x) {
      if (!arguments.length) return sides;
      sides = functor(x);
      return symbol;
    };

    function defaultSize() {
      return 64;
    }

    function defaultOuterRadius() {
      return 64;
    }

    function defaultInnerRadius() {
      return 48;
    }

    function defaultType() {
      return "circle";
    }

    function defaultSides() {
      return 6;
    }

    var symbols = {
      circle: function(size) {
        var r = outerRadius()
        return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
      },
      cross: function(size) {
        var r = Math.sqrt(size / 5) / 2;
        var r = outerRadius() / 3
        return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
      },
      square: function(size) {
        var r = Math.sqrt(size) / 2;
        return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
      },
      "polygon": function() {
        var s = sides()
        var r1 = outerRadius()
        var a = τ / s
        var path = []
        path.push(["M", 0, -r1])
        for (var i = 1; i <= 1 + s; i++) {
          path.push(["L", r1 * -Math.sin(a*i), r1 * -Math.cos(a*i)])
        }
        path.push(["M", 0, -r1])
        return path
      },
      "triangle": function() {
        symbol.sides(3)
        return this.polygon()
      },
      "pentagon": function() {
        symbol.sides(5)
        return this.polygon()
      },
      "hexagon": function() {
        symbol.sides(6)
        return this.polygon()
      },
      "septagon": function() {
        symbol.sides(7)
        return this.polygon()
      },
      "septagon": function() {
        symbol.sides(8)
        return this.polygon()
      },
      "star": function() {
        var s = sides() * 2
        var r1 = outerRadius()
        var r2 = innerRadius()
        var a = τ / s
        // var path = "M0," + -r1
        var path = []
        path.push(["M", 0, -r1])
        for (var i = 2; i < s + 1; i += 2) {
          path.push(["L", r2 * -Math.sin(a*(i-1)), r2 * -Math.cos(a*(i-1)) ])
          path.push(["L", r1 * -Math.sin(a*i), r1 * -Math.cos(a*i) ])
          // path += "L" + r2 * -Math.sin(a*(i-1)) + "," + r2 * -Math.cos(a*(i-1))
          // path += "L" + r1 * -Math.sin(a*i) + "," + r1 * -Math.cos(a*i)
        }
        path.push(["M", 0, -r1])
        // var tmp = path.map(function(d) { return d.join(' ') }).join('\n');
        return path
      },
      diamond: function() {
        symbol.sides(2)
          .innerRadius(symbol.outerRadius()() * 2 / 3)
        return this.star()
      },

    }

    return symbol;
  };

  if (typeof define === "function" && define.amd) define(pathlogical); else if (typeof module === "object" && module.exports) module.exports = pathlogical;
  window.pathlogical = pathlogical;
}()