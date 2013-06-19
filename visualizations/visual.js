
var data = [0,4,6,8,10,12,15];

// var chart = $('<div></div>').addClass("chart");
// $(".chart-container").append(chart);

// data.forEach(function(d) {
// 	chart.append($('<div></div>').css("width",d*10+"px").text(d));
// });
var chart_height = 300;
var chart_width = 300;

var x_scale = d3.scale.ordinal().domain(d3.keys(data)).rangeBands([0,chart_width]);
var y_scale = d3.scale.linear().domain([0,d3.max(data)]).range([0,chart_height]);


var chart = d3.select(".chart-container").append("svg")
	.attr("class","chart")
	.attr("height",chart_height)
	.attr("width",chart_width);

chart.selectAll("rect").data(data)
	.enter().append("rect")
	.attr("x",function(d,i){return x_scale(i);})
	.attr("y", function(d){return chart_height-y_scale(d);})
	.attr("width",x_scale.rangeBand())
	.attr("height",y_scale);

chart.selectAll("text").data(data)
	.enter().append("text")
	.attr("y",function(d){return chart_height - y_scale(d);})
	.attr("x",function(d,i){return x_scale(i) + x_scale.rangeBand()/2;})
	// .attr("dx",-3)
	// .attr("dy",".35em")
	.attr("dy",".7em")
	.attr("text-anchor","middle")
	.text(function(d){return d;});