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
