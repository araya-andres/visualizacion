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
