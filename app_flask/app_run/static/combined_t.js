var value = d3.json("/combined_data").then(jsonData => {
    // console.log(jsonData);
  
    
    neighBorHood= [];
    // extra2 = [];

    

   for (var i=0; len = jsonData.length, i<len; i++){
    if (jsonData[i].neighborhood) not in neighBorHood{
    
    neighBorHood.append(item)
    }
}
        var dropdownMenu = d3.select('#selDataset').selectAll('option');
        dropdownMenu
            .data(neighBorHood)
            .enter()
            .append('option')
            .property('value', d=>d)
  
            .text(d=>d)   
    optionChanged(neighBorHood); 
     
  });
  
  function optionChanged(year){
  

d3.json("/combined_data").then(response => {
   
    console.log(response);

//   businesstype = [];
//   businesscount= [];
//   extra = []

//  for (var i=0; len = response.length, i<len; i++){
//   // var selectedYear = response[i].busi_start_year === year;

//    if (response[i].busi_start_year === year){
//      businesstype.push(response[i].busi_type);
//      businesscount.push(response[i].busi_count);}
//     else {extra.push(response[i].busi_count);}
//    };
//     // console.log(businesstype);
//     // console.log(businesscount);
  
//   var trace1 = {
//    x: businesstype,
//    y: businesscount,
//    type: "bar"
//  };
 
//  var data = [trace1];
 
//  var layout = {
//    title: "Business Types Chart for a selected location start year",
//    xaxis: { title: "Business Types"},
//   yaxis: { title: "No. of Businesses"}
//  };
 
//  Plotly.newPlot("bar", data, layout);

  
});
  };