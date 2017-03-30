'use strict'

let response;
let dataset;
//Create ajax JQuery request
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
    console.log(status);
  });
}

//Testing the API
request("GET", "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets")
