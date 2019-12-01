Plotly.d3.csv('https://raw.githubusercontent.com/cardozop5/getting-started/master/Top_Org_in_US_WPatent.csv', function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }
    var cityName = unpack(rows, 'assignee_lastknown_city'),
        Organization = unpack(rows, 'assignee_organization'),
        cityNo_Patent = unpack(rows, 'assignee_total_num_patents'),
        cityLat = unpack(rows, 'assignee_lastknown_latitude'),
        cityLon = unpack(rows, 'assignee_lastknown_longitude'),
        color = [, "rgb(255,65,54)", "rgb(133,20,75)", "rgb(255,133,27)", "lightgrey"],
        citySize = [],
        hoverText = [],
        scale = 50000;

    for (var i = 0; i < cityNo_Patent.length; i++) {
        var currentSize = cityNo_Patent[i] / scale;
        var currentText = "<br>City : " + cityName[i] + "<br>Company : " + Organization[i] + "<br>Assignee Total Number Of Patent : " + cityNo_Patent[i];
        citySize.push(currentSize);
        hoverText.push(currentText);
    }

    var data = [{

        type: 'scattergeo',
        locationmode: 'USA-states',
        lat: cityLat,
        lon: cityLon,
        text: hoverText,
        hoverinfo: 'text',
        marker: {
            size: citySize,
            line: {
                color: 'black',
                width: 2
            }
        },
      
      {
        type: "choroplethmapbox", name: "US states", geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json", locations: ["assignee_lastknown_state"],
        z: "cityNo_Patent",
        zmin: 0, zmax: 5000, colorbar: { y: 0, yanchor: "bottom", title: { text: "NO OF PATENT", side: "right" } }
    }];


var layout = { mapbox: { style: "dark", title: 'Total Number Of Patent From 2015', center: { lon: -73.7144, lat: 41.1264 }, zoom: 0.8 }, width: 600, height: 400, margin: { t: 0, b: 0 } };
        // showlegend: true,
        // geo: {
        //     scope: 'usa',
        //     projection: {
        //         type: 'albers usa'
        //     },
        //     showland: true,
        //     landcolor: 'rgb(217, 217, 217)',
        //     subunitwidth: 1,
        //     countrywidth: 1,
        //     subunitcolor: 'rgb(255,255,255)',
        //     countrycolor: 'rgb(255,255,255)'
        

var config = { mapboxAccessToken: 'pk.eyJ1IjoiY2FyZG96b3A1IiwiYSI6ImNrMGI0cHBtejBxcGQzbXBsbnVtdmtuNjEifQ.tRGaVR-Cp7xjCL8uIOD6hQ' };

Plotly.newplot(myDiv2, data, layout, config);
