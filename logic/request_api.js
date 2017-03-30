'use strict'

let response;
let dataset;
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
    show_datasets_noaa_api();
    console.log(response);
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
    show_datasets_rent();
    console.log(response);
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
