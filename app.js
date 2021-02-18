d3.csv('data.csv').then(importedData => {

  let yearCount = {}

  for (let row = 0; row < importedData.length; row++) {
    if (importedData[row]["Business End Date"] !== "") {
      let year = importedData[row]["Business End Date"].split('/')[2]
      //for (let i = 0; i < years.length; i++) {
        //const year = years[i][2];
        console.log(year)
        if (yearCount[year] !== undefined) {
          yearCount[year] += 1
        } else {
          yearCount[year] = 1
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

  console.log(Object.keys(yearCount))
})

