Plotly.d3.csv('https://raw.githubusercontent.com/cardozop5/getting-started/master/result%20(3).csv', function (err, rows){
      function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
      }

var scl = [[0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],[0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],[0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']];  
  
var data = [{
    type:'scattergeo',
    locationmode: 'TX',
    lon: unpack(rows, 'assignees__assignee_lastknown_longitude'),
    lat: unpack(rows, 'assignees__assignee_lastknown_latitude'),
    hoverinfor:  unpack(rows, 'assignees__assignee_organization'),
    text:  unpack(rows, 'assignees__assignee_organization'),
    mode: 'markers',
    marker: {
      size: 8,
      opacity: 0.8,
      reversescale: true,
      autocolorscale: false,
      symbol: 'square',
      line: {
        width: 1,
        color: 'rgb(102,102,102)'
      },
      colorscale: scl,
      cmin: 0,
      color: unpack(rows, 'assignees__assignee_total_num_patents'),
      colorbar: {
         title: 'Total No Of Patent'
      }
    }
}];


var layout = {
      title: 'Organizations with most paatent in TX',
      colorbar: true,
      geo: {
        scope: 'texas',
        projection: {
          type: 'albers usa'
        },
        showland: true,
        landcolor: 'rgb(250,250,250)',
        subunitcolor: 'rgb(217,217,217)',
        countrycolor: 'rgb(217,217,217)',
        countrywidth: 0.5,
        subunitwidth: 0.5
      }
    };
  
Plotly.plot(myDiv, data, layout, {showLink: false, showSendToCloud: true});
  
});