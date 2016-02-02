var tape = require("tape"),
    pathlogical = require("../"),
    array = require("d3-array");

tape.test("regularPolygon()", function(test) {
  test.deepEqual(array.merge(pathlogical.regularPolygon().sides(4).radius(1)()).map(Math.round), [ 0, -1, -1, 0, 0, 1, 1, 0 ]);
  test.end();
});

