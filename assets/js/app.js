// @TODO: YOUR CODE HERE!
function chatRender() {

// Calling chart, if chartSVG is not empty, when brower loads index
var chartSVG = d3.select("body").select("svg");
// Clear chartSVG if empty
if (!chartSVG.empty()) {
  chartSVG.remove();
}

// Using a proportional scaler, to set chart dimensions.
var chartWidth = 1000;
var chartHeight = 612.24

// Setting appropriate margins
var margins = {
  top: 30,
  right: 40,
  bottom: 120,
  left: 100
};

/* Defining dimensions of chart
REF: https://observablehq.com/@d3/margin-convention */
var height = chartWidth - margin.top - margin.bottom;
var width = chartHeight - margin.left - margin.right;

/* SVG wrapper to hold the chart. I appended my SVG group, that will
hold my chart*/ 
var svgWrapper = d3.select("#scatter")
.append("svg")
  .attr("width", chartWidth)
  .attr("height", chartHeight)
