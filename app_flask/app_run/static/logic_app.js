// Store our API endpoint inside queryUrl
var parseTime = d3.timeParse("%Y-%m-%d");

d3.json("/original_data").then(response => {
   
  console.log(response);

//   // var chooseYear = response.filter(x=>x.busistart_year === '2010');
//   var count = response.busi_count;
//   console.log(count)
//   var busitype = response.busi_type;
//   console.log(busitype)


//   console.log(response);
//   console.log(response[1].busi_start_year);
//  console.log(response[1].busi_type);
//  console.log(response[1].busi_count);

//   businesstype = [];
//   businesscount= [];
//   extra = []

//  for (var i=0; len = response.length, i<len; i++){
//    if (response[i].busi_start_year === '2010'){
//      console.log('greater')
//      businesstype.push(response[i].busi_type);
//      businesscount.push(response[i].busi_count);}
//     else {extra.push(response[i].busi_count);}

//     console.log(businesstype);
//     console.log(businesscount);

    
  
  


//   var trace1 = {
//    x: businesstype,
//    y: businesscount,
//    type: "bar"
//  };
 
//  var data = [trace1];
 
//  var layout = {
//    title: "'Bar' Chart"
//  };
 
//  Plotly.newPlot("map", data, layout);

   
//   }
// Create an array of music provider labels
// var labels = Object.keys(data.us);

   // console.log(response);
   // console.log(response[111].busi_end_dt);
   // console.log(response[101].latitude)
//    console.log(response);
//    console.log("business_name", response[1].business_name)
//    console.log("busi_start_dt", response[1].busi_start_dt)
//    console.log("busi_end_dt", response[1].busi_end_dt)
   
//    if (response[1].busi_end_dt===""){
//      console.log("busi_end_dt IS EMPTY")
//      newDate="UNKNOWN"
//      var year = "UNKNOWN"
//    }else{
//      newDate=parseTime(response[1].busi_end_dt)
//      var year =  new Date(response[1].busi_end_dt).getFullYear()
//    }
//    console.log(newDate)
//    console.log(year)

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
