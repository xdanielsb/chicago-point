'use strict'

//Ensure that the DOM is completely load
$(document).ready(function (){

  let response;
  let dataset;

  function fill_table(){
    let results = response.results
    dataset = [];

    // Iterate over the data in the table
    results.forEach( function (e){
        var row = [e.uid, e.mindate, e.maxdate, e.name, e.datacoverage, e.id]
        dataset.push(row)
    });

    // Print the dataset in console
    console.log(dataset)

    // Creating the table
    let table = $('#example').DataTable({
      data: dataset,
      columns: [
          { title: "uid" },
          { title: "mindate" },
          { title: "maxdate" },
          { title: "name" },
          { title: "datacoverage" },
          { title: "id" }
      ]
    });

    // Listen click on the table
    $('#example').on('click', 'tr', function () {
        var data = table.row( this ).data();
        alert( 'You clicked on '+data[0]+'\'s row' );
    } );

  }
  //Create ajax JQuery request
  $.ajax({
      method: "GET",
      url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets',
      headers: {
        'token': 'xtLJFvVAFGacWOPnHFCOJvAfwVhVPFmI',
      },
    })

    .done((res) => {
      response = res;
      //Fill the table with the answer
      console.log(response);
      fill_table();
    })

    .fail((_, status, error) => {
      console.log(status);
    });

});
