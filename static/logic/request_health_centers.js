'use strict'
/*
 * This function insert the markers
 */

function insert_health_center(response){
  console.log("Inserting markers health centers.")

  let result = jQuery.parseJSON(response)
  //console.log(result)
  let _locs = result['location_1']

  for (var key in _locs){
    let _dat = _locs[key]
    let _lat = parseFloat(_dat["latitude"])
    let _lon = parseFloat(_dat["longitude"])
    //console.log(_lat)
    //console.log(_lon)
    let location = {lat: _lat, lng: _lon}
    createHealthCenters(location)
  }

}

//Create ajax JQuery request without token
function request_info_health_centers(_method, _url) {
  $.ajax({
    method: _method,
    url: _url
  })
  .done((res) => {
    console.log("The request for :"+_url+ " has finished");
    insert_health_center(res)

  })
  .fail((_, status, error) => {
    console.log(status)
    console.log(error)
  });
}

request_info_health_centers("GET", "/health/")
