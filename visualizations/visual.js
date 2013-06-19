
var data = [0,4,6,8,10,12,15];

// var chart = $('<div></div>').addClass("chart");
// $(".chart-container").append(chart);

// data.forEach(function(d) {
// 	chart.append($('<div></div>').css("width",d*10+"px").text(d));
// });

var x_scale = d3.scale.linear().domain([0,d3.max(data)]).range(["0%","100%"]);


var chart = d3.select(".chart-container").append("svg").attr("class","chart");

chart.selectAll("rect").data(data)
	.enter().append("rect")
	.attr("y",function(d,i){return 20*i;})
	.attr("width",x_scale)
	.attr("height",20);

chart.selectAll("text").data(data)
	.enter().append("text")
	.attr("x",x_scale)
	.attr("y",function(d,i){return (i+.5)*20;})
	.attr("dx",-3)
	.attr("dy",".35em")
	.attr("text-anchor","end")
	.text(function(d){return d;});