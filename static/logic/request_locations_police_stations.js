'use strict'
/*
 * This function insert the markers
 */

function insert_police(response){
  console.log("Inserting markers police stations")

  let result = jQuery.parseJSON(response)
  //console.log(result)
  let _locs = result['location']

  for (var key in _locs){
    let _dat = _locs[key]
    let _lat = parseFloat(_dat["latitude"])
    let _lon = parseFloat(_dat["longitude"])
    //console.log(_lat)
    //console.log(_lon)
    let location = {lat: _lat, lng: _lon}
    createPoliceStations(location)
  }

}

//Create ajax JQuery request without token
function request_location_police_stations(_method, _url) {
  $.ajax({
    method: _method,
    url: _url
  })
  .done((res) => {
    console.log("The request for :"+_url+ " has finished");
    insert_police(res)

  })
  .fail((_, status, error) => {
    console.log(status)
    console.log(error)
  });
}

request_location_police_stations("GET", "/location_police_stations/")
