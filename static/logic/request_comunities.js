'use strict'

function create_table_health(response){
  console.log("Creating table comunities")

  let result = jQuery.parseJSON(response)
  let _community_area = result["community_area"]
  let _cancer_all_sites = result["cancer_all_sites"]
  let _below_poverty_level = result["below_poverty_level"]
  let _birth_rate = result["birth_rate"]
  let _per_capita_income = result["per_capita_income"]
  let _community_area_name = result["community_area_name"]
  let _crowded_housing = result["crowded_housing"]
  let _infant_mortality_rate = result["infant_mortality_rate"]
  let _assault_homicide = result["assault_homicide"]
  let _unemployment = result["unemployment"]

  var dataset = []

  // Iterate over the table
  for (var key in _community_area){
    var row = [_community_area[key],  _community_area_name[key], _cancer_all_sites[key], _below_poverty_level[key],_birth_rate[key], _per_capita_income[key] , _crowded_housing[key], _infant_mortality_rate[key] , _assault_homicide[key], _unemployment[key]]
    dataset.push(row)
  }

  // Print the dataset on console
  //console.log(dataset)

  // Creating the table
  var table = $('#comunitiesdt').DataTable({
    data: dataset,
    columns: [
      { title: "Community area code" },
      { title: "Comunity area name" },
      { title: "Rate Cancer" },
      { title: "Below Poverty level" },
      { title: "Birth Rate" },
      { title: "Per Capita Income" },
      { title: "Crowed housing" },
      { title: "Infant mortality rate" },
      { title: "Assaul homicide" },
      { title: "unemployment" }
    ]
  });

}


//Create ajax JQuery request without token
function request_info_comunities(_method, _url) {
  $.ajax({
    method: _method,
    url: _url
  })
  .done((res) => {
    console.log("The request for :"+_url+ " has finished");
    create_table_health(res)

  })
  .fail((_, status, error) => {
    console.log(status)
    console.log(error)
  });
}

request_info_comunities("GET", "/info_comunities/")
