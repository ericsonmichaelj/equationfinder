var equations = {};

$(function() {
    $(".submit_equation").on('click',function(){
    	var $variables = $('.variable');
    	var equation = $('.equation').val(); 
    	for(var i = 0;i<$variables.length;i++){
    		var variable_value = $($variables[i]).val()
    		if(variable_value){
	    		if(!equations[variable_value]){
	    			var object = {};
	    			object[equation] = true;
	    			equations[variable_value] = object;
	    		}else{
	    			if(!equations[variable_value][equation]){
	    				equations[variable_value][equation] = true;
	    			}
	    		}
    		}
    	}
    	console.log("Final equations",equations);
    })
    $(".equation_search").on('click',function(){
    	var variable = $('.equation_find').val();
    	$("#equations").html("");
    	for (var equation in equations[variable]){
    		//console.log(equation)

    		$("#equations").append("<p>" + equation + "</p>");
    	}
    })
});
