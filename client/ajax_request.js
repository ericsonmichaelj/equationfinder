
//"http://api.wolframalpha.com/v2/query?" + send + "http:W6E9V9-JHER6QYU22"
function addLoader(element) {
  $(element).append('<div class="loader"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i>' + 
    '<span class="sr-only">Loading...</span></div>')
}
function removeLoader() {
  $('.loader').remove()
} 

function parseAllTheThings(data){
  $("#equations").html("")
  xmlDoc = $.parseXML(data.wolframalpha_equations),
  $xml = $(xmlDoc),
  $equations = $xml.find('pod[title="Equation"]');
  $image = $equations.find("img");
  if ($image.attr("src")) {
    $("#equations").append("<img src=" + $image.attr("src") + "/>")
  }
  console.log(data.my_equations[0])
  if (!$image.attr("src") && !data.my_equations[0]){
    $("#equations").append("<p class='error'>" + 
      "Sorry, nothing in our database matches your search. You can submit an equation to our" +
      " database below")
    return
  }
  for (var property in data.my_equations[0]) {
    $("#equations").append("<p>\\(" + property + "\\)</p>");
    $("#equations").append("The variables used are " + data.my_equations[0][property][0].substring(0, data.my_equations[0][property][0].length - 1));
  }

  MathJax.Hub.Typeset()
}

function handlEquationSearch() {
  $(".equation_search").attr("disabled", true)
  addLoader('#results')
  var variable = $('.equation_find').val();
  var send = $('.equation_find').val();
  var data = { variable: send };
  $.ajax({
    url: '/Equations',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    // cache: true,
    success: function(data) {
        parseAllTheThings(data);
        $(".equation_search").attr("disabled", false);
        removeLoader();
    },
    error: function(data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        $(".equation_search").attr("disabled", false);
        removeLoader();
    }
  })
}
function handleSubmitEquation() {
  addLoader('#submit-equation-section')
  var $variables = $('.variable');
  var equation = $('.equation').val();
  var data = {};
  data[equation] =[];
  var equation = data[equation];
  for(var i = 0;i<$variables.length;i++){
      var variable_value = $($variables[i]).val();
      equation.push(variable_value); 
    }
  $.ajax({
    url: '/',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    // cache: true,
    success: function (data) {
      console.log('success')
      $.notify('Equation successfully added', 'success')
      removeLoader();
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      $.notify('Error in installing equation', 'error');
      removeLoader();
    }
  })
}

 $(function(){
 	$(".equation_search").on('click', handlEquationSearch)
 	$(".submit_equation").on('click',handleSubmitEquation)
 });