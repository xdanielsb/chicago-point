'use strict'
// Data
data_values = [[12, 19, 3, 5, 2, 3], [1, 1, 9, 5, 12, 5]]
data_labels = ["Daniel", "Julian", "Ana", "Polo", "Erika", "Felipe"]

// Data configuration
var config_line = {
    type: 'line', //bar, line
    data: {
        labels: data_labels,
        datasets: [{
            label: '# of  People',
            data: data_values[0],
            borderWidth: 1,
            fill: false,
            backgroundColor: "blue",
            borderColor: "black"
        }, {
            label: '# lol',
            data: data_values[1],
            borderWidth: 1,
            fill: false,
            backgroundColor: "red",
            borderColor: "black"
        }]
    },
   options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Custom Line Chart',
            fontFamily: 'Arial',
            position: 'top',
            fullWidth: true
        },
        legend: {
            display:true,
            position: 'top'
        }
    }
};
//Initialize

var ctx_line = document.getElementById("chart_line");
var ch_line = new Chart(ctx_line, config_line);

// Events
$("#chart_line").click(
  function(evt){
    var activePoints = ch_line.getElementsAtEvent(evt);
    var first_point = activePoints[0]
    console.log(activePoints)
    if(first_point){
      var num_data_set = first_point._datasetIndex
      var num_index_datum = first_point._index
      var val = config_line.data.datasets[num_data_set].data[num_index_datum]
      var lab = config_line.data.labels[num_index_datum]
      console.log(lab + " "+ val)
    }
  }
);
