$(document).ready(function () {
  var api =
    "http://quantified-self-mc-ya.herokuapp.com/api/v1/foods"
    $.getJSON(api, function(data) {
      var foods = []
        $.each( data, function( key, val ) {
          foods.push( "<tr><td id='" + key + "'>" + val['name'] + "</td><td id='" + key + "'>" + val['calories'] + "</td><td id='" + key + "'>" + "<button type='button'>delete</button>" + "</td></tr>" );
        });

      foods.forEach(function(food) {
        $("#t-body").append(food)
      });
    });
});

var getFood = function(){
  var calories = $('input[name="calories"]').val();
  var name = $('input[name="food"]').val();
  var api = "http://quantified-self-mc-ya.herokuapp.com/api/v1/foods"
    $.post( api, {food: {
      name: name,
      calories: calories}, success: function() {
  $(document).ajaxStop(function(){
        window.location.reload();
  });
      }
      });
};


$('.food-form').on('submit', getFood);

$("form").submit(function( event ){
  event.preventDefault();
});

