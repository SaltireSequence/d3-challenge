// @TODO: YOUR CODE HERE!
function chatRender() {

var chartSVG = d3.select("body").select("svg");
if (!chartSVG.empty()) {
  chartSVG.remove();
}

var chartWidth =
