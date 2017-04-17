
function hideStations(){
  for (var i = 0; i < police_stations_a.length; i++) {
      police_stations_a[i].setVisible(visible_stations);
   }
}
$("#police_checkbox").click(function() {
    visible_stations = !visible_stations
    hideStations();
});

function hideParks(){
  for (var i = 0; i < parks_a.length; i++) {
      parks_a[i].setVisible(visible_parks);
   }
}
$("#parks_checkbox").click(function() {
    visible_parks = !visible_parks
    hideParks();
});
