var makePuzzle = function(element, width, pad) {

  var puzzle = {};

  var w = width;
  var h = width;
  var padding = pad;

  var svg = d3.select(element[0])
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  // Add a border to the svg
  var borderPath = svg.append("rect")
   .attr("x", 0)
   .attr("y", 0)
   .attr("height", h)
   .attr("width", w)
   .style("stroke", "black")
   .style("fill", "none")
   .style("stroke-width", 2);

  puzzle.circle = function(props) {

      var dataset = _(props.dataset).map(function(item){
        return {
          x: padding + (w - 2 * padding) * item.x,
          y: padding + (h - 2 * padding) * item.y,
          r: (padding / 2) + padding * item.r
        };
      });

      var circles = svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .attr('cx',function(d,i){
          return d.x;
       })
       .attr('cy', function(d) {
          return d.y;
       })
       .attr('r', function(d){
          return d.r;
       });
  };

  puzzle.cards = function(props) {

  };

  puzzle.lines = function(props) {

  };

  puzzle.draw = function(props) {
    if (props.theme === 'circle') {
      this.circle(props);
    }
  };

  puzzle.rotate = function(angle) {

  };

  puzzle.flip = function(axis) {

  };

  return puzzle;

};
