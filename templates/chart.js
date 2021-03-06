// set the dimensions and margins of the graph
var margin = { top: 30, right: 350, bottom: 70, left: 75 },
  width = 1500 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;


// append the svg object to the body of the page
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let g = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
// Initialize the X axis
var x = d3.scaleBand()
  .range([0, width])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .attr('class', 'grid')
  .call(d3.axisBottom()
    .scale(x)
    .tickSize(-height, 0, 0)
    .tickFormat(''))

// Initialize the Y axis
var y = d3.scaleLinear()
  .domain([0, 6000])
  .range([height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")



// A function that create / update the plot for a given variable:
function update(selectedVar) {

  // Parse the Data
  d3.csv("https://raw.githubusercontent.com/cardozop5/getting-started/master/result%20(7).csv", function (data) {

    // X axis
    x.domain(data.map(function (d) { return d.assignee_organization_abbr; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))





    // Add Y axis
    y.domain([0, d3.max(data, function (d) { return +d[selectedVar] })]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));



    // variable u: map data to existing bars
    var u = svg.selectAll("rect")
      .data(data)

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(x)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-45)');

    // update bars
    u
      .enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
      .attr("x", function (d) { return x(d.assignee_organization_abbr); })
      .attr("y", function (d) { return y(d[selectedVar]); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d[selectedVar]); })
      .attr("fill", "skyblue")
      .transition().duration(1500)  // <<< added this
      .attr("y", function (d) { return y(d[selectedVar]); })
      .attr("height", function (d) { return height - y(d[selectedVar]); })
  })

}

//add labels
svg
  .append("text")
  .attr("transform", "translate(-48," + (height + margin.bottom) / 2 + ") rotate(-90)")
  .text("Total No Of Patent/Inventors");

svg
  .append("text")
  .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom - 5) + ")")
  .text("Corporations");

svg.append('text')
  // .attr('class', 'source')
  // .attr('x', width - margin / 2)
  // .attr('y', height + margin * 1.8)
  // .attr('text-anchor', 'start')
  .attr("transform", "translate(" + (width) + "," + (height + margin.bottom - 5) + ")")
  .text('Created by Patrick Cardozo © 2019');



// Initialize plot
update('assignee_total_num_patents')

