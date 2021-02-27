d3.csv('../static/sfdata.csv').then((importedData) => {
  const csvData = importedData;

  let yearCount = {};
  yearCount['Business End Date'] = {};
  yearCount['Business Start Date'] = {};

  for (let row = 0; row < csvData.length; row++) {
    getBusinessDate('Business End Date', row);
    getBusinessDate('Business Start Date', row);
  }

  // function to get end year and start year and add to yearCount object
  function getBusinessDate(columnHeader, row) {
    if (csvData[row][columnHeader] !== '') {
      let year = new Date(csvData[row][columnHeader]).getFullYear();
      if (yearCount[columnHeader] !== '') {
        if (year > 2008) {
          if (yearCount[columnHeader][year] !== undefined) {
            yearCount[columnHeader][year] += 1;
          } else {
            yearCount[columnHeader][year] = 1;
          }
        }
      }
    }
  }

  const trace1 = {
    x: Object.keys(yearCount['Business Start Date']),
    y: Object.values(yearCount['Business Start Date']),
    type: 'bar',
    marker: { color: 'rgb(115, 8, 255)' },
    name: 'Start Date',
  };

  const trace2 = {
    x: Object.keys(yearCount['Business End Date']),
    y: Object.values(yearCount['Business End Date']),
    type: 'bar',
    marker: {
      color: [
        'rgb(248, 179, 252)', // 2009
        'rgb(250, 158, 255)', // 2010
        'rgb(249, 145, 255', // 2011
        'rgb(248, 125, 255)', // 2012
        'rgb(242, 105, 250', // 2013
        'rgb(242, 105, 250', // 2014
        'rgb(238, 87, 247)', // 2015
        'rgb(237, 72, 247)', // 2016
        'rgb(236, 57, 247)', // 2017
        'rgb(208, 0, 255)', // 2018
        'rgb(212, 45, 250)', // 2019
        'rgb(237, 72, 247)', // 2020
        'rgb(248, 179, 252)', // 2021
      ],
      width: 100,
    },
    name: 'End Date',
  };

  const layout = {
    plot_bgcolor: 'black',
    paper_bgcolor: 'black',
    xaxis: {
      tickfont: {
        family: 'Poppins, serif',
        size: 14,
        color: 'white',
      },
    },
    yaxis: {
      title: 'Number of Businesses',
      titlefont: {
        family: 'Poppins, serif',
        size: 14,
        color: 'white',
      },
      tickfont: {
        family: 'Poppins, serif',
        size: 14,
        color: 'white',
      },
    },
    barmode: 'group',
    legend: {
      traceorder: 'normal',
      font: {
        family: 'Poppins, serif',
        size: 12,
        color: 'white',
      },
    },
  };
  const data = [trace1, trace2];

  Plotly.newPlot('bar', data, layout);

  // generate doughnut chart for neighborhood
  const NAICS_CODE_DESCRIPTION = 'NAICS Code Description';

  const businessTypes = {};

  for (let row = 0; row < csvData.length; row++) {
    let year = new Date(csvData[row]['Business End Date']).getFullYear();
    if (year === 2020) {
      // console.log(csvData[row]['NAICS Code Description']);

      const businessType = csvData[row][NAICS_CODE_DESCRIPTION];

      if (businessTypes[businessType] !== undefined) {
        businessTypes[businessType] += 1;
      } else {
        businessTypes[businessType] = 1;
      }
    }
  }

  businessTypes['Not Categorized'] = businessTypes[''];
  delete businessTypes[''];

  const totalBusinessesCount = Object.values(businessTypes).reduce(
    (prev, curr) => (prev += curr),
    0,
  );

  let myChart = document.getElementById('myChart').getContext('2d');
  Chart.defaults.global.defaultFontFamily = 'Poppins, serif';

  let naicsChart = new Chart(myChart, {
    type: 'doughnut',
    data: {
      labels: Object.keys(businessTypes),
      datasets: [
        {
          label: 'Business Type',
          data: Object.values(businessTypes),
          backgroundColor: [
            '#FFF1C9',
            '#F7B7A3',
            '#EA5F89',
            '#9B3192',
            '#57167E',
            '#2B0B3F',
            '#F66D44',
            '#FEAE65',
            '#E6F69D',
            '#AADEA7',
            '#64C2A6',
            '#2D87BB',
            '#FF00FE',
            '#EC6B56',
            '#FFC154',
            '#47B39C',
            '#FFEC21',
            '#378AFF',
            '#FFA32F',
            '#F54F52',
          ],
          borderWidth: 1,
          borderColor: 'white',
        },
      ],
    },
    options: {
      title: {
        display: true,
        fontSize: 25,
      },
      cutoutPercentage: 60,
      plugins: {
        doughnutlabel: {
          labels: [
            {
              text: 'hello',
              font: {
                size: 40,
                weight: 'bold',
                fontColor: 'white',
              },
              text: 'there',
            },
          ],
        },
      },
      legend: {
        display: 'false',
        position: 'right',
        labels: {
          fontColor: 'white',
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        },
      },
    },
  });
});

