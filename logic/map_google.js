'use strict'
/*
 * Depend on: no one local file
 */
let map_data
let marker
let div_map
let infowindow

let icon_origin = 'static/img/location_pin1.png'
let icon_house = "static/img/location_pin2.png"


//Configuration map
let config_mapa = {
  zoom: 14,
  center: {lat: 41.870732, lng: -87.650495}, //Center in US
  mapTypeId: 'terrain'
}

// Function for place a marker
function createMarker(location, _icon) {
    //Simulate omition parameters of python
    if (typeof(_icon)==='undefined') _icon = icon_house;

    let data = {
       position: location,
       map: map_data,
       icon: _icon,
       clickable: true,
       title: 'Click to get more information'
     }
    //intance the marker
    marker = new google.maps.Marker(data);

    marker.info = new google.maps.InfoWindow({
      content: '<b>Speed:</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    });

    google.maps.event.addListener(marker, 'click', function() {
      marker.info.open(map, this);
    });

}

// Function for init a google maps map =}
function initMap() {
  // Instance the map
  div_map = document.getElementById("map")
  map_data = new google.maps.Map(div_map, config_mapa);
  createMarker({lat: 41.870732, lng: -87.650495}, icon_origin)
  console.log("The map has been loaded.")

}
