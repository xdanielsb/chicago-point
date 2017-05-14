'use strict'
let active_circle;

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

   var circle = new google.maps.Circle({
					strokeColor: 'rgb(10, 74, 241)',
					strokeOpacity: 0.5,
					strokeWeight: 2,
					fillColor: 'rgb(73, 151, 195)',
					fillOpacity: 0.1,
					map: map_data,
					center: location,
					radius: 777
		});
    marker.circle = circle;
    active_circle = circle;

   google.maps.event.addListener(marker, 'click', function() {
     var $toastContent = $("<span> You are going to study here</span>");
     Materialize.toast($toastContent, 5000);
     active_circle.setOptions({ visible: false });
     this.circle.setOptions({visible: true});
     active_circle = this.circle;
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
     var $toastContent = $("<span> Library </span>");
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

    let l_aux = info_location['distance']
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

    var circle = new google.maps.Circle({
 					strokeColor: 'rgb(10, 74, 241)',
 					strokeOpacity: 0.5,
 					strokeWeight: 2,
 					fillColor: 'rgb(73, 151, 195)',
 					fillOpacity: 0.1,
 					map: map_data,
 					center: location,
 					radius: 777,
          visible: false
 		});
    marker.circle = circle;

    markers.push(marker)

    let dis = parseFloat(l_aux).toPrecision(3)
    let por_des = parseFloat((dis/20.0)*100).toPrecision(2)
    let por_c1 =  parseFloat((info_location["cost_1bed"]/3000) *100).toPrecision(2)
    let por_c2 =  parseFloat((info_location["cost_2bed"]/3000) *100).toPrecision(2)
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
                  "</tbody>"+
             "</table>"+
             "<br>Distance: <br>"+dis+" km <i class='material-icons left'>directions_run</i> <br>"+
             "<div class='w3-light-grey w3-round'> "+
                "<div class='w3-container w3-green w3-round' style='width:"+por_des+"%'>"+por_des+"%</div>"+
              "</div>"+
             "<br>Cost 1 Bed Per/month 'Comunity': <i class='material-icons left'>attach_money</i> <br>"+info_location["cost_1bed"]+" $<br>"+
              "<div class='w3-light-grey w3-round'> "+
                 "<div class='w3-container w3-blue w3-round' style='width:"+por_c1+"%'>"+por_c1+"%</div>"+
               "</div>"+
              "<br>Cost 2 Beds Per/month 'Comunity': <i class='material-icons left'>attach_money</i> <br>"+info_location["cost_2bed"]+" $<br>"+
               "<div class='w3-light-grey w3-round'> "+
                  "<div class='w3-container w3-red w3-round' style='width:"+por_c2+"%'>"+por_c2+"%</div>"+
                "</div>"


    google.maps.event.addListener(marker, 'click', function() {
      var $toastContent = $("<span>"+this.vals["property_name"]+"</span>");
      Materialize.toast($toastContent, 5000);
      document.getElementById("address").innerHTML = table_inf
      marker.info.setContent(this.data);
      marker.info.open(map, this);

      request_weather("GET","/weatherzip/"+this.vals["zip_code"]);
      calcRoute(this.position);

      active_circle.setOptions({ visible: false });
      this.circle.setOptions({visible: true});
      active_circle = this.circle;
    });

}
