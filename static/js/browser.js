'use strict'

$(document).ready(function(){
	
  $('.carousel').carousel();

	$('#content').on('click touchstart', function() {
			document.location.href = "/content/";
	});
	$('#charts').on('click touchstart', function() {
			document.location.href = "/charts/";
	});
	$('#about').on('click touchstart', function() {
			document.location.href = "/about/";
	});

});
