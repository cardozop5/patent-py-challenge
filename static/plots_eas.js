

/* global Plotly */
var url =
    `https://www.patentsview.org/api/patents/query?q={%22_gte%22:{%22app_date%22:%222018-01-01%22}}&f=[%22app_date%22,%22cpc_section_id%22,%22app_number%22]`;








//This reads the data directly from the API
d3.json(url).then(function (data) {
    //console.log(data);

    //console.log(data.patents);
}
)
//This is where I tried to drill down into the data 
//without resorting to csv. It doesn't work.
// for (var i = 0; i < data.patents.length; i++) {
//   var patent = data.patents[i];
//   console.log(patent);

//   //console.log(patent.applications);
//   // patent.forEach((app)=> {
//   //   Object.entries(app).forEach(([key, value]) => {
//   //     //console.log(key, value);
//   //   })
//   // })
//   }
//}

//This is where my line graph should go
d3.csv("patent_eas_cleaned_nocpc2.csv", function (response) {
    console.log(response);

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
      }
    //Build line chart
    var trace1 = {
        type: "scatter",
        mode: "lines",
        name: name,
        x: response.app_id,
        y: response.app_number,
        line: {
            color: "#17BECF"
        }
    };

    var data = [trace1];

    var layout = {
        title: `Patents Filed by Date`,
        xaxis: {
            range:  ['2018-17-01', '2019-12-31'],
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
d3.csv("patent_eas_cleaned2.csv", function (data) {
    //console.log(data);
    pieValues = data.app_number;
    pieLabels = data.cpc_section_id;
    //console.log(pieLabels);
    var data = [{
        values: pieValues,
        labels: pieLabels,
        type: 'pie'
    }];

    var layout = {
        height: 400,
        width: 400,
        title: "Patent Category by Volume",
        showlegend: true,
        legend: {
            title: "Category"
        },
        //grid: { rows: 1, columns: 2 }

    };

    Plotly.newPlot('pie', data, layout);

});




  //   // Create the Traces
  //   var trace1 = {
  //     x: data.patents.applications.app_n,
  //     y: data.high_jump,
  //     mode: "markers",
  //     type: "scatter",
  //     name: "high jump",
  //     marker: {
  //       color: "#2077b4",
  //       symbol: "hexagram"
  //     }
  //   };

  //   var trace2 = {
  //     x: data.year,
  //     y: data.discus_throw,
  //     mode: "markers",
  //     type: "scatter",
  //     name: "discus throw",
  //     marker: {
  //       color: "orange",
  //       symbol: "diamond-x"
  //     }
  //   };

  //   var trace3 = {
  //     x: data.year,
  //     y: data.long_jump,
  //     mode: "markers",
  //     type: "scatter",
  //     name: "long jump",
  //     marker: {
  //       color: "rgba(156, 165, 196, 1.0)",
  //       symbol: "cross"
  //     }
  //   };

  //   // Create the data array for the plot
  //   var data = [trace1, trace2, trace3];

  //   // Define the plot layout
  //   var layout = {
  //     title: "Olympic trends over the years",
  //     xaxis: { title: "Year" },
  //     yaxis: { title: "Olympic Event" }
  //   };

  //   // Plot the chart to a div tag with id "plot"
  //   Plotly.newPlot("plot", data, layout);


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

//     // Use the first sample from the list to build the initial plots
//     const firstSample = sampleNames[0];
//     buildCharts(firstSample);
//     buildMetadata(firstSample);
//   });
// }

// function optionChanged(newSample) {
//   // Fetch new data each time a new sample is selected
//   buildCharts(newSample);
//   buildMetadata(newSample);
// }

// // Initialize the dashboard
// init();

