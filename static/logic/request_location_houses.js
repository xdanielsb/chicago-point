'use strict'

/*
 * This function insert the markers
 */

function insert_markers_locations(response){
  console.log("Inserting markers houses")

  let result = jQuery.parseJSON(response)
  //console.log(result)
  let _lats = result['latitude']
  let _longs = result['longitude']
  let _address = result['address']
  let _ncomunity = result['community_area_number']
  let _comunity = result['community_area']
  let _phone = result['phone_number']
  let _property_name = result['property_name']
  let _property_type= result['property_type']
  let _zip_code = result['zip_code']

  for (var key in _lats){
    var location = {lat: _lats[key], lng: _longs[key]}
    var info = {
                 id: key,
                 address: _address[key],
                 ncomunity: _ncomunity[key],
                 comunity : _comunity[key],
                 phone : _phone[key],
                 property_name: _property_name[key],
                 property_type: _property_type[key],
                 zip_code : _zip_code[key]
                 }
  // console.log(location)
  // Call google maps method.
    createMarkerHouses(location, info, 1)
  }
  clusterMarkers()
}

//Create ajax JQuery request without token
function request_location_houses(_method, _url) {
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

request_location_houses("GET", "/location_houses/")
