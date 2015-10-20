
//"http://api.wolframalpha.com/v2/query?" + send + "http:W6E9V9-JHER6QYU22"

 $(function(){
 	console.log("Here I am");
 	$(".equation_search").on('click',function(){
 		console.log("here I am")
 		var send = $('.equation_find').val();
	 	$.ajax({
	    url: 'http://127.0.0.1:3000/classes/messages',
	    type: 'POST',
	    //contentType: 'application/json',
	    cache: true,
	    success: function (data) {
	      console.log('success');
	      console.log(data)
	    },
	    error: function (data) {
	      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	      console.error('failed');
	    }
		})
	 })

 });