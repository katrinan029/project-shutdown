// Store our API endpoint inside queryUrl
var parseTime = d3.timeParse("%Y-%m-%d");

d3.json("/get_data").then(response => {
   console.log(response);

   for (var i=0;  i<21; i++){
  //  var startDate=parseTime(response[i].busi_start_dt)

   var businessStartDate = new Date (response[i].busi_start_dt).getFullYear()
   console.log(businessStartDate)
   }

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

