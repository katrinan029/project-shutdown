var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#bar3")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


 var chosenYAxis = "loc_end_count";

  // function used for updating y-scale var upon click on axis label
  function yScale(Data, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(Data, d => d[chosenYAxis]) * 0.8,
      d3.max(Data, d => d[chosenYAxis]) * 1.2
      ])
      .range([height, 0]);

    return yLinearScale;

  }

  // function used for updating yAxis var upon click on axis label
  function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
      .duration(1000)
      .call(leftAxis);

    return yAxis;
  }

      // function used for updating circles group with a transition to
  // new circles
  function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      // .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesGroup;
  }

   // function used for updating circles text group with a transition to
  // new circles
  function renderYText(circlesTextGroup, newYScale, chosenYAxis) {

    circlesTextGroup.transition()
      .duration(1000)
      // .attr("dx", d => newXScale(d[chosenXAxis]))
      .attr("dy", d => newYScale(d[chosenYAxis]))
      .attr("text-anchor", "middle");
    return circlesTextGroup;
  }
  // function used for updating circles group with new tooltip
  function updateToolTip(chosenYAxis, circlesGroup, circlesTextGroup) {

    var ylabel;

    if (chosenYAxis === "loc_end_count") {
      ylabel = "No. of location closed:";
    }
    else {
      ylabel = 'No. of locations opened:';
    }


    //Initialize tool-tip
    var toolTip = d3.tip()
      .attr("class", "tooltip d3-tip")
      .offset([80, -60])
      .html(function (d) {
        return (`<strong>${ylabel} ${d[chosenYAxis]}</strong>`);
      });

    //Create circles tool-tip in chart
    circlesGroup.call(toolTip);
    
    //Create event listeners to display or hide circles tool-tip
    circlesGroup.on("mouseover", function (data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function (data, index) {
        toolTip.hide(data);
      });

    //Create text inside circles tool-tip in chart
    circlesTextGroup.call(toolTip);

    //Create event listeners to display or hide text tool-tip
      circlesTextGroup.on('mouseover', function(data, index){
        toolTip.show(data, this);
      })
      //onmouseout event
      .on("mouseout", function(data){
        toolTip.hide(data);
      });
    return circlesGroup;
  }


  

// Retrieve data from the CSV file and execute everything below
d3.json('/scatterPlot').then(function(Data, err) {
  if (err) throw err;

  var parseDate = d3.timeParse("%Y");
  // var formatYear = d3.timeFormat("%Y")
  // parse data
  Data.forEach(function(data) {
    data.loc_end_count = data.loc_end_count;
    data.loc_start_count = data.loc_start_count;
    data.year = parseDate(data.year);
    
  });

  //   // create scales
  // var xLinearScale = d3.scaleLinear()
  //   .domain([d3.min(Data, d => d.year)-5, d3.max(Data, d => d.year)+5]) 
  //   .range([0, width]);


    // create scales
    var xTimeScale = d3.scaleTime()
    .domain(d3.extent(Data, d => d.year)) 
    .range([0, width]);


  // Create y scale function
  var yLinearScale = d3.scaleLinear()
  .domain([200, 28000])
  .range([height, 0]);

  
  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  
  var circlesTextGroup = chartGroup.selectAll("text")
  .data(Data)
  .enter()
  .append("text")
  .text(d => new Date(d.year).getFullYear())
  .attr("dx", d => xTimeScale(d.year))
  .attr("dy", d => yLinearScale(d[chosenYAxis]*.98))
  .attr("class", "stateText")

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
    .attr("cx", d => xTimeScale(d.year))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 20)
    .attr("fill", "pink")
    .attr("opacity", ".5");

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height})`)
    .attr("x", 0)
    .attr("y", 40)
    .classed("active", true)
    .text("Year");


  // Create group for three y-axis labels
  var ylabelsGroup = chartGroup.append("g")
    

  // // updateToolTip function above csv import
  var endLabel = ylabelsGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left+20)
  .attr("x", 0 - (height / 2))
  .attr("value", "loc_end_count")
  .attr("dy", "1em")
  .text("No. of Locations Closed")
  .classed("inactive", true);


var startLabel = ylabelsGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("value", "loc_start_count")
  .attr("dy", "1em")
  .text("No. of Locations Opened")
  .classed("inactive", true)

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenYAxis, circlesGroup, circlesTextGroup);

          //y axis labels event listener
          ylabelsGroup.selectAll("text")
          .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenYAxis) {

              // replaces chosenYAxis with value
              chosenYAxis = value;

              // functions here found above csv import
              // updates y scale for new data
              yLinearScale = yScale(Data, chosenYAxis);

              // updates y axis with transition
              yAxis = renderYAxes(yLinearScale, yAxis);

              // updates circles with new y values
              circlesGroup = renderYCircles(circlesGroup, yLinearScale,  chosenYAxis);

              // updates circles text with new y values
              circlesTextGroup = renderYText(circlesTextGroup, yLinearScale, chosenYAxis);

              // updates tooltips with new info
              circlesGroup = updateToolTip(chosenYAxis, circlesGroup, circlesTextGroup);

              // changes classes to change bold text
              if (chosenYAxis === "loc_start_count") {
                startLabel
                  .classed("active", true)
                  .classed("inactive", false)
                endLabel
                  .classed("active", false)
                  .classed("inactive", true)
              }
              else {
                endLabel
                  .classed("active", true)
                  .classed("inactive", false)
                startLabel
                  .classed("active", false)
                  .classed("inactive", true)           
              }
            }

    });
}).catch(function(error) {
  console.log(error);
});
