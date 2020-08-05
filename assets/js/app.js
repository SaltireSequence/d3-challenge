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

/* functions to update the scale of both the y and x scales,
axis labels clicked */
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

  /* functions to update  both the y and x axis, when the axis labels
  are clicked */
  function XAxisUpdate(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
    xAxis.transition()
      .duration(500)
      .call(bottomAxis);
    return xAxis;
  }

  function YAxisUpdate(newYScalem, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
    yAxis.transition()
      .duration(500)
      .call(leftAxis);
    return yAxis;
  }

  /* function to update circlesGroup to transition to the revised
  circlesGroup */
  function renderCircles(circlesGroup, newXScale, InitialXAxis, newYScale, InitialYAxis) {
    circlesGroup.transition()
      .duration(500)
      .attr("cx", d => newXScale(d[InitialXAxis]))
      .attr("cy", d => newYScale(d[InitialYAxis]));
    return circlesGroup;
  }

  // function to update textGroup to transition to revised textGroup
  function renderText(textGroup, newXScale, InitialXAxis, newYScale, InitialYAxis) {
  textGroup.transition()
    .duration(500)
    .attr("x", d => newXScale(d[InitialXAxis]))
    .attr("y", d => newYScale(d[InitialYAxis]))
    .attr("text-anchor", "middle");

    return textGroup;
  }

// function for updating circlesGroup with new tooltip.
  function updateToolTip(InitialXAxis, InitialYAxis, circlesGroup, textGroup) {

    if (InitialXAxis === "poverty") {
      var xLabel = "Poverty (%)";
    }
    else if (InitialXAxis === "age") {
      var xLabel = "Age (Median)";
    }
    else {
      var xLabel = "Household Income (Median)";
    }
    if (InitialYAxis === "healthcare") {
      var yLabel = "Lacks Healthcare (%)";
    }
    else if (InitialYAxis === "obesity") {
      var yLabel = "Obese (%)";
    }
    else {
      var yLabel = "Smokes (%)";
    }

    // code to initialize the tooltip
    var toolTip = d3.tip()
      .attr("class", "tooltip d3-tip")
      .offset([90, 90])
      .html(function(d) {
        return (`<strong>${d.abbr}</strong><br>${xLabel} ${d[InitialXAxis]}
          <br>${yLabel} ${d[InitialYAxis]}`);
      });
// Creating circles tooltip on scatterplot
    circlesGroup.call(toolTip);
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
// onmouseout event handler
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });

// Text creation tooltip on scatterplot
    textGroup.call(toolTip);
    textGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
// onmouseout event handler
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });
    return circlesGroup;
  }

  // importing data from the provided data.csv File
  d3.csv("assets/data/data.csv")
    .then(function(CensusData) {

    /* Parsing the data and using the unary plus operator
    to convert to numbers */
    CensusData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.age = +data.age;
      data.income = +data.income;
      data.healthcare = +data.healthcare;
      data.obesity = +data.obesity;
      data.smokes = +data.smokes;
    });

/* Creating functions pertinent to the xLinearScale and yLinearScale
for the scatterplot */
    var xLinearScale = xScale(CensusData, InitialXAxis);
    var yLinearScale = yScale(CensusData, InitialYAxis);

// Axis function creation using the axis component
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

// Appending xAxis and yAxis to the scatterplot
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
    var yAxis = chartGroup.append("g")
      .classed("y-axis", true)
      .call(leftAxis);
