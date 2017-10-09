$(document).ready(function () {
  var api =
    "http://quantified-self-mc-ya.herokuapp.com/api/v1/foods"
    $.getJSON(api, function(data) {
      var foods = []
        $.each( data, function( key, val ) {
          foods.push( "<tr><td data-editable id='" + key + "'>" + val['name'] + "</td><td data-editable id='" + key + "'>" + val['calories'] + "</td><td id='" + key + "'>" + "<button type='button' id='" + key + "' class='deleteButton'>delete</button>" + "</td></tr>" );
        });

      foods.forEach(function(food) {
        $("#t-body").prepend(food)
      });
      deleteFoodListener();
    });
});

var getFood = function(){
  var calories = $('input[name="calories"]').val();
  var name = $('input[name="food"]').val();
  var api = "http://quantified-self-mc-ya.herokuapp.com/api/v1/foods"
    if (name.trim() === "") {
      $(".food-error").remove();
      $(".food-input").append('<p id="food-error">Please enter a food name</p>')
    } else if (calories.trim() === "") {
      $(".food-error").remove();
      $(".calories-error").remove();
      $(".calories-input").append('<p id="calories-error">Please enter a calorie amount</p>')
    } else {
      $(".calories-error").remove();
$.post( api, {food: {
  name: name,
  calories: calories}, success: function() {
    $(document).ajaxStop(function(){
      window.location.reload();
    });
    deleteFoodListener();
  }
});
    }
};


function deleteFoodListener() {
  $('.deleteButton').on('click', function(event) {
    console.log(event.target);
    $.ajax({
      type: 'DELETE',
      url: "http://quantified-self-mc-ya.herokuapp.com" + `/api/v1/foods/${event.target.id}`,
      success: $(`${event.target.id}`).hide()
    });
  });
};

//$('#myTable').click(function () {
  //$().closest('td').data("id").each(function () {
    //var html = $(this).html();
    //var input = $('<input type="text" />');
    //input.val(html);
    //$(this).html(input);
  //});
//});

$('#myTable').on('click', '[data-editable]', function(event){

  var $el = $(this);

  var $input = $('<input/>').val( $el.text() );
  $el.replaceWith( $input );

  var save = function(){
    var $p = $('<td data-editable />').text( $input.val() );
    $input.replaceWith( $p );
    var fname = ($p[0].innerText);
    var cname = ($p[0].parentNode.cells[1].innerText);
    var api = "http://quantified-self-mc-ya.herokuapp.com" + `/api/v1/foods/${event.target.id}`
      $.ajax({
        url: api,
        type: 'PATCH',
        data: {food: {
  name: fname,
  calories: cname},
        success: function(res) {

        }
        }
      });

  };

  $input.one('blur', save).focus();

});


$('.food-form').on('submit', getFood);

$("form").submit(function( event ){
  event.preventDefault();
});

