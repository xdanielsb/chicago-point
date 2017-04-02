'use strict'
// Data

let data_values = [12, 19, 3, 5, 2, 3]
let data_labels = ["Daniel", "Julian", "Ana", "Polo", "Erika", "Felipe"]
let bcolors = ["#FF6384","#4BC0C0","#FFCE56","#E7E9ED","#36A2EB","rgb(36, 250, 17)"]

// Data configuration
var config_line = {
    type: 'polarArea', //bar, line
    data: {
        labels: data_labels,
        datasets: [{
            label: '# of  People',
            data: data_values,
            borderWidth: 1,
            fill: false,
            backgroundColor: bcolors,
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

var ctx_line = document.getElementById("chart_polar");
var ch_line = new Chart(ctx_line, config_line);

// Events
$("#chart_polar").click(
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
