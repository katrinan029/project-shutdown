// @TODO: YOUR CODE HERE!
function makeResponsive() {

  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // svg params
  var svgHeight = window.innerHeight;
  var svgWidth = window.innerWidth;
  

  var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
  var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr('class', "chart");

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
   // Initial Params
  var chosenXAxis = "busi_start_dt";

  // function used for updating x-scale var upon click on axis label
  function xScale(sf_data, chosenXAxis) {
    // create scales
    var xTimeScale = d3.scaleTime()
      .domain([d3.min(sf_data, d => d[chosenXAxis]),
      d3.max(sf_data, d => d[chosenXAxis])
      ])
      .range([0, width]);

    return xTimeScale;

  }

  // function used for updating xAxis var upon click on axis label
  function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);

    return xAxis;
  }

  
  // Initial y Params
  var chosenYAxis = "NAICS_code";

  // function used for updating y-scale var upon click on axis label
  function yScale(sf_data, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(sf_data, d => d[chosenYAxis]),
      d3.max(sf_data, d => d[chosenYAxis])
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
  function renderXCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesGroup;
  }

   // function used for updating circles text group with a transition to
  // new circles
  function renderXText(circlesTextGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesTextGroup.transition()
      .duration(1000)
      .attr("dx", d => newXScale(d[chosenXAxis]))
      .attr("dy", d => newYScale(d[chosenYAxis]))
      .attr("text-anchor", "middle");
    return circlesTextGroup;
  }

    // function used for updating circles group with a transition to
  // new circles
  function renderYCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesGroup;
  }

   // function used for updating circles text group with a transition to
  // new circles
  function renderYText(circlesTextGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesTextGroup.transition()
      .duration(1000)
      .attr("dx", d => newXScale(d[chosenXAxis]))
      .attr("dy", d => newYScale(d[chosenYAxis]))
      .attr("text-anchor", "middle");
    return circlesTextGroup;
  }

  


  // function used for updating circles group with new tooltip
  function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, circlesTextGroup) {

    var xlabel;

    if (chosenXAxis === "busi_start_dt") {
      xlabel = "Business start date:";
    }
    else if (chosenXAxis === 'busi_end_dt') {
      xlabel = "Business end date";
    }
    else if (chosenXAxis === 'loc_start_dt') {
      xlabel = "Location start date";
    }
    else {
      xlabel = "Location end date:";
    }

    var ylabel;

    if (chosenYAxis === "NAICS_code") {
      ylabel = "Type of business";
    }
    else  {
      ylabel = "Neighborhoods";
    }
    


    //Initialize tool-tip
    var toolTip = d3.tip()
      .attr("class", "tooltip d3-tip")
      .offset([80, 60])
      .html(function (d) {
        return (`<strong>${d.business_name}</strong><br>${xlabel} ${d[chosenXAxis]}<br> ${ylabel} ${d[chosenYAxis]}`);
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
  d3.csv('./assets/data/sf_data.csv').then(function (sf_data) {
    console.log(sf_data);

    for (var i=0; len = sf_data.length, i< len; i++){
      sf_data.busi_start_dt = new Date(sf_data.busi_start_dt).getFullYear();
      sf_data.busi_end_dt = new Date (sf_data.busi_end_dt).getFullYear();
      sf_data.loc_start_dt = new Date (sf_data.loc_start_dt).getFullYear();
      sf_data.loc_end_dt = new Date (sf_data.loc_end_dt).getFullYear();
      sf_data.NAICS_code = +sf_data.NAICS_code;
      sf_data.neighborhood = sf_data.neighborhood
    }
    


  // // Format the data
  // sf_data.forEach(function(data) {
  //   data.busi_start_dt = new Date(data.busi_start_dt).getFullYear();
  //   data.busi_end_dt = new Date (data.busi_end_dt).getFullYear();
  //   data.loc_start_dt = new Date (data.loc_start_dt).getFullYear();
  //   data.loc_end_dt = new Date (data.loc_end_dt).getFullYear();
  //   data.NAICS_code = +data.NAICS_code;
  //   data.neighborhood = data.neighborhood
  // });

      
    // xTimeScale & yLinearScale function above csv import
    var xTimeScale = xScale(sf_data, chosenXAxis);
    var yLinearScale= yScale(sf_data, chosenYAxis);
    
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xTimeScale);
    var leftAxis = d3.axisLeft(yLinearScale);

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
    var circlesGroup = chartGroup.selectAll(".stateCircle")
      .data(sf_data)
      .enter()
      .append("circle")
      .attr("cx", d => xTimeScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d[chosenYAxis]))
      .attr("class", "stateCircle")
      .attr("r", 15)
      .attr("opacity", ".5");

    // text inside circles
    var circlesTextGroup = chartGroup.selectAll(".stateText")
      .data(sf_data)
      .enter()
      .append("text")
      .text(d => d.state)
      .attr("dx", d => xTimeScale(d[chosenXAxis]))
      .attr("dy", d => yLinearScale(d[chosenYAxis]*.98))
      .attr("class", "stateText")

    // Create group for three x-axis labels
    var xlabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height})`);

    var busiStartLabel = xlabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "busi_start_dt") // value to grab for event listener
      .classed("active", true)
      .text("Business Start Date");

    var busiEndLabel = xlabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "busi_end_dt") // value to grab for event listener
      .classed("inactive", true)
      .text("Business End Date");

    var locStartLabel = xlabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 60)
      .attr("value", "loc_start_dt") // value to grab for event listener
      .classed("inactive", true)
      .text("Location Start Date");

    var locEndLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "loc_end_dt") // value to grab for event listener
    .classed("inactive", true)
    .text("Location End Date");


    // Create group for three y-axis labels
    var ylabelsGroup = chartGroup.append("g")
      // .attr("transform", `translate(-25 ,${height/ 2})`);

      //Append yAxis
    var busiTypeLabel = ylabelsGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left+40)
      .attr("x", 0 - (height / 2))
      .attr("value", "NAICS_code")
      .attr("dy", "1em")
      .text("Business Type")
      .classed("active", true);


    var neighborhoodLabel = ylabelsGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left+20)
      .attr("x", 0 - (height / 2))
      .attr("value", "neighborhood")
      .attr("dy", "1em")
      .text("Neighborhoods")
      .classed("inactive", true);


      // updateToolTip function above csv import
    circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, circlesTextGroup);

    // x axis labels event listener
    xlabelsGroup.selectAll("text")
      .on("click", function () {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {

          // replaces chosenXAxis with value
          chosenXAxis = value;

          // functions here found above csv import
          // updates x scale for new data
          xTimeScale = xScale(sf_data, chosenXAxis);

          // updates x axis with transition
          xAxis = renderXAxes(xTimeScale, xAxis);

          // updates circles with new  values
          circlesGroup = renderXCircles(circlesGroup, xTimeScale, chosenXAxis, yLinearScale, chosenYAxis);

          // updates circles text with new  values
          circlesTextGroup = renderXText(circlesTextGroup, xTimeScale, chosenXAxis, yLinearScale, chosenYAxis);

          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, circlesTextGroup);

          // changes classes to change bold text
          if (chosenXAxis === "busi_start_dt") {
            busiStartLabel
              .classed("active", true)
              .classed("inactive", true);
            busiEndLabel
              .classed("active", false)
              .classed("inactive", true);
            locStartLabel
              .classed("active", false)
              .classed("inactive", true);
            locEndLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenXAxis === 'busi_end_dt') {
            busiEndLabel
              .classed("active", true)
              .classed("inactive", false);
            busiStartLabel
              .classed("active", false)
              .classed("inactive", true);
            locStartLabel
              .classed("active", false)
              .classed("inactive", true);
            locEndLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenXAxis === 'loc_start_dt') {
            locStartLabel
              .classed("active", true)
              .classed("inactive", false);
            busiStartLabel
              .classed("active", false)
              .classed("inactive", true);
            busiEndLabel
              .classed("active", false)
              .classed("inactive", true);
            locEndLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            locEndLabel
              .classed("active", true)
              .classed("inactive", false);
            busiStartLabel
              .classed("active", false)
              .classed("inactive", true);
            busiEndLabel
              .classed("active", false)
              .classed("inactive", true);
            locStartLabel
              .classed("active", false)
              .classed("inactive", true);
          }
        }
      
      });
  

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
              yLinearScale = yScale(sf_data, chosenYAxis);

              // updates y axis with transition
              yAxis = renderYAxes(yLinearScale, yAxis);

              // updates circles with new y values
              circlesGroup = renderYCircles(circlesGroup, xTimeScale, chosenXAxis, yLinearScale, chosenYAxis);

              // updates circles text with new y values
              circlesTextGroup = renderYText(circlesTextGroup, xTimeScale, chosenXAxis, yLinearScale, chosenYAxis);

              // updates tooltips with new info
              circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, circlesTextGroup);

              // changes classes to change bold text
              if (chosenYAxis === "NAICS_code") {
                busiTypeLabel
                  .classed("active", true)
                  .classed("inactive", false)
                neighborhoodLabel
                  .classed("active", false)
                  .classed("inactive", true)
                             
              }
              else {
                neighborhoodLabel
                  .classed("active", true)
                  .classed("inactive", false)
                busiTypeLabel
                  .classed("active", false)
                  .classed("inactive", true)
                
            }
          }
          });  
          
  });
}


//this function is called when browser loads
makeResponsive();

// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);