// ******************************************************************************
var value = d3.json('/busi_bar').then((response) => {
  var years = ['2010', '2012', '2014', '2016', '2018', '2020'];

  var dropdownMenu = d3.select('#selDataset').selectAll('option');
  dropdownMenu
    .data(years)
    .enter()
    .append('option')
    .property('value', (d) => d)

    .text((d) => d);
  optionChangedNAICS('2010');
});

function optionChangedNAICS(yearSelected) {
  const loader = document.querySelector('.loader');
  loader.style.visibility = 'visible';

  d3.json('/busi_bar').then((response) => {
    businesstype = [];
    businesscount = [];
    extra = [];

    for (var i = 0; i < response.length; i++) {
      if (response[i].locBusi_end_year === yearSelected) {
        businesstype.push(response[i].busi_type);
        businesscount.push(response[i].locbusi_end_count);
      } else {
        extra.push(response[i].locbusi_end_count);
      }
    }

    var trace4 = {
      x: businesstype,
      y: businesscount,
      type: 'bar',
      marker: { color: '#d62728' },
    };

    var data = [trace4];

    const layout = {
      plot_bgcolor: 'black',
      paper_bgcolor: 'black',
      xaxis: {
        tickfont: {
          family: 'Poppins, serif',
          size: 14,
          color: 'white',
        },
        automargin: true,
      },
      yaxis: {
        title: 'Number of Businesses',
        titlefont: {
          family: 'Poppins, serif',
          size: 14,
          color: 'white',
        },
        tickfont: {
          family: 'Poppins, serif',
          size: 14,
          color: 'white',
        },
      },
    };

    Plotly.newPlot('bar2', data, layout);

    loader.style.visibility = 'hidden';
  });
}

//******************************************************* */
var neighborValue = d3.json('/neigh_bar').then((response) => {
  years2 = ['2010', '2012', '2014', '2016', '2018', '2020'];

  var dropdownMenu = d3.select('#selDataset2').selectAll('option');
  dropdownMenu
    .data(years2)
    .enter()
    .append('option')
    .property('neighborValue', (d) => d)
    .text((d) => d);

  optionChanged('2010');
});

function optionChanged(year) {
  console.log(typeof year);

  const loader2 = document.querySelector('.loader2');
  loader2.style.visibility = 'visible';

  d3.json('/neigh_bar').then((response) => {
    // console.log(response);

    neighBor = [];
    countNeigh = [];
    extra1 = [];

    for (var i = 0; i < response.length; i++) {
      if (response[i].busi_start_year === year) {
        neighBor.push(response[i].neighborhood);
        countNeigh.push(response[i].busi_count);
      } else {
        extra1.push(response[i].busi_count);
      }
    }

    var trace3 = {
      x: neighBor,
      y: countNeigh,
      type: 'bar',
      marker: { color: '#33ffe6' },
    };

    var data3 = [trace3];

    const layout3 = {
      plot_bgcolor: 'black',
      paper_bgcolor: 'black',
      xaxis: {
        tickfont: {
          family: 'Poppins, serif',
          size: 14,
          color: 'white',
        },
        automargin: true,
      },
      yaxis: {
        title: 'Number of Businesses',
        titlefont: {
          family: 'Poppins, serif',
          size: 14,
          color: 'white',
        },
        tickfont: {
          family: 'Poppins, serif',
          size: 14,
          color: 'white',
        },
      },
    };

    Plotly.newPlot('bar3', data3, layout3);

    loader2.style.visibility = 'hidden';
  });
}

// scatterplot
var svgWidth = 1200;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100,
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select('#bar4')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

// append background
svg
  .append('rect')
  .attr('width', '100%')
  .attr('height', '100%')
  .attr('fill', 'black');

// Append an SVG group
var chartGroup = svg
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

var chosenYAxis = 'loc_end_count';

// function used for updating y-scale var upon click on axis label
function yScale(Data, chosenYAxis) {
  // create scales
  var yLinearScale = d3
    .scaleLinear()
    .domain([
      d3.min(Data, (d) => d[chosenYAxis]) * 0.8,
      d3.max(Data, (d) => d[chosenYAxis]) * 1.2,
    ])
    .range([height, 0]);

  return yLinearScale;
}

// function used for updating yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition().duration(1000).call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderYCircles(circlesGroup, newYScale, chosenYAxis) {
  circlesGroup
    .transition()
    .duration(1000)
    .attr('cy', (d) => newYScale(d[chosenYAxis]));
  return circlesGroup;
}

