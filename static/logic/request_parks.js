
/*
 * This function insert the markers
 */

function insert_park(response){
  console.log("Inserting markers for parks ")

  let result = jQuery.parseJSON(response)
  // console.log(result)
  //console.log(result)
  let _locs = result['location']
  let _names = result['park_name']
  // console.log(_locs)
  for (var key in _locs){
    let _dat = _locs[key]
    let _lat = parseFloat(_dat["coordinates"][1])
    let _lon = parseFloat(_dat["coordinates"][0])
    //console.log(_lat)
    //console.log(_lon)
    let location = {lat: _lat, lng: _lon}
    createParks(location, _names[key])
  }

}

//Create ajax JQuery request without token
function request_location_parks(_method, _url) {
  $.ajax({
    method: _method,
    url: _url
  })
  .done((res) => {
    console.log("The request for :"+_url+ " has finished");
    insert_park(res)

  })
  .fail((_, status, error) => {
    console.log(status)
    console.log(error)
  });
}

request_location_parks("GET", "/parks/")
