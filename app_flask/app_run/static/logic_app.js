// Store our API endpoint inside queryUrl
d3.json("/get_data").then(response => {
   console.log(response);

var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 11
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
      for (var i = 0; i < 50; i++) {
        var new_coord = [response[i].latitude, response[i].longitude]
        
        L.marker(new_coord)
          .bindPopup("<h1>" + response[i].business_name + "</h1>")
          .addTo(myMap);
      }
});

