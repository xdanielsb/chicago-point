'use strict'
/*
 * Depend on: request_datasets (file for showing the datasets)
 * Good documentation for the API https://www.ncdc.noaa.gov/cdo-web/webservices/v2
 */

let response;


//Create ajax JQuery request without token
function request(_method, _url) {
  $.ajax({
    method: _method,
    url: _url
  })
  .done((res) => {
    response = res;
    //Fill the table with the answer
    show_datasets_rent(response);
    console.log("The request2 for :"+_url+ " has finished");
    insert_markers(dataset)

  })
  .fail((_, status, error) => {
    console.log(status)
    console.log(error)
  });
}


let opcion = 2

//Testing the API
if (opcion == 1){
  let url = "/health/"
  request("GET", url)
} else if(opcion == 2 ){
  let url = "/houses/"
  request("GET", url)
}
