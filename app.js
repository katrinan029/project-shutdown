d3.csv('../flask_app/sfdata.csv').then(importedData => {


  let yearCount = {}
  yearCount["Business End Date"] = []
  yearCount["Business Start Date"] = []

  for (let row = 0; row < importedData.length; row++) {
    if (importedData[row]["Business End Date"] !== "") {
      let year = importedData[row]["Business End Date"].split('/')[2]
      if (yearCount["Business End Date"] !== "") {
        if (year > 2008) {
          if (yearCount["Business End Date"][year] !== undefined) {
            yearCount["Business End Date"][year] += 1
          } else {
            yearCount["Business End Date"][year] = 1
          }
        }
      }
    } 
  }

  const trace1 = {
    x: Object.keys(yearCount["Business End Date"]),
    y: Object.values(yearCount["Business End Date"]),
    type: 'bar',
    marker: {color: [
      'rgb(248, 179, 252)', // 2009
      'rgb(250, 158, 255)', // 2010
      'rgb(249, 145, 255', // 2011
      'rgb(248, 125, 255)', // 2012
      'rgb(242, 105, 250', // 2013
      'rgb(242, 105, 250', // 2014
      'rgb(238, 87, 247)', // 2015
      'rgb(237, 72, 247)', // 2016
      'rgb(236, 57, 247)', // 2017
      'rgb(208, 0, 255', // 2018
      'rgb(212, 45, 250)', // 2019
      'rgb(237, 72, 247)', // 2020
      'rgb(248, 179, 252)', // 2021

      ]
    },
  };

  const layout = {
    plot_bgcolor:"black",
    paper_bgcolor:"black",
    xaxis: {
      tickfont: {
        family: 'Poppins, serif',
        size: 14,
        color: 'white'
      }},
    yaxis: {
      title: 'Number of Businesses',
      titlefont: {
        family: 'Poppins, serif',
        size: 14,
        color: 'white'
    },
      tickfont: {
        family: 'Poppins, serif',
        size: 14,
        color: 'white'

      }
    },
    cornerroundness: 
      { "bottomleft": 0, "bottomright": 0, "topleft": 1, "topright": 1 }
  }
  const data = [trace1];
  
  Plotly.newPlot('bar', data, layout);

  console.log(yearCount)
})