// function used for updating circles text group with a transition to
// new circles
function renderYText(circlesTextGroup, newYScale, chosenYAxis) {
  circlesTextGroup
    .transition()
    .duration(1000)
    .attr('dy', (d) => newYScale(d[chosenYAxis]))
    .attr('text-anchor', 'middle');
  return circlesTextGroup;
}
// function used for updating circles group with new tooltip
function updateToolTip(chosenYAxis, circlesGroup, circlesTextGroup) {
  var ylabel;

  if (chosenYAxis === 'loc_end_count') {
    ylabel = 'No. of location closed:';
  } else {
    ylabel = 'No. of locations opened:';
  }

  //Initialize tool-tip
  var toolTip = d3
    .tip()
    .attr('class', 'tooltip d3-tip')
    .offset([80, -60])
    .html(function (d) {
      return `<strong>${ylabel} ${d[chosenYAxis]}</strong>`;
    });

  //Create circles tool-tip in chart
  circlesGroup.call(toolTip);

  //Create event listeners to display or hide circles tool-tip
  circlesGroup
    .on('mouseover', function (data) {
      toolTip.show(data, this);
    })
    // onmouseout event
    .on('mouseout', function (data, index) {
      toolTip.hide(data);
    });

  //Create text inside circles tool-tip in chart
  circlesTextGroup.call(toolTip);

  //Create event listeners to display or hide text tool-tip
  circlesTextGroup
    .on('mouseover', function (data, index) {
      toolTip.show(data, this);
    })
    //onmouseout event
    .on('mouseout', function (data) {
      toolTip.hide(data);
    });
  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.json('/scatterPlot')
  .then(function (Data, err) {
    if (err) throw err;

    var parseDate = d3.timeParse('%Y');
    Data.forEach(function (data) {
      data.loc_end_count = data.loc_end_count;
      data.loc_start_count = data.loc_start_count;
      data.year = parseDate(data.year);
    });

    // create scales
    var xTimeScale = d3
      .scaleTime()
      .domain(d3.extent(Data, (d) => d.year))
      .range([0, width]);

    // Create y scale function
    var yLinearScale = d3.scaleLinear().domain([200, 28000]).range([height, 0]);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xTimeScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var circlesTextGroup = chartGroup
      .selectAll('text')
      .data(Data)
      .enter()
      .append('text')
      .text((d) => new Date(d.year).getFullYear())
      .attr('dx', (d) => xTimeScale(d.year))
      .attr('dy', (d) => yLinearScale(d[chosenYAxis] * 0.98))
      .attr('class', 'stateText');

    // append x axis
    var xAxis = chartGroup
      .append('g')
      .classed('x-axis', true)
      .attr('transform', `translate(0, ${height})`)
      .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append('g').classed('y-axis', true).call(leftAxis);

    // append initial circles
    var circlesGroup = chartGroup
      .selectAll('circle')
      .data(Data)
      .enter()
      .append('circle')
      .attr('cx', (d) => xTimeScale(d.year))
      .attr('cy', (d) => yLinearScale(d[chosenYAxis]))
      .attr('r', 20)
      .attr('fill', 'pink')
      .attr('opacity', '.3');

    chartGroup
      .append('text')
      .attr('transform', `translate(${width / 2}, ${height})`)
      .attr('x', 0)
      .attr('y', 40)
      .classed('active', true)
      .text('Year');

    // Create group for three y-axis labels
    var ylabelsGroup = chartGroup.append('g');

    var endLabel = ylabelsGroup
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left + 20)
      .attr('x', 0 - height / 2)
      .attr('value', 'loc_end_count')
      .attr('dy', '1em')
      .text('No. of Locations Closed')
      .classed('inactive', true);

    var startLabel = ylabelsGroup
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('value', 'loc_start_count')
      .attr('dy', '1em')
      .text('No. of Locations Opened')
      .classed('inactive', true);

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(
      chosenYAxis,
      circlesGroup,
      circlesTextGroup,
    );

    //y axis labels event listener
    ylabelsGroup.selectAll('text').on('click', function () {
      // get value of selection
      var value = d3.select(this).attr('value');
      if (value !== chosenYAxis) {
        // replaces chosenYAxis with value
        chosenYAxis = value;

        // updates y scale for new data
        yLinearScale = yScale(Data, chosenYAxis);

        // updates y axis with transition
        yAxis = renderYAxes(yLinearScale, yAxis);

        // updates circles with new y values
        circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

        // updates circles text with new y values
        circlesTextGroup = renderYText(
          circlesTextGroup,
          yLinearScale,
          chosenYAxis,
        );

        // updates tooltips with new info
        circlesGroup = updateToolTip(
          chosenYAxis,
          circlesGroup,
          circlesTextGroup,
        );

        // changes classes to change bold text
        if (chosenYAxis === 'loc_start_count') {
          startLabel.classed('active', true).classed('inactive', false);
          endLabel.classed('active', false).classed('inactive', true);
        } else {
          endLabel.classed('active', true).classed('inactive', false);
          startLabel.classed('active', false).classed('inactive', true);
        }
      }
    });
  })
  .catch(function (error) {
    console.log(error);
  });
