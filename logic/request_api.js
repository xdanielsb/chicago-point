'use strict'
/*
 * Depend on: request_datasets (file for showing the datasets)
 */

let response;
//Create ajax JQuery request with token
function request(_method, _url) {
  $.ajax({
    method: _method,
    url: _url,
    headers: {
      'token': 'xtLJFvVAFGacWOPnHFCOJvAfwVhVPFmI',
    },
  })

  .done((res) => {
    response = res;
    //Fill the table with the answer
    show_datasets_noaa_api(response);
    console.log("The request1 for :"+_url+ " has finished");
  })

  .fail((_, status, error) => {
    console.log(status)
    console.log(error)
  });
}

//Create ajax JQuery request without token
function request2(_method, _url) {
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
  let url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets"
  request("GET", url)
} else if(opcion == 2 ){
  let url = "https://data.cityofchicago.org/resource/uahe-iimk.json"
  request2("GET", url)
}
