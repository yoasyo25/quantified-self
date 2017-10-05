$(document).ready(function () {
  var api =
    "http://quantified-self-mc-ya.herokuapp.com/api/v1/foods"
    $.getJSON(api, function(data) {
      var foods = []
        $.each( data, function( key, val ) {
          var food = foods.push(val["name"])
          var calories = foods.push(val["calories"])
          foods.push( "<tr><td id='" + key + "'>" + val['name'] + "</td><td id='" + key + "'>" + val['calories'] + "</td><td id='" + key + "'>" + document.createElement("BUTTON") + "</td></tr>" );
        });

      foods.forEach(function(food) {
        $("#t-body").append(food)
      });
    });
});


////var getFood = function(){ var api =
    //"http://quantified-self-mc-ya.herokuapp.com/api/v1/foods"
    //$.getJSON(api, function(data) {
      //var foods = []
        //$.each( data, function( key, val, id ) {
        //var food = foods.push(val['name']) });
    //}; 
    //}
