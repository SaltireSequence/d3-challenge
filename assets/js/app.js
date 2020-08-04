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

var margins = {}
