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

var value = d3.json('/busi_bar').then((response) => {
  var years = [
    '2010',
    '2012',
    '2014',
    '2016',
    '2018',
    '2020',
  ];

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
      marker:{color:'#d62728'}

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
  years2 = [
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
  ];

  var dropdownMenu = d3.select('#selDataset2').selectAll('option');
  dropdownMenu
    .data(years2)
    .enter()
    .append('option')
    .property('neighborValue', (d) => d)
    .text((d) => d);

  optionChanged('2010');
});

function optionChanged(year2) {
<<<<<<< HEAD
  // console.log(typeof year2);
=======
  const loader2 = document.querySelector('.loader2');
  loader2.style.visibility = 'visible';

>>>>>>> 4291505174ec32678b74607f5e41b0c0b2bb790b
  d3.json('/neigh_bar').then((response) => {
    // console.log(response);

    neighBor = [];
    countNeigh = [];
    extra1 = [];

    for (var i = 0; i < response.length; i++) {
      if (response[i].busi_start_year === year2) {
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
