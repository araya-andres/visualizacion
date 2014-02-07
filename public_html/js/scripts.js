function draw(data) {
	"use strict";
	d3.select("body")
		.append("div")
			.attr("class", "chart")
		.selectAll("div.line")
		.data(data)
		.enter()
		.append("div")
			.attr("class", "line");
	d3.selectAll("div.line")
		.append("div")
			.attr("class", "label")
			.text( function (d) { return d.hashtag });
	d3.selectAll("div.line")
		.append("div")
			.attr("class", "bar")
			.style("width", function (d) { return d.count / 100 + "px" })
			.text(function (d) { return d.count; });
}

function tweets_por_minuto(data) {
  var margin = 50,
      width = 700,
      height = 300;

  d3.select("body")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle");

  var x_extent =
    d3.extent(data, function(d) { return d.timestamp });
  var x_scale =
    d3.scale.linear()
      .range([margin, width - margin])
      .domain(x_extent);
  var y_extent =
    d3.extent(data, function(d) { return d.count });
  var y_scale =
    d3.scale.linear()
      .range([height - margin, margin])
      .domain(y_extent);

  d3.selectAll("circle")
    .attr("cx", function(d) { return x_scale(d.timestamp) })
    .attr("cy", function(d) { return y_scale(d.count) });
  d3.selectAll("circle")
    .attr("r", 2);

  var x_axis = d3.svg.axis().scale(x_scale);
  d3.select("svg")
    .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + (height - margin) + ")")
    .call(x_axis);

  var y_axis = d3.svg.axis().scale(y_scale).orient("left");
  d3.select("svg")
    .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + margin + ", 0)")
    .call(y_axis);

  d3.select(".x.axis")
    .append("text")
      .text("hora (epoch)")
      .attr("x", (width / 2) - margin)
      .attr("y", margin / 1.5);

  d3.select(".y.axis")
    .append("text")
      .text("tweets")
      .attr("transform", "rotate(-90, -30, 0) translate(-280)");
}
