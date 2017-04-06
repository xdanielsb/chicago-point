// Data
data_values = [[12, 19, 3, 5, 2, 3], [1, 1, 9, 5, 12, 5]]
data_labels = ["Daniel", "Julian", "Ana", "Polo", "Erika", "Felipe"]
cities =["City 1", "City 2"]

var config = {
    type: 'radar',
    data: {
        labels: data_labels,
        datasets: [{
            label: cities[0],
            backgroundColor: "rgba(54, 162, 235, 0.4)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: data_values[0]
        }, {
            label: cities[1],
            backgroundColor: "rgba(22, 198, 99, 0.5)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: data_values[1]
        }]
    },
    options: {
         responsive: true,
         title: {
             display: true,
             text: 'Custom Radar Chart',
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


var ctx = document.getElementById("chart_radar");
var ch_radar = new Chart(ctx, config);


// Events
$("#chart_radar").click(
  function(evt){
    var activePoints = ch_radar.getElementsAtEvent(evt);
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
