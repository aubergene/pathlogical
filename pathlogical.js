!function() {
  'use strict';

  var pathlogical = {
    version: '0.0.0'
  };

  var ε = 1e-6, ε2 = ε * ε, π = Math.PI, τ = 2 * π, τε = τ - ε, halfπ = π / 2, radians = π / 180, degrees = 180 / π;

  function functor(v) {
    return typeof v === 'function' ? v : function() {
      return v;
    };
  }

  var pathlogical = {
    points: {
      polygon: function() {
        var radius = functor(64),
            sides = functor(6);

        var emit = function() {
          var s = sides();
          var r = radius();
          var a = τ / s;
          var path = [];
          for (var i = s; i > 0; i--) {
            path.push([r * -Math.sin(a * i), r * -Math.cos(a * i)]);
          }
          return path;
        };

        emit.radius = function(x) {
          if (!arguments.length) return radius;
          radius = functor(x);
          return emit;
        };

        emit.sides = function(x) {
          if (!arguments.length) return sides;
          sides = functor(x);
          return emit;
        };

        return emit;
      }
    },
    interpolator: {
      midPoint: function() {
        var xDelta = functor(-0.5),
            yDelta = functor(-0.5);

        var my = function(points) {
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
          // tmp.push(points[points.length-1])
          return tmp;
        };

        my.xDelta = function(x) {
          if (!arguments.length) return xDelta;
          xDelta = functor(x);
          return my;
        };

        my.yDelta = function(x) {
          if (!arguments.length) return yDelta;
          yDelta = functor(x);
          return my;
        };

        return my;
      }
    }
  };

  if (typeof define === 'function' && define.amd) define(pathlogical); else if (typeof module === 'object' && module.exports) module.exports = pathlogical;
  window.pathlogical = pathlogical;
}();
