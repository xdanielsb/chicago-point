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

/* Style map*/
let confs_styles_map =  [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]


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

  var styledMapType = new google.maps.StyledMapType(confs_styles_map, {name: 'Night Mode'});

  /* Configuration  for the map */
  map_data = new google.maps.Map(div_map, {
    zoom: 15,
    center: _center, //Center in US
    //mapTypeId: 'terrain'
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.TOP_CENTER,
      mapTypeIds: ['roadmap', 'terrain', 'styled_map']
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER
    },
    fullscreenControl: true,
    gestureHandling: 'cooperative'
  });
  //Add styled map to the possible maps
  map_data.mapTypes.set('styled_map', styledMapType);

  // Add controls to the map, allowing users to hide/show features.
  var styleControl = document.getElementById('style-selector-control');
  map_data.controls[google.maps.ControlPosition.TOP_CENTER].push(styleControl);

  // Apply new JSON when the user chooses to hide/show features.
  document.getElementById('hide-poi').addEventListener('click', function() {
    visible_stations = !visible_stations
    for (var i = 0; i < police_stations_a.length; i++) {
        police_stations_a[i].setVisible(visible_stations);
     }
  });
  document.getElementById('show-poi').addEventListener('click', function() {
    visible_parks = !visible_parks
    for (var i = 0; i < parks_a.length; i++) {
        parks_a[i].setVisible(visible_parks);
     }
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
