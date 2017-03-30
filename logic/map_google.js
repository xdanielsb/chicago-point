'use strict'

//Configuration map
let config_mapa = {
  zoom: 4,
  center: {lat: 41.244772343082076, lng: -103.7109375}, //Center in US
  mapTypeId: 'terrain'
}

// Function for init a google maps map =}
function initMap() {
  // Instance the map
  let div_map = document.getElementById("map")
  div_map.innerHTML = "Paragraph changed!";
  map = new google.maps.Map(div_map, config_mapa);

}
