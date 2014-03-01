var t0 = 1390176000000; /*  6:00 pm */
var t1 = 1390197600000; /* 12:00 am */

function chart(csvpath, options) {
  var options = options || {};
  var interval = options.interval || 1;
  var layers = options.layers || 5;
  var initial_color = options.initial_color || 0xaad;
  var step = options.step || Math.floor(initial_color / layers);
  var color_range = options.color_range ||
    Array.apply(null, Array(layers)).map(function(_, i) {
      return "#" + (initial_color + step * i).toString(16);
    });
  var redirect = options.redirect || false;
  var y_axis_title = options.y_axis_title || "Tweets";
  var margin = { top: 50, right: 50, bottom: 50, left: 50 };
  var width = document.body.clientWidth - margin.left - margin.right;
  var height = 550 - margin.top - margin.bottom;

  interval = interval * 60000;

  // Show tooltip
  var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");

  // Vertical bar
  var vertical = d3.select(".chart")
    .append("div")
    .attr("class", "vertical")
    .style("position", "absolute")
    .style("width", "1px")
    .style("height", height + "px")
    .style("background", "gray")
    .style("visibility", "hidden");

  var x = d3.time.scale()
    .range([0, width])
    .domain([t0, t1]);

  var y = d3.scale.linear()
    .range([height-10, 0]);

  var z = d3.scale.ordinal()
    .range(color_range);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var yAxisr = d3.svg.axis()
    .scale(y);

  var stack = d3.layout.stack()
    .offset("wiggle")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

  var nest = d3.nest()
    .key(function(d) { return d.key; });

  var area = d3.svg.area()
    .interpolate("basis")
    .x (function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

  var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
  d3.csv(csvpath, function(data) {
    data.forEach(function(d) {
      d.value = +d.value;
    });
	
    var layers = stack(nest.entries(data));

    y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

    svg.selectAll(".layer")
      .data(layers)
      .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i); });

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    d3.select(".x.axis")
      .append("text")
      .text("Hora")
      .attr("x", width / 2)
      .attr("y", margin.bottom);

    d3.select(".y.axis")
      .append("text")
      .text(y_axis_title);

    var opacity = [ 0.2, 0.6, 1 ];

    svg.selectAll(".layer")
      .attr("opacity", opacity[1])
      .on("mouseover", function(d, i) {
        svg.selectAll(".layer").transition()
          .duration(250)
          .attr("opacity", function(d, j) {
            return j != i ? opacity[0] : opacity[2];
          })})
      .on("mousemove", function(d, i) {
        coord = d3.mouse(this);
        var i = Math.floor((x.invert(coord[0]).getTime() - t0) / interval);
        var getHour = function (i) {
          return (new Date(i * interval + t0)).toLocaleTimeString().replace(/:\d+ PM/, '');
        }
        var msg = d.key + "<br/>" +
          d.values[i].value + "<br/>" +
          getHour(i) + " - " + getHour(i + 1);

        d3.select(this)
          .classed("hover", true);

        var offset_x = 10;
        tooltip.html(msg)
          .style("visibility", "visible")
          .style("left", (d3.event.pageX + offset_x) + "px")
          .style("top", d3.event.pageY + "px");
      })
      .on("mouseout", function(d, i) {
        svg.selectAll(".layer")
          .transition()
          .duration(250)
          .attr("opacity", opacity[1]);
        d3.select(this)
          .classed("hover", false)
          .attr("stroke-width", "0px"), tooltip.style("visibility", "hidden");
      })
      .on("click", function(d) {
        if (redirect) window.location = "?candidate=" + d.key;
      })

      d3.select(".chart")
        .on("mousemove", function() {
          var coord = d3.mouse(this);
          var offset = [ 7 /* awful hack */, d3.event.pageY - coord[1] ];
          if (coord[0] > margin.left) {
            vertical.style("visibility", "visible")
              .style("left", (coord[0] + offset[0]) + "px" )
              .style("top", (margin.top + offset[1]) + "px");
          } else {
            vertical.style("visibility", "hidden");
          }
        });
  });
  
  d3.csv("data/eventos.csv", function(data) {
    var x = d3.time.scale()
      .range([0, width])
      .domain([t0, t1]); /* shouldn't be necessary, but it is... */
    var r0 = 2;
    var r1 = 2 * r0;
    svg.selectAll(".events")
    .data(data)
    .enter().append("circle")
      .attr("cx", function(d) { return x(d.time); })
      .attr("cy", function(d) { return height; })
      .attr("r", r0)
      .attr("fill", "gray");
    svg.selectAll("circle")
      .on("mouseover", function(d) {
        var offset_y = -40;
        this.setAttribute("r", r1);
        tooltip.html(d.event)
          .style("visibility", "visible")
          .style("left", d3.event.pageX + "px")
          .style("top", (d3.event.pageY + offset_y) + "px");
      })
      .on("mouseout", function() {
        this.setAttribute("r", r0);
        tooltip.style("visibility", "hidden");
      });
  });
}
