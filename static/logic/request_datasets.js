'use strict'
/*
 * Depend on: No local
 * These methods are called when the promises are getting by the
 * request api.
 */


/*
 * This function consume the api of noaa.gov in this case the weather
 * API, besides this iscalled after the ajax API has finished.
 */

let dataset = []

function show_datasets_noaa_api(response) {
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



/*
 * This function consume the apartments avaliable for renting
 */

function show_datasets_rent(response){
  let results = response
  dataset = [];

  // Iterate over the data in the response
  results.forEach(function (e) {

    if ("undefined" === typeof e.location){
      //nothing
    }else{  //Just storage those who has location
      var loc = [e.location.coordinates[0], e.location.coordinates[1]]
      var row = [e.address, e.community_area, e.phone_number, e.property_name, e.zip_code, loc[0], loc[1]]
      dataset.push(row)
    }

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
        title: "Address"
    }, {
        title: "Comunity area"
    }, {
        title: "Phone number"
    }, {
        title: "Property name"
    }, {
        title: "Zip code"
    }, {
        title: "Lat"
    },{
        title: "Long"
    }],
    "columnDefs": [
            {
                "targets": [3],
                "visible": false
            },{
                "targets": [6],
                "visible": false
            },{
                "targets": [5],
                "visible": false
            }
        ]
    });

  // Listen click on the table
  $('#' + id_table)
    .on('click', 'tr', function () {
      var data = table.row(this)
        .data();
      alert('You clicked on ' + data[0] + '\'s row');
    });

}

function insert_markers(dataset){
  console.log("Inserting markers")
  dataset.forEach(function (e) {
    var location = {lat: e[6], lng: e[5]}
    //Call google map API
    createMarker(location)
  });
}
