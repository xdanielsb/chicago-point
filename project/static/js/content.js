$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    Materialize.toast('Hello User, if you want further information of the property, click the property and you  will get more information as well as parks, health centers, police stations, libraries and  hospitals, Thanks for your visit.', 10000, 'rounded');

});
