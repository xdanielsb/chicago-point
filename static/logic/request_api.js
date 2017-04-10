'use strict'
/*
 * Depend on: request_datasets (file for showing the datasets)
 * Good documentation for the API https://www.ncdc.noaa.gov/cdo-web/webservices/v2
 */

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
