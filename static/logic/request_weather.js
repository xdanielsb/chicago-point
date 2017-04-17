//Create ajax JQuery request without token
function request_weather(_method, _url) {
  $.ajax({
    method: _method,
    url: _url
  })
  .done((res) => {
    console.log("The request for :"+_url+ " has finished");
//    console.log(res)
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
    let id_div_weather = "weather"
    document.getElementById(id_div_weather).innerHTML = "<center>"+ img_w +content + "</center>"
  })
  .fail((_, status, error) => {
    console.log(status)
    console.log(error)
  });
}
