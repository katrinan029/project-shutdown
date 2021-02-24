// Store our API endpoint inside queryUrl
// d3.json("/get_data").then(response => {
   
//   // console.log(response);
// });

d3.json("/busi_bar").then(response => {
   
    // console.log(response);

  businesstype = [];
  businesscount= [];
  extra = []

 for (var i=0; len = response.length, i<len; i++){
   if (response[i].busi_start_year === '2010'){
     businesstype.push(response[i].busi_type);
     businesscount.push(response[i].busi_count);}
    else {extra.push(response[i].busi_count);}

    // console.log(businesstype);
    // console.log(businesscount);
  
  var trace1 = {
   x: businesstype,
   y: businesscount,
   type: "bar"
 };
 
 var data = [trace1];
 
 var layout = {
   title: "Business Type Chart"
 };
 
 Plotly.newPlot("bar", data, layout);

  }
});
//******************************************************* */

d3.json("/neigh_bar").then(response => {
   
    // console.log(response);

  neighBor = [];
  countNeigh= [];
  extra1 = []

 for (var i=0; len = response.length, i<len; i++){
   if (response[i].busi_start_year === '2010'){
     neighBor.push(response[i].neighborhood);
     countNeigh.push(response[i].busi_count);}
    else {extra1.push(response[i].busi_count);}

    // console.log(neighBor);
    // console.log(countNeigh);
  
  var trace2 = {
   x: neighBor,
   y: countNeigh,
   type: "bar"
 };
 
 var data1 = [trace2];
 
 var layout1 = {
   title: "Neighborhood Chart"
 };
 
 Plotly.newPlot("bubble", data1, layout1);
  }

// var myMap = L.map("map", {
//     center: [37.7749, -122.4194],
//     zoom: 11
//   });
  
//   // Adding tile layer
//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   }).addTo(myMap);
  
//       for (var i = 0; i < 10; i++) {
//         var new_coord = [response[i].latitude, response[i].longitude]
        
//         L.marker(new_coord)
//           .bindPopup("<h1>" + response[i].business_name + "</h1>")
//           .addTo(myMap);
//       }

});

