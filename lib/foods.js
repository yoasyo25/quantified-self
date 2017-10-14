const api = ("http://quantified-self-mc-ya.herokuapp.com/api/v1/foods")
//fix api url tak eout foods
//refactor after certain amount of stories
//go back to refactor if you see it during new story

function buildTable() {
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
}

function getFood() {
  var calories = $('input[name="calories"]').val();
  var name = $('input[name="food"]').val();
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

function editTable() {
  $('#myTable').on('click', '[data-editable]', function(event){
  var $el = $(this); 
  var $input = $('<input/>').val( $el.text() );
  $el.replaceWith( $input );
  var save = function(){
    var $p = $('<td data-editable />').text( $input.val() );
    $input.replaceWith( $p );
    var fname = ($p[0].innerText);
    var cname = ($p[0].parentNode.cells[1].innerText);
    var apii = "http://quantified-self-mc-ya.herokuapp.com" + `/api/v1/foods/${event.target.id}`
      $.ajax({
        url: apii,
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
}

function search() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};


buildTable();
editTable();

$("#myInput").on('keyup', function() {
  search()
});

$('.food-form').on('submit', getFood);

$("form").submit(function( event ){
  event.preventDefault();
});

