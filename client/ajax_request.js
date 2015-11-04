
//"http://api.wolframalpha.com/v2/query?" + send + "http:W6E9V9-JHER6QYU22"

 $(function(){
 	function parseAllTheThings(data){
 		$("#equations").html("")
 		xmlDoc = $.parseXML( data.wolframalpha_equations),
  		$xml = $( xmlDoc ),
  		$equations = $xml.find( 'pod[title="Equation"]' );
  		$image = $equations.find("img");
  		if($image.attr("src")){
	  		$("#equations").append("<img src=" + $image.attr("src") +"/>")
	 		}
	 		console.log(data.my_equations);

	 			for(var property in data.my_equations[0]){
	 			$("#equations").append("<p>\\(" + property + "\\)</p>");
	 			$("#equations").append("The variables used are " + data.my_equations[0][property][0].substring(0,data.my_equations[0][property][0].length-1));
	 			}	
	 		
	 		MathJax.Hub.Typeset()
 		}
 	
 	$(".equation_search").on('click',function(){
    	var variable = $('.equation_find').val();
 		var send = $('.equation_find').val();
 		var data = {variable: send};
 		console.log("This is the data", data);
	 	$.ajax({
	    url: 'http://localhost:3000/Equations',
	    type: 'POST',
	    data: JSON.stringify(data),
	    contentType: 'application/json',
	    // cache: true,
	    success: function (data) {
	      parseAllTheThings(data);
	    },
	    error: function (data) {
	      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	      console.error('failed');
	    }
		})
	 })
 	$(".submit_equation").on('click',function(){
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
	    url: 'http://localhost:3000/',
	    type: 'POST',
	    data: JSON.stringify(data),
	    contentType: 'application/json',
	    // cache: true,
	    success: function (data) {
	      console.log("success")
	    },
	    error: function (data) {
	      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	      console.error('failed');
	    }
		})   		
 	});

 });