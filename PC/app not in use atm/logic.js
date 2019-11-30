// Creating map object
var myMap = L.map("map", {
  center: [30.0797, -95.4169],
  zoom: 8
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data

var baseURL = 'http://www.patentsview.org/api/assignees/query?';
var que = 'q={"_and":[{"assignee_lastknown_country":"US"},{"_gte":{"patent_date":"2015-01-01"}}]}';
var fue = 'f=["assignee_organization","assignee_lastknown_state","assignee_lastknown_latitude","assignee_lastknown_longitude","assignee_total_num_patents"]';
var oue = 'o={"per_page":20}';
var sue = 's=[{"assignee_total_num_patents":"desc"}]'


var url = baseURL + que + fue + oue + sue;
console.log(url)
var geojson;
url = 'http://www.patentsview.org/api/assignees/query?q={"_and":[{"assignee_lastknown_country":"US"},{"_gte":{"patent_date":"2015-01-01"}}]}&f=["assignee_organization","assignee_lastknown_state","assignee_lastknown_latitude","assignee_lastknown_longitude","assignee_total_num_patents"]&o={"per_page":20}&s=[{"assignee_total_num_patents":"desc"}]'

d3.json(url, function (response) {



  //  d3.json('http://www.patentsview.org/api/assignees/query?q={"_and":[{"assignee_lastknown_state":"TX"},{"_gte":{"patent_date":"2015-01-01"}}]}&f=["assignee_organization","assignee_lastknown_state","assignee_lastknown_latitude","assignee_lastknown_longitude","assignee_total_num_patents"]&o={"per_page":20}&s=[{"assignee_total_num_patents":"desc"}]', function ({ assignees }) {
  // Grab data with d3
  // d3.json(geoData, function (assignees) {
  // console.log(assignees.features);

  // Create a new choropleth layer
  geojson = L.choropleth(response, {

    // Define what  property in the features to use
    valueProperty: "assignee_total_num_patents",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function (feature, layer) {
      layer.bindPopup("assignee_organization: " + feature.properties.assignee_organization + "<br>assignee_total_num_patents:<br>" +
        "$" + feature.properties.assignee_total_num_patents);
    }
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Total Patent</h1>" +
      "<div class=\"labels\">" +
      "<div class=\"min\">" + limits[0] + "</div>" +
      "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function (limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

  d3.json(url, function (response) {

    // Create a new marker cluster group
    var markers = L.markerClusterGroup();

    // Loop through data
    for (var i = 0; i < response.length; i++) {

      // Set the data location property to a variable
      var location = response[i].location;

      // Check for location property
      if (location) {

        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
          .bindPopup(response[i].descriptor));
      }

    }

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  });

});
