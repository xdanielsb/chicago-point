'use strict'
/*
 * Depend on: no one local file
 */
let map_data
let markers = new Array()
let marker
let div_map
let infowindow

//Check this-- a bit tricky
let icon_origin = '../../static/img/location_pin1.png'
let house1 = "../../static/img/home1.png"
let house2 = "../../static/img/home2.png"
let house3 = "../../static/img/home3.png"
let house4 = "../../static/img/home4.png"
let police ="../../static/img/police.png"

let houses = [house1, house2, house3, house4]


let kml_limitations = "https://data.cityofchicago.org/api/geospatial/cauq-8yn6?method=export&format=KML"

let _center = {lat: 41.870732, lng: -87.650495}

//Configuration map
let config_mapa = {
  zoom: 15,
  center: _center, //Center in US
  mapTypeId: 'terrain'
}

/*
* Distance between points
* K -> Kilometers
*/


function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

//Create ajax JQuery request without token
function request_weather(_method, _url) {
  $.ajax({
    method: _method,
    url: _url
  })
  .done((res) => {
    console.log("The request for :"+_url+ " has finished");
    console.log(res)
    var _humidity = res["main"]["humidity"]
    var _presure = res["main"]["pressure"]
    var _temp = res["main"]["temp"]
    var content  = "<li> <ul> Temperature: " + _temp  + "</ul>"+
                   "<ul>Pressure: " + _presure + "</ul>"+
                   "<ul> Humidity: " + _humidity +"<ul></li>"
    var img_w;
    if(_humidity < 10){
        img_w = "<img src=\"../static/img/sun.png\" width=\"120px\">"
    }else if (_humidity < 30){
        img_w = "<img src=\"../static/img/sun_clouds.png\" width=\"120px\">"
    }else if (_humidity < 50){
        img_w = "<img src=\"../static/img/raining.png\" width=\"120px\">"
    }else if (_humidity < 60){
        img_w = "<img src=\"../static/img/snow.png\" width=\"120px\">"
    }else {
        img_w = "<img src=\"../static/img/thunder.png\" width=\"120px\">"
    }

    document.getElementById("weather").innerHTML = "<center>"+ img_w +content + "</center>"
  })
  .fail((_, status, error) => {
    console.log(status)
    console.log(error)
  });
}

function createOrigin(location,_icon){

  let data = {
     position: location,
     map: map_data,
     icon: icon_origin,
     clickable: true,
     title: 'Click to get more information'
   }

   //intance the marker
   marker = new google.maps.Marker(data);
   marker.info = new google.maps.InfoWindow({
     content: ''
   });
   marker.data=  "The University";

   google.maps.event.addListener(marker, 'click', function() {

     var $toastContent = $("<span> You are going to study here</span>");
     Materialize.toast($toastContent, 5000);
     marker.info.setContent(this.data);
     marker.info.open(map, this);
   });


}



function createPoliceStations(location){

  let data = {
     position: location,
     map: map_data,
     icon: police,
     clickable: true,
     title: 'Click to get more information'
   }

   //intance the marker
   marker = new google.maps.Marker(data);
   marker.info = new google.maps.InfoWindow({
     content: ''
   });

   google.maps.event.addListener(marker, 'click', function() {
     var $toastContent = $("<span> Police station</span>");
     Materialize.toast($toastContent, 5000);
     request_weather("GET", "")
   });

}

function clusterMarkers(){
  var markerCluster = new MarkerClusterer(map_data, markers,
  {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

// Function for place a marker
function createMarkerHouses(location, info_location, _icon) {
    //Simulate omition parameters of python

    let l_aux = distance(location['lat'], location['lng'], _center['lat'], _center['lng'], 'K' )
  //  console.log(l_aux)
    if(l_aux > 0 && l_aux < 5){
        _icon = 0;
    }else if(l_aux >= 5 && l_aux < 10){
        _icon = 1;
    }else if(l_aux >= 10 && l_aux < 15){
        _icon = 2;
    }else{
        _icon = 3;
    }
    let data = {
       position: location,
       map: map_data,
       icon: houses[_icon],
       clickable: true,
       title: 'Click to get more information'
     }
    //intance the marker
    marker = new google.maps.Marker(data);

    marker.info = new google.maps.InfoWindow({
      content: ''
    });

    var img_house = 'https://maps.googleapis.com/maps/api/streetview?' +
                     'location=' + info_location["address"] +
                     '&size=150x150' +
                     '&key=AIzaSyAz5H70tw5BytlMLiZffXB79vtUO_YL3N8';


    marker.data=  "<center><img style=\"border-radius: 50%;\" src=\" "+img_house+"\" > <br><a class='waves-effect waves-light btn' href='#modal1'>Click me.</a> </center>";

    marker.vals = info_location
    marker.dista = l_aux

    markers.push(marker)

    let table_inf =
              "<center><h5>"+info_location["property_name"]+"</h5> </center>"+
              "<table>"+
                "<thead>"+
                  "<tr>"+
                      "<th>Attribute</th>"+
                      "<th>Value </th>"+
                   "</tr>"+
                 "</thead>"+
                  "<tbody>"+
                   "<tr>"+
                     "<td>Address</td>"+
                     "<td>"+info_location["address"]+"</td>"+
                   "</tr>"+
                   "<tr>"+
                     "<td>Comunity</td>"+
                     "<td>"+info_location["comunity"]+"</td>"+
                   "</tr>"+
                   "<tr>"+
                     "<td>Phone</td>"+
                     "<td>"+info_location["phone"]+"</td>"+
                   "</tr>"+
                   "<tr>"+
                     "<td>Zip Code</td>"+
                     "<td>"+info_location["zip_code"]+"</td>"+
                   "</tr>"+
                   "<tr>"+
                     "<td>Distance</td>"+
                     "<td>"+l_aux+" km</td>"+
                   "</tr>"+
                  "</tbody>"+
             "</table>"


    google.maps.event.addListener(marker, 'click', function() {
      var $toastContent = $("<span>"+this.vals["property_name"]+"</span>");
      Materialize.toast($toastContent, 5000);
      document.getElementById("address").innerHTML = table_inf
      marker.info.setContent(this.data);
      marker.info.open(map, this);

      request_weather("GET","/weatherzip/"+this.vals["zip_code"]);
    });

}

//function for show the different regions
function loadKmlLayer(src, map) {
  var kmlLayer = new google.maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: map
  });
  google.maps.event.addListener(kmlLayer, 'click', function(event) {
    var content = event.featureData.infoWindowHtml;
    alert(content)
  });
}

// Function for init a google maps map =}
function initMap() {
  // Instance the map
  div_map = document.getElementById("map")
  map_data = new google.maps.Map(div_map, config_mapa);
  createOrigin(_center ,4)
  console.log("The map has been loaded.")
  loadKmlLayer(kml_limitations, map_data);
}
