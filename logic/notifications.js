setTimeout(greeting, 3000)
setTimeout(remind, 4000)

function greeting(){
$.notify({
	icon: 'https://avatars2.githubusercontent.com/u/17663363?v=3&s=460',
	title: '  Daniel Santos',
	message: '  Hello, Welcome'
},{
	type: 'minimalist',
	delay: 3000,
	icon_type: 'image',
	template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
		'<img data-notify="icon"  height="50px" class="img-circle pull-left">' +
		'<span data-notify="title">&nbsp&nbsp<strong>{1}</strong></span><br>' +
		'<span data-notify="message">&nbsp&nbsp{2}</span>' +
	'</div>'
});
}

function remind (){
  $.notify({
  	icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Crystal_Clear_app_bell.png',
  	title: 'Remind',
  	message: 'User dont forget click the images in order to get more information.'
  },{
  	type: 'minimalist',
  	delay: 5000,
  	icon_type: 'image',
  	template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
  		'<img data-notify="icon"  height="50px" class="img-circle pull-left">' +
  		'<span data-notify="title">&nbsp&nbsp<strong>{1}</strong></span><br>' +
  		'<span data-notify="message">&nbsp&nbsp{2}</span>' +
  	'</div>'
  });
}
