// Creating map object

var myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 11
});
console.log("Hello");
// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


// Use this link to get the geojson data.
var link = "Analysis_Neighborhoods.geojson";
var url = "https://data.sfgov.org/resource/g8m3-pdis.json"

// coloring of neighborhoods
function chooseColor(nhood){
  switch (nhood) {
    case "Bayview Hunters Point":
      return "green";
      case "Bernal Heights":
        return "green";
        case "Castro/Upper Market":
          return "green";
          case "Chinatown":
            return "green";
            case "Excelsior":
              return "green";
              case "Financial District/South Beach":
                return "green";
                case "Glen Park":
                  return "green";
                  case "Inner Richmond":
                    return "green";
                    case "Golden Gate Park":
                      return "green";
                      case "Haight Ashbury":
                        return "green";
                        case "Hayes Valley":
                          return "green";
                          case "Inner Sunset":
                            return "green";
                            case "Japantown":
                              return "green";
                              case "McLaren Park":
                                return "green";
                                case "Tenderloin":
                                  return "green";
                                  case "Lakeshore":
                                    return "green";
                                    case "Lincoln Park":
                                      return "green";
                                      case "Lone Mountain/USF":
                                        return "green";
                                        case "Marina":
                                          return "green";
                                          case "Russian Hill":
                                            return "green";
                                            case "Mission":
                                              return "green";
                                              case "Mission Bay":
                                                return "green";
                                                case "Nob Hill":
                                                  return "green";
                                                  case "Seacliff":
                                                    return "green";
                                                    case "Noe Valley":
                                                      return "green";
                                                      case "North Beach":
                                                        return "green";
                                                        case "Oceanview/Merced/Ingleside":
                                                          return "green";
                                                          case "South of Market":
                                                            return "green";
                                                            case "Sunset/Parkside":
                                                              return "green";
                                                              case "Outer Mission":
                                                                return "green";
                                                                case "Outer Richmond":
                                                                  return "green";
                                                                  case "Pacific Heights":
                                                                    return "green";
                                                                    case "Portola":
                                                                      return "green";
                                                                      case "Potrero Hill":
                                                                        return "green";
                                                                        case "Presidio":
                                                                          return "green";
                                                                          case "Presidio Heights":
                                                                            return "green";
                                                                            case "Treasure Island":
                                                                              return "green";
                                                                              case "Twin Peaks":
                                                                                return "green";
                                                                                case "Visitacion Valley":
                                                                                  return "green";
                                                                                  case "West of Twin Peaks":
                                                                                    return "green";
                                                                                    case "Western Addition":
                                                                                      return "green";
                                                                                                                                                                                                      
  }
}
// Grabbing our GeoJSON data..
d3.json(link, function(data) {
 // Creating a geoJSON layer with the retrieved data
 L.geoJson(data, {
  // Style each feature (in this case a neighborhood)
  style: function(feature) {
    return {
      color: "white",
      // Call the chooseColor function to decide which color to color our neighborhood (color based on nhood)
      fillColor: chooseColor(feature.properties.nhood),
      fillOpacity: 0.5,
      weight: 1.5
    };
  },
  // Called on each feature
  onEachFeature: function(feature, layer) {
    // Set mouse events to change map styling
    layer.on({
      // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
      mouseover: function(event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity: 0.9
        });
      },
      // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
      mouseout: function(event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity: 0.5
        });
      },
      // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
      click: function(event) {
        myMap.fitBounds(event.target.getBounds());
      }
    });
    // Giving each feature a pop-up with information pertinent to it
    layer.bindPopup("<h1>" + feature.properties.nhood + "</h1>");

  }
}).addTo(myMap);
});

d3.json(url, function(response) {

  console.log(response);
  var markers = L.markerClusterGroup();
  response.forEach(element => {
    var location = element.location;
console.log(location);
    // Check for location property
    if (location) {
      console.log("Hey, it works!");
      // Add a new marker to the cluster group and bind a pop-up
   
    markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
    .bindPopup("<h1>" + element.dba_name + "</h1> <hr> <h3>Neighborhood: " + element.neighborhoods_analysis_boundaries + "</h3>")).addTo(myMap) ;
}

  // for (var i = 0; i < 50; i++) {
  //   var flags = response[i]
  //   console.log(flags.location.coordinates);
  //   var new_coord = [flags.location.coordinates[1], flags.location.coordinates[0]]
     
  

  //   L.markerClusterGroup(new_coord)
      // .bindPopup("<h1>" + response[i].dba_name + "</h1> <hr> <h3>Neighborhood: " + response[i].neighborhoods_analysis_boundaries + "</h3>")
      // .addTo(myMap);
  // }

});


  //   // Creating a GeoJSON layer with the retrieved data
//   console.log(data);
//   L.geoJson(data).addTo(myMap);
// });
});