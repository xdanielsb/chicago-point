'use strict'
/*
 * Depend on: no one local file
 */
let map_data
let marker
let div_map
//Configuration map
let config_mapa = {
  zoom: 14,
  center: {lat: 41.870732, lng: -87.650495}, //Center in US
  mapTypeId: 'terrain'
}

let icon_origin = 'http://m.schuepfen.ch/icons/helveticons/black/60/Pin-location.png'
let icon_house = "http://findicons.com/files/icons/829/quartz/64/house_2.png"
// Function for place a marker
function createMarker(location, _icon) {
    //Simulate omition parameters of python
    if (typeof(_icon)==='undefined') _icon = icon_house;

    let data = {
       position: location,
       map: map_data,
       icon: _icon,
       title: 'Click to get more information'
     }
    //intance the marker
    marker = new google.maps.Marker(data);
}

// Function for init a google maps map =}
function initMap() {
  // Instance the map
  div_map = document.getElementById("map")
  map_data = new google.maps.Map(div_map, config_mapa);
  createMarker({lat: 41.870732, lng: -87.650495}, icon_origin)
  console.log("The map has been loaded.")

}
