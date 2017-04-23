
$(document).ready(function(){
	if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
		Materialize.toast('Hi User, I hope that you are doing well!!!, for a better user experience I recommend you to use Firefox.', 10000);
	}
  $('.carousel').carousel();
});
