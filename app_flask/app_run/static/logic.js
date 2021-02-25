// Creating map object
// Tile Layer
var lightmap = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'light-v10',
    accessToken: API_KEY,
  },
);
var layers = {
  Business_Registered: new L.LayerGroup(),
  Business_UnRegistered: new L.LayerGroup(),
  Business_Moved_Location: new L.LayerGroup(),
};

console.log(layers);
// Map with layers
var myMap = L.map('map-id', {
  center: [37.7749, -122.4194],
  zoom: 11,
  layers: [
    layers.Business_Registered,
    layers.Business_UnRegistered,
    layers.Business_Moved_Location,
  ],
});

// Lightmap addition to Tile Layer
lightmap.addTo(myMap);

//Overlay Object
var overlays = {
  'Registered Businesses': layers.Business_Registered,
  'UnRegistered Businesses': layers.Business_UnRegistered,
  'Moved Business Location': layers.Business_Moved_Location,
};
// Layer Control
L.control.layers(null, overlays).addTo(myMap);

// Legend creation
var info = L.control({
  position: 'bottomright',
});
info.onAdd = function () {
  var div = L.DomUtil.create('div', 'legend');
  return div;
};
info.addTo(myMap);

var icons = {
  Business_Registered: L.ExtraMarkers.icon({
    icon: 'ion-minus-circled',
    inconColor: 'white',
    markerColor: 'blue',
    shape: 'circle',
  }),
  Business_UnRegistered: L.ExtraMarkers.icon({
    icon: 'ion-minus-circled',
    inconColor: 'white',
    iconMarker: 'red',
    shape: 'circle',
  }),
  Business_Moved_Location: L.ExtraMarkers.icon({
    icon: 'ion-minus-circled',
    inconColor: 'white',
    markerColor: 'yellow',
    shape: 'circle',
  }),
};
console.log(icons);
//API Call
d3.json('https://data.sfgov.org/resource/g8m3-pdis.json', function (RegBus) {
  //   var jsonUrl = RegBus.element;
  // console.log(RegBus);
  // console.log(jsonUrl);
  // Object to keep markers in layer
  var businessCount = {
    Business_Registered: 0,
    Business_UnRegistered: 0,
    Business_Moved_Location: 0,
  };

  var layerKey;

  // Loop Registered Businesses
  for (var i = 0; i < 75000; i++) {
    var BusinessRegistered = Object.assign({}, RegBus[i]);
    var element = RegBus[i];
    console.log(element);

    // if (element===undefined || element===null){continue;}
    // if ((!element.dba_end_date || element.dba_end_date===undefined) && (!element.location_end_date || element.location_end_date===undefined)){ //how do I add dba_name & not have location & business end
    //   layerKey = "Business_Registered";
    // }
    // else if (element.location_end_date && (!element.dba_end_date || element.dba_end_date===undefined)) {
    //   layerKey = "Business_Moved_Location"; //how do I add location and and not include business end date
    // }
    // else if (element.dba_end_date) {
    //   layerKey = "Business_UnRegistered";
    // }
    // else if (element.dba_name)
    if (
      element.location_end_date &&
      (!element.dba_end_date || element.dba_end_date === undefined)
    ) {
      layerKey = 'Business_Moved_Location'; //how do I add location and and not include business end date
    } else if (element.dba_end_date) {
      layerKey = 'Business_UnRegistered';
    } else {
      layerKey = 'Business_Registered';
    }

    //Business Count Updated
    businessCount[layerKey]++;

    // Marker matching Icons
    var newMarker = L.marker(
      [element.location.coordinates[1], element.location.coordinates[0]],
      {
        icon: icons[layerKey],
      },
    );
    newMarker.addTo(layers[layerKey]);
    newMarker.bindPopup(
      '<h1>' +
        element.dba_name +
        '</h1> <hr> <h3>Neighborhood: ' +
        element.neighborhoods_analysis_boundaries +
        '</h3>',
    );
  }
});

