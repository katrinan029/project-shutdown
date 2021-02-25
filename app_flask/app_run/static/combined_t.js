var value = d3.json("/combined_data").then(jsonData => {
    // console.log(jsonData);
  
    
    var neighBorHood= [];
    var extra2 = [];

    

   for (var i=0; len = jsonData.length, i<len; i++){
       var item = jsonData[i].neighborhood
        if(neighBorHood.indexOf(item) !== -1){
            neighBorHood.push(item)
        } else{
            extra2.push(item)
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
  
  function optionChanged(selected){
  

d3.json("/combined_data").then(response => {
   
    console.log('combined_t data');

  businesstype = [];
  businesscount= [];
  extra = []

 for (var i=0; len = response.length, i<len; i++){
  // var selectedYear = response[i].busi_start_year === year;

   if (response[i].neighborhood === selected){
     businesstype.push(response[i].busi_type);
     businesscount.push(response[i].busi_count);}
    else {extra.push(response[i].busi_count);}
   };
    // console.log(businesstype);
    // console.log(businesscount);
  
  var trace1 = {
   x: businesstype,
   y: businesscount,
   type: "bar"
 };
 
 var data = [trace1];
 
 var layout = {
   title: "Business Types Chart for a selected neighborhood",
   xaxis: { title: "Business Types"},
  yaxis: { title: "No. of Businesses"}
 };
 
 Plotly.newPlot("bar", data, layout);

  
});
  };