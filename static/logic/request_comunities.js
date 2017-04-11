'use strict'

function create_table_health(response){
  console.log("Creating table... =)")

  let result = jQuery.parseJSON(response)
  _community_area = result["community_area"]

  var dataset = []

  // Iterate over the table
  for (var key in _community_area){
    var row [key, _community_area[key]]
    dataset.push(row)
  }

  // Print the dataset on console
  console.log(dataset)

  // Creating the table
  var table = $('#example').DataTable({
    data: dataset,
    columns: [
      { title: "data0" },
      { title: "data1" }
    ]
  });

}


//Create ajax JQuery request without token
function request_info_comunities(_method, _url) {
  $.ajax({
    method: _method,
    url: _url
  })
  .done((res) => {
    console.log("The request for :"+_url+ " has finished");
    insert_markers_locations(res)

  })
  .fail((_, status, error) => {
    console.log(status)
    console.log(error)
  });
}

request_location_houses("GET", "/info_houses/")
