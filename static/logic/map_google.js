'use strict'

/* The location of the university*/
let _center = {lat: 41.870732, lng: -87.650495}
/* Storage the object type google map */
let map_data
/* Currently instance of a marker */
let marker
/*  Div that storage the map*/
let div_map
/*  Instance for the infowindow */
let infowindow

/* Markers for the houses */
let markers = []
/* Markers for the police stations*/
let police_stations_a = []
/* Markers for the parks */
let parks_a =[]

/* Auxiliar variables to show and hide the markers */
let visible_stations = true
let visible_parks = true

/*  Variables for the directions services */
let directionsService
let directionsDisplay


/* Variables for the project*/
let path = "../../static/img/"
let icon_origin = path + 'location_pin1.png'
let house1 =  path + "home1.png"
let house2 =  path + "home2.png"
let house3 =  path + "home3.png"
let house4 =  path + "home4.png"
let police =  path + "police.png"
let park   =  path + "park.png"

let houses = [house1, house2, house3, house4]

//let kml_limitations = "https://data.cityofchicago.org/api/geospatial/cauq-8yn6?method=export&format=KML"
let kml_limitations = "http://danielsantos.net/ChicagoPoint.kml"


/* Function that helps me to cluster the house - markers */
function clusterMarkers(){
  var markerCluster = new MarkerClusterer(map_data, markers,
  {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

/*
 * Based in a origin and a clicked marker calc the route
 */
function calcRoute(start) {
    var request = {
      origin: start,
      destination: _center,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map_data);
      } else {
        alert("Could not calculate the route");
      }
    });
}

/*
 * Load KML layer, show different neighborhoods of Chicago
 */
function loadKmlLayer(src, map) {
  var kmlLayer = new google.maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: map
  });
}

/*
 * Driver program: Function for init a google maps map =}
 */
function initMap() {
  // Instance the map
  div_map = document.getElementById("map")

  /* Configuration  for the map */
  map_data = new google.maps.Map(div_map, {
    zoom: 15,
    center: _center, //Center in US
    //mapTypeId: 'terrain'
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.TOP_CENTER,
      mapTypeIds: ['roadmap', 'terrain']
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER
    },
    fullscreenControl: true,
    gestureHandling: 'cooperative'
  });


  createOrigin(_center ,4)
  console.log("The map has been loaded.")

  //Options for directions services
  let color_stroke = "#8b0013";
  var rendererOptions = {
        preserveViewport: true,
        polylineOptions: { strokeColor: color_stroke }
    };
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

  loadKmlLayer(kml_limitations, map_data);
}
