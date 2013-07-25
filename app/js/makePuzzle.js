var makePuzzle = function(element, width) {

  var puzzle = {};

  var w = width;
  var h = width;
  var padding = width/20;

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

   var xScale = d3.scale
         .linear()
         .domain([0,w])
         .range([0, w])
         .clamp(true);

   var yScale = d3.scale
       .linear()
       .domain([0,h])
       .range([0,h])
       .clamp(true);

  // Functions to create grid lines
  function make_x_axis() {
    return d3.svg.axis()
          .scale(xScale)
           .orient("bottom")
           .ticks(5);
  }

  function make_y_axis() {
    return d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .ticks(5);
  }

  svg.append("g")
          .attr("class", "grid")
          .attr("transform", "translate(0," + h + ")")
          .call(make_x_axis()
              .tickSize(-h, 0, 0)
              .tickFormat("")
          );

      svg.append("g")
          .attr("class", "grid")
          .call(make_y_axis()
              .tickSize(-w, 0, 0)
              .tickFormat("")
          );

  puzzle.circle = function(props) {

      var dataset = _(props.dataset).map(function(item){
        return {
          x: padding + (w - 2 * padding) * item.x,
          y: padding + (h - 2 * padding) * item.y,
          r: (padding * 3 / 4) + padding * item.r / 4
        };
      });

      // Remove any images on the svg before drawing a new one
      svg.selectAll('.brainimage').remove();

      var circles = svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .attr('class','brainimage')
       .attr('cx',function(d,i){
          return d.x;
       })
       .attr('cy', function(d) {
          return d.y;
       })
       .attr('r', function(d){
          return d.r;
       })
       .attr('fill', props.color);
  };

  puzzle.cards = function(props) {

  };

  puzzle.lines = function(props) {

  };


  puzzle.rotate = function(angle, puzz) {
    console.log("Rotating puzzle " + puzz + " " + angle + "degrees");
    svg.selectAll('.brainimage').attr("transform", function(d) {
      return "rotate(" + angle + ",50,50)";
    });
  };

  puzzle.flip = function(axis, puzz) {
    console.log("Flipping puzzle " + puzz + "over the " + axis + " axis");
    svg.selectAll('.brainimage').attr("transform", function(d){
      if (axis === "x"){
        return "translate(0," + h + ") scale(1, -1)";
      } else if (axis === "y") {
        return "translate(" + w + ",0) scale(-1, 1)";
      }
    });

  };

  puzzle.mutate = function(transformation, puz) {
    if (transformation[0] === "rotate") {
      puzzle.rotate(transformation[1], puz);
    } else if (transformation[0] === "flip") {
      puzzle.flip(transformation[1], puz);
    }
  };

  puzzle.draw = function(props) {
    if (props.theme === 'circle') {
      this.circle(props);
    }
  };

  return puzzle;

};
