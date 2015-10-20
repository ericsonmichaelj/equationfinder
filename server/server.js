

var express = require("express")
var request = require("request");
var $       = require("jquery") 
var morgan = require('morgan');
var parser = require('body-parser');

var app = express();
app.use(parser.json());

app.use(express.static(__dirname + "/../client"));
app.post('/',function(req,res){
	var send = req.body.variable;
	request("http://api.wolframalpha.com/v2/query?input=" + send + "&appid=W6E9V9-JHER6QYU22", function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	  res.send(body);
	  }else{
	  	console.log("error not fiound");
	  }
})
});
app.set("port", 3000);
var server = app.listen(3000,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});

