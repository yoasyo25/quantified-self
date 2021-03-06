const api = ("http://quantified-self-mc-ya.herokuapp.com/api/v1/meals")
const api2 = ("http://quantified-self-mc-ya.herokuapp.com/api/v1/foods")
const $ = require('jquery');

function buildTable() {
  $.getJSON(api2, function(data) {
    var foods = []
      $.each( data, function( key, val ) {
        foods.push( "<tr><td data-editable id='" + val['id'] + "'>" + val['name'] + "</td><td data-editable id='" + key + "'>" + val['calories'] + "</td><td id='" + key + "'>" + "<input type='checkbox' id='" + key + "' class='checkfood'></button>" + "</td></tr>" );

                  
      });

    foods.forEach(function(food) {
      $("#t2-body").prepend(food)
    });
  });
}

function getMeals() {
  $.get(api)
    .then(function(meals) {
      let totals = {}
      let remainingCalories= {
        Breakfast: 400,
        Lunch: 600,
        Dinner: 800,
        Snack: 200
      }
      buildTables(meals, totals, remainingCalories);
    });
};

function buildTables(meals, totals, remainingCalories) {
  meals.forEach(function(meal) {
    meal.foods.reverse().forEach(function(food) {
      $(`.${meal.name}`).prepend(`<tr><td>${food.name}</td><td>${food.calories}</td><td><button type=button class=deleteButton>-</button></td></tr>`)
        totals[meal.name] = totals[meal.name] || 0
        totals[meal.name] += food.calories
    })
  })
  Object.keys(totals).forEach(function(key){
    let calorieNumber = remainingCalories[key] - totals[key]
      $(`.${key}`).append(`<tr class='backgroundt'><td>Total Calories</td><td>${totals[key]}</td></tr>`)
      $(`.${key}`).append(`<tr class='backgroundt'><td>Remaining Calories</td><td style="color:${getColor(calorieNumber)}">${calorieNumber}</td></tr>`)

  })
  getTotals(remainingCalories, totals)
};


function search() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput2");
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

function getColor(number) {
  if (number < 0) {
    return 'red'
  } else {
    return 'green'
  }
}

function getTotals(goal, used) {
  let goalCalories = sum(goal)
    let caloriesEaten = sum(used)
    let remainingCalories = goalCalories - caloriesEaten
    $('.totals').append(`<tr><td>Goal Calories</td><td>${goalCalories}</td></tr>`)
    $('.totals').append(`<tr><td>Calories Consumed</td><td>${caloriesEaten}</td></tr>`)
    $('.totals').append(`<tr><td>Remaining Calories</td><td style="color:${getColor(remainingCalories)}">${remainingCalories}</td></tr>`)

}

function sum(num) {
  return Object.keys(num)
    .reduce( function( sum, key ){
      return sum + parseFloat( num[key] );
    }, 0 );
}

//Refactor Tractor
$(document).ready(function() {
  $(".btnBreak").click(function(){
    let a = $('.checkfood')
      for (var i = 0; i < a.length; i++) {
        if (a[i].checked == true) {
          var foodId = a[i].parentElement.parentElement.children[0].id
          var mealId = 1
        }
      }
        addFoodToMeal(mealId, foodId);
  });
});


$(document).ready(function() {
  $(".btnLun").click(function(){
    let a = $('.checkfood')
      for (var i = 0; i < a.length; i++) {
        if (a[i].checked == true) {
          var foodId = a[i].parentElement.parentElement.children[0].id
          var mealId = 2 
        }
      }
        addFoodToMeal(mealId, foodId);
  });
});

$(document).ready(function() {
  $(".btnDin").click(function(){
    let a = $('.checkfood')
      for (var i = 0; i < a.length; i++) {
        if (a[i].checked == true) {
          var foodId = a[i].parentElement.parentElement.children[0].id
          var mealId = 4
        }
      }
        addFoodToMeal(mealId, foodId);
  });
});


$(document).ready(function() {
  $(".btnSna").click(function(){
    let a = $('.checkfood')
      for (var i = 0; i < a.length; i++) {
        if (a[i].checked == true) {
          var foodId = a[i].parentElement.parentElement.children[0].id
          var mealId = 2
        }
      }
        addFoodToMeal(mealId, foodId);
  });
});

function addFoodToMeal(mealId, foodId) {
  $.post(api + `/${mealId}/foods/${foodId}`)

}

getMeals();
buildTable();

$("#myInput2").on('keyup', function() {
  search()
});

