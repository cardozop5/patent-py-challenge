Plotly.d3.csv('https://raw.githubusercontent.com/cardozop5/getting-started/master/Top_Org_in_US_WPatent.csv', function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }
    var cityName = unpack(rows, 'assignee_lastknown_city'),
        state = unpack(rows, 'assignee_lastknown_state'),
        Organization = unpack(rows, 'assignee_organization'),
        cityNo_Patent = unpack(rows, 'assignee_total_num_patents'),
        cityLat = unpack(rows, 'assignee_lastknown_latitude'),
        cityLon = unpack(rows, 'assignee_lastknown_longitude'),
        color = [, "rgb(255,65,54)", "rgb(133,20,75)", "rgb(255,133,27)", "lightgrey"],
        citySize = [],
        hoverText = [],
        scale = 1500;

    for (var i = 0; i < cityNo_Patent.length; i++) {
        var currentSize = cityNo_Patent[i] / scale;
        var currentText = "<br>Company : " + Organization[i] + "<br>State : " + state[i] + "<br>City : " + cityName[i] +"<br>Assignee Total Number Of Patent : " + cityNo_Patent[i];
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
            },

        }
    }];

    var layout = {
        title: 'Map Showing Organizations Around The USA With Total No Of Patent Owned',
        showlegend: false,
        geo: {
            scope: 'usa',
            projection: {
                type: 'albers usa'
            },
            showland: true,
            landcolor: 'light',
            subunitwidth: 2,
            countrywidth: 1,
            subunitcolor: 'deeppink',
            countrycolor: 'green'
        },
    };

    Plotly.plot(myDiv2, data, layout, { showLink: false, showSendToCloud: true });
});