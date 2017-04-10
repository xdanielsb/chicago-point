'use strict'
/*
 * Depend on: No local
 * These methods are called when the promises are getting by the
 * request api.
 */


let dataset = []


/*
 * This function consume the apartments avaliable for renting
 */

function insert_markers_locations(response){
  console.log("Inserting markers")

  let result = jQuery.parseJSON(response)
  //console.log(result)
  let lats = result['latitude']
  let longs = result['longitude']
  for (var key in lats){
    var location = {lat: lats[key], lng: longs[key]}
  //  console.log(location)
    createMarker(location, key)
  }

}
