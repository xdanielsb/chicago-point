data_labels= ["Daniel", "Julian", "Ana", "Beng", "Erika", "Jhon Doe"]
data_values = [12, 19, 3, 5, 2, 3]


let config_bar = {
    type: 'bar', //bar, line
    data: {
        labels: data_labels,
        datasets: [{
            label: '# Something',
            data: data_values,
            borderWidth: 1,
            fill: true,
            backgroundColor: 'red',
            borderColor: 'blue'
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
            text: 'Custom Bar Chart',
            fontFamily: 'Arial',
            position: 'top',
            fullWidth: true
        }
    }
};

let context_bar = document.getElementById("chart_bar");
let mychart_bar = new Chart(context_bar, config_bar);


// Events
$("#chart_bar").click(
  function(evt){
    var activePoints = mychart_bar.getElementsAtEvent(evt);
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