// // neighborhood boundaires
// var link = "Analysis_Neighborhoods.geojson";
// // coloring of neighborhoods
// function chooseColor(nhood) {
//   switch (nhood) {
//     case "Bayview Hunters Point":
//       return "green";
//     case "Bernal Heights":
//       return "green";
//     case "Castro/Upper Market":
//       return "green";
//     case "Chinatown":
//       return "green";
//     case "Excelsior":
//       return "green";
//     case "Financial District/South Beach":
//       return "green";
//     case "Glen Park":
//       return "green";
//     case "Inner Richmond":
//       return "green";
//     case "Golden Gate Park":
//       return "green";
//     case "Haight Ashbury":
//       return "green";
//     case "Hayes Valley":
//       return "green";
//     case "Inner Sunset":
//       return "green";
//     case "Japantown":
//       return "green";
//     case "McLaren Park":
//       return "green";
//     case "Tenderloin":
//       return "green";
//     case "Lakeshore":
//       return "green";
//     case "Lincoln Park":
//       return "green";
//     case "Lone Mountain/USF":
//       return "green";
//     case "Marina":
//       return "green";
//     case "Russian Hill":
//       return "green";
//     case "Mission":
//       return "green";
//     case "Mission Bay":
//       return "green";
//     case "Nob Hill":
//       return "green";
//     case "Seacliff":
//       return "green";
//     case "Noe Valley":
//       return "green";
//     case "North Beach":
//       return "green";
//     case "Oceanview/Merced/Ingleside":
//       return "green";
//     case "South of Market":
//       return "green";
//     case "Sunset/Parkside":
//       return "green";
//     case "Outer Mission":
//       return "green";
//     case "Outer Richmond":
//       return "green";
//     case "Pacific Heights":
//       return "green";
//     case "Portola":
//       return "green";
//     case "Potrero Hill":
//       return "green";
//     case "Presidio":
//       return "green";
//     case "Presidio Heights":
//       return "green";
//     case "Treasure Island":
//       return "green";
//     case "Twin Peaks":
//       return "green";
//     case "Visitacion Valley":
//       return "green";
//     case "West of Twin Peaks":
//       return "green";
//     case "Western Addition":
//       return "green";

//   }
// }
// // Grabbing our GeoJSON data..
// d3.json(link, function(data) {
//  // Creating a geoJSON layer with the retrieved data
//  L.geoJson(data, {
//   // Style each feature (in this case a neighborhood)
//   style: function(feature) {
//     return {
//       color: "white",
//       // Call the chooseColor function to decide which color to color our neighborhood (color based on nhood)
//       fillColor: chooseColor(feature.properties.nhood),
//       fillOpacity: 0.5,
//       weight: 1.5
//     };
//   },
//   // Called on each feature
//   onEachFeature: function(feature, layer) {
//     // Set mouse events to change map styling
//     layer.on({
//       // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
//       mouseover: function(event) {
//         layer = event.target;
//         layer.setStyle({
//           fillOpacity: 0.9
//         });
//       },
//       // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
//       mouseout: function(event) {
//         layer = event.target;
//         layer.setStyle({
//           fillOpacity: 0.5
//         });
//       },
//       // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
//       click: function(event) {
//         myMap.fitBounds(event.target.getBounds());
//       }
//     });
//     // Giving each feature a pop-up with information pertinent to it
//     layer.bindPopup("<h1>" + feature.properties.nhood + "</h1>");

//   }
// }).addTo(myMap);
// });

// console.log("SF Coordinates");

// // Use this link to get the geojson data.
// var link = "Registered_Business_Location_SanFrancisco.geojson";
// d3.geojson(url, function(response) {

//   console.log(response);
//   var markers = L.markerClusterGroup();
//   response.forEach(element => {
//     var location = element.location;
// console.log(location);
//     // Check for location property
//     if (location) {
//       console.log("Hey, it works!");
//       // Add a new marker to the cluster group and bind a pop-up

//     markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//     .bindPopup("<h1>" + element.dba_name + "</h1> <hr> <h3>Neighborhood: " + element.neighborhoods_analysis_boundaries + "</h3>")).addTo(myMap) ;
// }

// });

// });
