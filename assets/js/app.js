// @TODO: YOUR CODE HERE!
function chartRender() {

// Calling chart, if chartSVG is not empty, when brower loads index
  var chartSVG = d3.select("body").select("svg");
  // Clear chartSVG if empty
  if (!chartSVG.empty()) {
    chartSVG.remove();
  }

  // Using a proportional scaler, to set chart dimensions.
  var chartWidth = 1000;
  var chartHeight = 612.24;

  // Setting appropriate margins
  var margins = {
    top: 30,
    right: 40,
    bottom: 120,
    left: 100
  };

  /* Defining dimensions of chart
  REF: https://observablehq.com/@d3/margin-convention */
  var height = chartHeight - margins.top - margins.bottom;
  var width = chartWidth - margins.left - margins.right;

  /* SVG wrapper to hold the chart. I appended my SVG group, that will
  hold my chart
  REF: https://stackoverflow.com/questions/55988709/how-can-i-add-labels
  -inside-the-points-in-a-scatterplot*/
  var svgWrapper = d3.select("#scatter")
  .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight);

  var chartGroup = svgWrapper.append("g")
    .attr("transform", `translate(${margins.left}, ${margins.top})`);

// Setting initial parameters to render on chart, upon loading
  var InitialXAxis = "poverty";
  var InitialYAxis = "healthcare";

// functions to update the scale of both the y and x axis, when clicked
  function xScale(CensusData, InitialXAxis) {
// Creating scale functions for both the y and x axis.
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(CensusData, d => d[InitialXAxis]) * 0.8,
        d3.max(CensusData, d => d[InitialXAxis]) * 1.2
      ])
      .range([0, width]);
    return xLinearScale;
  }

  function yScale(CensusData, InitialYAxis) {
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(CensusData, d => d[InitialYAxis]) * 0.8,
        d3.max(CensusData, d => d[InitialYAxis]) * 1.2
      ])
      .range([height, 0]);
    return yLinearScale;
  }
