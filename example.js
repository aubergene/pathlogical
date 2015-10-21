var width = 256, height = 256, radius = 64;

var examples = d3.select('#examples');

var example = examples.append('div');

var interpolator = pathlogical.interpolator.midPoint();

var pa = pathlogical.points.polygon()
          .sides(6)
          .radius(100);

var line = d3.svg.line();

var svg = example.append('svg')
        .attr({ width: width, height: height })
        .append('g')
        .attr({ transform: 'translate(' + [width / 2, height / 2] + ')' });

svg.append('circle')
  .attr('r', radius)
  .attr('class', 'guide');

var sidesSlider = examples.append('div')
  .append('label')
  .text('Sides')
  .append('input')
  .attr({
    type: 'range',
    min: 3,
    max: 20,
    value: pa.sides()
  })
  .on('input', render);

var radiusSlider = examples.append('div')
  .append('label')
  .text('Radius')
  .append('input')
  .attr({
    type: 'range',
    min: 16,
    max: 128,
    value: pa.radius()
  })
  .on('input', render);

var xDeltaSlider = examples.append('div')
  .append('label')
  .text('X delta')
  .append('input')
  .attr({
    type: 'range',
    min: -2,
    max: 2,
    step: 0.1,
    value: interpolator.xDelta()
  })
  .on('input', render);

var yDeltaSlider = examples.append('div')
  .append('label')
  .text('Y delta')
  .append('input')
  .attr({
    type: 'range',
    min: -2,
    max: 2,
    step: 0.1,
    value: interpolator.yDelta()
  })
  .on('input', render);

var interpolatorSelect = examples.append('div')
  .append('label')
  .text('Interpolator')
  .append('select')
  .on('change', render);

interpolatorSelect
  .selectAll('option')
  .data([
    'cardinal-closed',
    'linear-closed',
    'basis-closed',
  ])
  .enter()
  .append('option')
  .text(function(d) { return d })
  .attr('selected', function(d, i) { return i ? null : true });

var tensionSlider = examples.append('div')
  .append('label')
  .text('Tension')
  .append('input')
  .attr({
    type: 'range',
    min: -3,
    max: 3,
    value: 0,
    step: 0.1
  })
  .on('input', render);

var p = svg.append('path')
  .attr('class', 'shape');

var g = svg.append('g')
  .attr('class', 'points');

render();

function render(e) {
  pa.sides(sidesSlider.node().value)
    .radius(radiusSlider.node().value);

  var select = interpolatorSelect.node();
  var lineInterpolator = select.options[select.selectedIndex].value;

  line.interpolate(lineInterpolator)
    .tension(tensionSlider.node().value);

  interpolator
    .xDelta(xDeltaSlider.node().value)
    .yDelta(yDeltaSlider.node().value);

  var points = interpolator(pa());

  // points.push(points[0]);
  // pa.radius(radius * 0.35);
  // var tmp = pa();
  // tmp.push(tmp[0]);
  // points = points.concat(tmp.reverse());

  // p.datum(points).attr('d', line);
  p.datum(points).attr('d', function(d) {
    return line(d);
  });

  var gg = g.selectAll('.point')
    .data(points);

  var tmp = gg.enter().append('g')
      .attr('class', 'point');

    tmp.append('circle')
      .attr('r', 8);

    tmp.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.4em');

  gg.exit().remove();

  gg.attr('transform', function(d) {
      return 'translate(' + d + ')';
    })
    .select('text').text(function(d, i) { return i });
}
