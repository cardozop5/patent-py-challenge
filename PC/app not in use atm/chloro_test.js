Plotly.d3.csv('https://raw.githubusercontent.com/cardozop5/getting-started/master/Top_Org_in_US_WPatent.csv', function (err, rows) {
  function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; });
  }

  var data = [{
    type: "scattermapbox",
    lon: unpack(rows, 'assignee_lastknown_longitude'),
    lat: unpack(rows, 'assignee_lastknown_latitude'),
    
  },
  {
    type: "choroplethmapbox", text: unpack(rows, 'assignee_organization'), geojson: "https://raw.githubusercontent.com/cardozop5/getting-started/master/us-states.json", locations: unpack(rows, 'assignee_lastknown_state'),
    z: unpack(rows, 'assignee_total_num_patents'),
    zmin: 0, zmax: 131150, colorbar: { y: 0, yanchor: "bottom", title: { text: "US states", side: "right" },
    marker: {
      color: unpack(rows, 'assignee_organization'),
      size: 3.5, colorscale: 'BLUE',
      text: unpack(rows, 'assignee_total_num_patents')
    } }
  }
  ];

  console.log(data.locations);
  var layout = { mapbox: { style: "dark", center: { lon: -110, lat: 50 }, zoom: 2.8 }, width: 1400, height: 1000, margin: { t: 0, b: 0 } };

  Plotly.setPlotConfig({ mapboxAccessToken: 'pk.eyJ1IjoiY2FyZG96b3A1IiwiYSI6ImNrMGI0cHBtejBxcGQzbXBsbnVtdmtuNjEifQ.tRGaVR-Cp7xjCL8uIOD6hQ' });

  Plotly.newPlot('graph', data, layout)
});