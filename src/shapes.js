import d3line from "d3-shape/src/line";
import { default as poly } from "./regularPolygon";

var triangle = poly().sides(3)
var diamond = poly().sides(4)
var square = poly().sides(4).flatTop(true)
var pentagon = poly().sides(5)
var hexagon = poly().sides(6)
var septagon = poly().sides(7)
var octagon = poly().sides(8)

export {
    triangle,
    diamond,
    square,
    pentagon,
    hexagon,
    septagon,
    octagon
}

