'use strict'
/*
 * Depend on: no one local file
 */
 
let map_data
let marker
//Configuration map
let config_mapa = {
  zoom: 4,
  center: {lat: 41.244772343082076, lng: -103.7109375}, //Center in US
  mapTypeId: 'terrain'
}

// Function for place a marker
function createMarker(location) {
    let data = {
       position: location,
       map: map_data,
       title: 'Click to get more information'
     }
    //intance the marker
    marker = new google.maps.Marker(data);
}

// Function for init a google maps map =}
function initMap() {
  // Instance the map
  let div_map = document.getElementById("map")
  map_data = new google.maps.Map(div_map, config_mapa);
  createMarker({lat: 41.244772343082076, lng: -103.7109375})
}
