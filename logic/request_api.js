'use strict'

//Ensure that the DOM is completely load
$(document).ready(function (){
  //Create ajax JQuery request
  $.ajax({
      method: "GET",
      url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets',
      headers: {
        'token': 'xtLJFvVAFGacWOPnHFCOJvAfwVhVPFmI',
      },
    })

    .done((result) => {
      console.log(result);
    })

    .fail((_, status, error) => {
      console.log(status);
    });

});
