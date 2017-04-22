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
   });

   police_stations_a.push(marker)
}

function createHealthCenters(location){

  let data = {
     position: location,
     map: map_data,
     icon: hospital,
     clickable: true,
     title: 'Click to get more information'
   }

   //intance the marker
   marker = new google.maps.Marker(data);
   marker.info = new google.maps.InfoWindow({
     content: ''
   });

   google.maps.event.addListener(marker, 'click', function() {
     var $toastContent = $("<span> Health center</span>");
     Materialize.toast($toastContent, 5000);
   });

   health_centers_a.push(marker)
}

function createLibraries(location){

  let data = {
     position: location,
     map: map_data,
     icon: library,
     clickable: true,
     title: 'Click to get more information'
   }

   //intance the marker
   marker = new google.maps.Marker(data);
   marker.info = new google.maps.InfoWindow({
     content: ''
   });

   google.maps.event.addListener(marker, 'click', function() {
     var $toastContent = $("<span> Health center</span>");
     Materialize.toast($toastContent, 5000);
   });

   libraries_a.push(marker)
}


function createParks(location, name){
  //console.log(location)
  let data = {
     position: location,
     map: map_data,
     icon: park,
     clickable: true,
     title: 'Click to get more information'
   }

   //intance the marker
   marker = new google.maps.Marker(data);
   marker.info = new google.maps.InfoWindow({
     content: ''
   });

   google.maps.event.addListener(marker, 'click', function() {
     var $toastContent = $("<span> Park: "+name+" </span>");
     Materialize.toast($toastContent, 5000);
   });

   parks_a.push(marker)



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


    marker.data=  "<center><img  data-caption='A picture of the house' width='120'  src=\" "+img_house+"\" > <br><a class='btn' href='#modal1'>Details.</a> </center>";

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
                     "<td> <i class='material-icons left'>phone</i> "+info_location["phone"]+"</td>"+
                   "</tr>"+
                   "<tr>"+
                     "<td>Zip Code</td>"+
                     "<td>"+info_location["zip_code"]+"</td>"+
                   "</tr>"+
                   "<tr>"+
                     "<td>Distance</td>"+
                     "<td>"+parseFloat(l_aux).toPrecision(3)+" km</td>"+
                   "</tr>"+
                   "<tr>"+
                     "<td>Cost 1 Bed Per/month /'Comunity'</td>"+
                     "<td>"+info_location["cost_1bed"]+" $</td>"+
                   "</tr>"+
                   "<tr>"+
                     "<td>Cost 2 Beds Per/month 'Comunity'</td>"+
                     "<td>"+info_location["cost_2bed"] +" $</td>"+
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
      calcRoute(this.position);
    });

}
