var t0 = 1390176000000;

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
  var margin = { top: 50, right: 50, bottom: 50, left: 50 };
  var width = document.body.clientWidth - margin.left - margin.right;
  var height = 600 - margin.top - margin.bottom;

  interval = interval * 60000;

  // Show tooltip
  var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");

  var x = d3.time.scale()
    .range([0, width]);

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
	
  var graph = d3.csv(csvpath, function(data) {
    data.forEach(function(d) {
      d.value = +d.value;
    });
	
    var layers = stack(nest.entries(data));

    x.domain(d3.extent(data, function(d) { return d.date; }));
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
      .text("Tweets");

    svg.selectAll(".layer")
      .attr("opacity", 0.6)
      .on("mouseover", function(d, i) {
        svg.selectAll(".layer").transition()
          .duration(250)
          .attr("opacity", function(d, j) {
            return j != i ? 0.4 : 1;
          })})
      .on("mousemove", function(d, i) {
        coord = d3.mouse(this);
        var i = Math.floor((x.invert(coord[0]).getTime() - t0) / interval);
        var getTime = function (i) {
          return (new Date(i * interval + t0)).toLocaleTimeString().replace(/:\d+ PM/, '');
        }
        var msg = d.key + "<br/>" +
          d.values[i].value + "<br/>" +
          getTime(i) + " - " + getTime(i + 1);

        d3.select(this)
          .classed("hover", true);

        tooltip.html(msg)
          .style("visibility", "visible")
          .style("left", (d3.event.pageX - 75) + "px")
          .style("top", d3.event.pageY + "px");
      })
      .on("mouseout", function(d, i) {
        svg.selectAll(".layer")
          .transition()
          .duration(250)
          .attr("opacity", 0.6);
        d3.select(this)
          .classed("hover", false)
          .attr("stroke-width", "0px"), tooltip.style("visibility", "hidden");
      })
      .on("click", function(d) {
        if (redirect) window.location = "?candidate=" + d.key;
      })
	  
      // Vertical bar
      var vertical = d3.select(".chart")
        .append("div")
        .attr("class", "vertical")
        .style("position", "absolute")
        .style("width", "1px")
        .style("height", height + "px")
        .style("background", "gray");

      d3.select(".chart")
        .on("mousemove", function() {
          var coord = d3.mouse(this);
          var offset_x = 7; // awful hack
          var offset_y = d3.event.pageY - coord[1];
          if (coord[0] > margin.left) {
            vertical.style("visibility", "visible")
              .style("left", (coord[0] + offset_x) + "px" )
              .style("top", (margin.top + offset_y) + "px");
          } else {
            vertical.style("visibility", "hidden");
          }
        });
  });
  
  var events = d3.csv("data/eventos.csv")
	.get(function(error, rows) 
	{ 
		console.log(rows);
		rows.forEach(function(row)
		{
			console.log(x(row.time));
			svg.append("circle")
			  .attr("cx",x(row.time))
			  .attr("cy",height)
			  .attr("r","2")
			  .attr("stroke","none")
			  .attr("stroke-width","3")
			  .attr("fill","#888888")
			  .on("mouseover",
				function()
				{
					this.setAttribute("r",5);
				}
				)
			  .on("mouseout",
				function()
				{
					this.setAttribute("r",2);
				}
				)
				;
/*	
	svg.append("g")
	  .attr("id","event_group");
	  .attr("visibility","hidden")	
	  .append("text")
	  .attr("id","event_text");
	  .attr("x", 0)
	  .attr("y", height)
	  .attr("dy", ".35em")
	  .attr("text-anchor", "middle")
	  .text("evento");

	
	svg.append("rect")
	  .attr("id","event")
	  .attr("x", bbox.x)
      .attr("y", bbox.y)
      .attr("width", bbox.width)
      .attr("height", bbox.height)
	  .attr("rx","4")
	  .attr("ry","4")
      .attr("stroke","none")
      .attr("opacity","0.25")
	  .attr("fill","black")
	  .attr("visibility","hidden");  
	*/				
		})
	});
}
