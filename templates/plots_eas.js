

/* global Plotly */
// var url =
//     `https://www.patentsview.org/api/patents/query?q={"_gte":{"app_date":"2018-11-20"}}&f=["app_date","cpc_section_id","app_number"]&o={"per_page": 10000}`;





function unpackNumber(rows, index) {
    return rows.map(function (row) {
        return +row[index];
    });
}

function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}
//This is where my line graph should go
d3.csv("patent_eas_cleaned_nocpc2.csv").then(response => {
    console.log("response", response);

    app_id = unpackNumber(response, "app_id")
    //console.log("app_date", app_date)
    app_number = unpackNumber(response, "app_number")
    app_date = unpack(response, "app_date")
    parseTime = d3.timeParse('%m/%d/%Y')
    date_list = app_date.map(d => d = parseTime(d))
    console.log("app_date", app_date)
    date_list.sort(function (a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c - d;
    });
    // function unpack(rows, key) {
    //     return rows.map(function(row) { return row[key]; });
    //   }
    //Build line chart
    var trace1 = {
        type: "bar",
        //mode: "lines",
        name: name,
        x: date_list,
        y: app_number,
        line: {
            color: "#17BECF"
        }
    };

    var data = [trace1];

    var layout = {
        title: `Patents Filed by Date`,
        xaxis: {
            //range: app_date,
            type: "date"
        },
        yaxis: {
            autorange: true,
            type: "linear"
        }
    };

    Plotly.newPlot("plot", data, layout);

});


//This is where my pie chart should go
d3.csv("patent_eas_cleaned2.csv").then(data => {
    console.log("data", data);
    cpc_section_id = unpack(data, "cpc_section_id")
    //console.log("app_date", app_date)
    app_number = unpackNumber(data, "app_number")
    pieValues = app_number;
    pieLabels = cpc_section_id;
    //console.log(pieLabels);
    var data = [{
        values: pieValues,
        labels: pieLabels,
        type: 'pie'
    }];

    var layout = {
        height: 400,
        width: 600,
        title: "Patent Category by Volume",
        showlegend: true,
        legend: {
            title: "Category"
        },
        grid: { rows: 1, columns: 2 }

    };

    Plotly.newPlot('pie', data, layout);

});






// buildPlot();

// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#selDataset");

//   // Use the list of sample names to populate the select options
//   d3.json("/names").then((sampleNames) => {
//     sampleNames.forEach((sample) => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });

// // Initialize the dashboard
// init();

