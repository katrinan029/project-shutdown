d3.csv('../flask_app/sfdata.csv').then(importedData => {


  let yearCount = {}

  for (let row = 0; row < importedData.length; row++) {
    if (importedData[row]["Business End Date"] !== "") {
      let year = importedData[row]["Business End Date"].split('/')[2]
        if (year > 2010) {
          if (yearCount[year] !== undefined) {
            yearCount[year] += 1
          } else {
            yearCount[year] = 1
          }
        }
      //}
    } 
  }

  var data = [
    {
      x: Object.keys(yearCount),
      y: Object.values(yearCount),
      type: 'bar'
    }
  ];
  
  Plotly.newPlot('bar', data);

  console.log(yearCount)
})

