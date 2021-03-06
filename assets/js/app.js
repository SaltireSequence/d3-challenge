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

  function YAxisUpdate(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
    yAxis.transition()
      .duration(500)
      .call(leftAxis);
    return yAxis;
  }

  /* function to update svgCircles to transition to the revised
  svgCircles */
  function renderCircles(svgCircles, newXScale, InitialXAxis, newYScale, InitialYAxis) {
    svgCircles.transition()
      .duration(500)
      .attr("cx", d => newXScale(d[InitialXAxis]))
      .attr("cy", d => newYScale(d[InitialYAxis]));
    return svgCircles;
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

// function for updating svgCircles with new tooltip.
  function updateToolTip(InitialXAxis, InitialYAxis, svgCircles, textGroup) {

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
        return (`<strong>${d.abbr}</strong><br>${xLabel} ${d[InitialXAxis]}<br>${yLabel} ${d[InitialYAxis]}`);
      });
// Creating circles tooltip on scatterplot
    svgCircles.call(toolTip);
    svgCircles.on("mouseover", function(data) {
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
    return svgCircles;
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

/* Creating and initializing initial circle plots on scatterplot
REF: https://www.d3-graph-gallery.com/graph/custom_color.html */
    var svgCircles = chartGroup.selectAll(".stateCircle")
      .data(CensusData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d[InitialXAxis]))
      .attr("cy", d => yLinearScale(d[InitialYAxis]))
      .attr("class", "stateCircle")
      .attr("r", 14)
      .attr("opacity", ".75");

// Appending data text to Circles
    var textGroup = chartGroup.selectAll(".stateText")
      .data(CensusData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d[InitialXAxis]))
      .attr("y", d => yLinearScale(d[InitialYAxis]*.98))
      .text(d => (d.abbr))
      .attr("class", "stateText")
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .attr("fill", "white");
// Grouping for 3 xAxis Labels
    var xLabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + 20})`);

// Append xAxis labels for inPovertyLabel, ageLabel, householdIncomeLabel
    var inPovertyLabel = xLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "poverty")
      .classed("active", true)
      .text("In Poverty (%)");
    var ageLabel = xLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "age")
      .classed("inactive", true)
      .text("Age (Median)");
    var householdIncomeLabel = xLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 60)
      .attr("value", "income")
      .classed("inactive", true)
      .text("Household Income (Median)");

// Grouping for 3 xAxis Labels
    var yLabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(-25, ${height / 2})`);

    var lacksHealthcareLabel = yLabelsGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -30)
      .attr("x", 0)
      .attr("value", "healthcare")
      .attr("dy", "1em")
      .classed("axis-text", true)
      .classed("active", true)
      .text("Lacks Healthcare (%)");

    var smokesLabel = yLabelsGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", 0)
      .attr("value", "smokes")
      .attr("dy", "1em")
      .classed("axis-text", true)
      .classed("inactive", true)
      .text("Smokes (%)");

    var obesityLabel = yLabelsGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -70)
      .attr("x", 0)
      .attr("value", "obesity")
      .attr("dy", "1em")
      .classed("axis-text", true)
      .classed("inactive", true)
      .text("Obese (%)");

// tooltip function update
    var svgCircles = updateToolTip(InitialXAxis, InitialYAxis, svgCircles, textGroup);

    // xAxis event listener - labels
    xLabelsGroup.selectAll("text")
      .on("click", function() {
        // Get Value of Selection
        var value = d3.select(this).attr("value");
        if (value !== InitialXAxis) {
  // Replaces InitialXAxis with Value
          InitialXAxis = value;
  // Update for new data
          xLinearScale = xScale(CensusData, InitialXAxis);
  // xAxis update for transitions
          xAxis = XAxisUpdate(xLinearScale, xAxis);
  // Updating the svgCircles with updated values
          svgCircles = renderCircles(svgCircles, xLinearScale, InitialXAxis, yLinearScale, InitialYAxis);
  // Updating the textGroup with updated values
          textGroup = renderText(textGroup, xLinearScale, InitialXAxis, yLinearScale, InitialYAxis)
          svgCircles = updateToolTip(InitialXAxis, InitialYAxis, svgCircles, textGroup);
  /* if / else if / else statements that will tag the activate / bold the axis
  label that is selected */
          if (InitialXAxis === "poverty") {
            inPovertyLabel
              .classed("active", true)
              .classed("inactive", false);
            ageLabel
              .classed("active", false)
              .classed("inactive", true);
            householdIncomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (InitialXAxis === "age") {
            inPovertyLabel
              .classed("active", false)
              .classed("inactive", true);
            ageLabel
              .classed("active", true)
              .classed("inactive", false);
            householdIncomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            inPovertyLabel
              .classed("active", false)
              .classed("inactive", true);
            ageLabel
              .classed("active", false)
              .classed("inactive", true);
            householdIncomeLabel
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });
    // xAxis event listener - labels
    yLabelsGroup.selectAll("text")
      .on("click", function() {
        // Get Value of Selection
        var value = d3.select(this).attr("value");
        if (value !== InitialYAxis) {
    // Replaces InitialXAxis with Value
          InitialYAxis = value;
    // Update for new data
          yLinearScale = yScale(CensusData, InitialYAxis);
    // xAxis update for transitions
          yAxis = YAxisUpdate(yLinearScale, yAxis);
    // Updating the svgCircles with updated values
          svgCircles = renderCircles(svgCircles, xLinearScale, InitialXAxis, yLinearScale, InitialYAxis);
    // Updating the textGroup with updated values
          textGroup = renderText(textGroup, xLinearScale, InitialXAxis, yLinearScale, InitialYAxis)
          svgCircles = updateToolTip(InitialXAxis, InitialYAxis, svgCircles, textGroup);
    /* if / else if / else statements that will tag the activate / bold the axis
    label that is selected */
          if (InitialYAxis === "healthcare") {
            lacksHealthcareLabel
              .classed("active", true)
              .classed("inactive", false);
            obesityLabel
              .classed("active", false)
              .classed("inactive", true);
            smokesLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (InitialYAxis === "obesity") {
            lacksHealthcareLabel
              .classed("active", false)
              .classed("inactive", true);
            obesityLabel
              .classed("active", true)
              .classed("inactive", false);
            householdIncomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            lacksHealthcareLabel
              .classed("active", false)
              .classed("inactive", true);
            obesityLabel
              .classed("active", false)
              .classed("inactive", true);
            smokesLabel
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });
  });
}
chartRender();
d3.select(window).on("resize", chartRender);
