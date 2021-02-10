//D3 Challenge

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

// Create SVG wrapper and append SVG group to hold and position the chart
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import Data from CSV
d3.csv("../assets/data/data.csv").then(function(newsData) {
    console.log(newsData);

    
    // Parse data
    newsData.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });


    // Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(newsData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([4, d3.max(newsData, d => d.healthcare)])
      .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append axes to the chart
    chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create circles
    chartGroup.selectAll("circle")
      .data(newsData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "15")
      .attr("fill", "steelblue")
      .attr("opacity", ".5");
  
    // Add and position abbreviations to the circles
    chartGroup.append("text")
      .style("font-size", "12px")
      .style("fill", "white")
      .selectAll("tspan")
      .data(newsData)
      .enter()
      .append("tspan")
        .attr("x", function(data) {
          return xLinearScale(data.poverty -.15);
        })
        .attr("y", function(data) {
          return yLinearScale(data.healthcare -.2);
        })
        .text(function(data) {
          return data.abbr
        });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 1.5))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2.3}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");

});