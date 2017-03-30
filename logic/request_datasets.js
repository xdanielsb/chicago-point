'use strict'
/*
 * This function consume the api of noaa.gov in this case the weather
 * API,
 * This function is called after the ajax API has finished.
 */
function show_datasets_noaa_api() {
  let results = response.results
  dataset = [];

  // Iterate over the data in the table
  results.forEach(function (e) {
    var row = [e.uid, e.mindate, e.maxdate, e.name, e.datacoverage, e.id]
    dataset.push(row)
  });

  // Print the dataset in console
  console.log(dataset)

  //Id table
  let id_table = "table_datasets"

  // Creating the table
  let table = $('#' + id_table)
    .DataTable({
      data: dataset,
      columns: [{
        title: "uid"
    }, {
        title: "mindate"
    }, {
        title: "maxdate"
    }, {
        title: "name"
    }, {
        title: "datacoverage"
    }, {
        title: "id"
    }]
    });

  // Listen click on the table
  $('#' + id_table)
    .on('click', 'tr', function () {
      var data = table.row(this)
        .data();
      alert('You clicked on ' + data[0] + '\'s row');
    });

}
