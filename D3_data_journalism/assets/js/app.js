// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("../assets/data/data.csv").then(function(newsData) {
    console.log(newsData);

    newsData.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });

    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(newsData, d => d.healthcare)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(newsData, d => d.poverty)])
      .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


});