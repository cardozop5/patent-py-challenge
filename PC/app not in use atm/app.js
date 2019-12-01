// url = 'http://www.patentsview.org/api/locations/query?q={"inventor_last_name":["Yamazaki","Weder","Edison"]}&f=["assignee_lastknown_city","assignee_lastknown_state","assignee_lastknown_country"]'
// d3.request(url)
//     .get(callback)
//     .header("Content-Type", "application/json")
//     .post("intent=data-quality", function (error, data) {if (error) throw error;
//         console.log(data); 
//      });

// var queryUrl = "http://www.patentsview.org/api/locations/query?q={"inventor_last_name":["Yamazaki","Weder","Edison"]}&f=["assignee_lastknown_city","assignee_lastknown_state","assignee_lastknown_country"]";

// d3.json(queryUrl, function(data) {
//     console.log(data.features);
// });

//(2) Set Dimensions for Chart, and Account for Margins
let margin = { top: 5, right: 25, bottom: 205, left: 75 };
let width = 400 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;



// Call the API Endpoint with our Query; Destructure Response in Callback
let url=d3.csv('https://raw.githubusercontent.com/cardozop5/getting-started/master/result%20(4).csv', function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }
    
    console.log(url)
    let cityName = unpack(rows, 'assignee_lastknown_city');
    let state = unpack(rows, 'assignee_lastknown_state');
    let Organization = unpack(rows, 'assignee_organization');
    let cityNo_Patent = unpack(rows, 'assignee_total_num_patents');
    let cityLat = unpack(rows, 'assignee_lastknown_latitude');
    let cityLon = unpack(rows, 'assignee_lastknown_longitude');

    // Append an SVG element to the DOM with our existing dimensions



    let svg = d3.select('.chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    // Append a Title for our Graph
    svg.append("text")
        .style("text-anchor", "middle")
        .attr("y", margin.top * 20 / 5)
        .attr("x", (width + margin.right + margin.left) / 2)
        .text("Active Patent Holders in Texas")
        .style("font-size", "1.6em");

    // Append a label for the Y axis
    svg.append("text")
        .style("text-anchor", "middle")
        .attr('transform', 'rotate(-90)')
        .attr("y", margin.left / 3)
        .attr("x", - height / 2)
        .text("Number of Patents Granted to Assignee");

    // Append a label for the X Axis
    svg.append("text")
        .style("text-anchor", "middle")
        .attr("y", height + margin.bottom + (margin.top / 20))
        .attr("x", (width + margin.right + margin.left) / 2)
        .text("Assignee Organization");

    // Append a g element, this is where we will build our Chart
    let g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    // Create and append the Y axis, with defaut ticks
    // Note that the domain is static, other datasets would require customization
    let yScale = d3.scaleLinear()
        .domain([0, 6000])
        .range([height, 0]);
    let yAxis = d3.axisLeft(yScale);
    g.call(yAxis);

    // Create and append the X axis, with custom ticks
    let xScale = d3.scaleBand()
        .padding(0.2)
        .domain(rows.map(d => d.Organization))
        .range([0, width]);
    let xAxis = d3.axisBottom(xScale)

    // Rotate the X axis tick-labels to fit
    g.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-45)');

    // Finally, append rectangles using the data from the API
    g.selectAll('rect')
        .data(rows)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.Organization))
        .attr('y', d => yScale(d.cityNo_Patent))
        .attr('width', d => xScale.bandwidth())
        .attr('height', d => height - yScale(d.cityNo_Patent))
        .style('fill', 'steelblue');

});