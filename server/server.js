

var express = require("express")
var request = require("request");
var morgan = require('morgan');
var parser = require('body-parser');
var redis = require("redis");
var client = redis.createClient();
module.exports = client;
var databaseStorage = require('./databaseStorage.js')


var app = express();
app.use(parser.json());

app.use(express.static(__dirname + "/../client"));
app.post('/Equations',function(req,res){
	var send = req.body.variable;
	var request_body = {};
	request_body.my_equations = [];
	request_body.wolframalpha_equations = []; 
	var equations = {};
	client.hkeys(send,function(err,obj){

			console.log("This is the array", obj);
		for(var i = 0;i<obj.length;i++){
			var j = i;
			(function(j){client.hmget(send,obj[j],function(err,obj2){
				console.log("This is the second obj",obj);
				equations[obj[j]] = obj2;
				request_body.my_equations.push(equations);
			})})(j)
		};
		// if(obj){
		// 	request_body.my_equations = equations;
		// }
	});
	request("http://api.wolframalpha.com/v2/query?input=" + send + "&appid=W6E9V9-JHER6QYU22", function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	  request_body.wolframalpha_equations = body
	  	  res.send(request_body);
	  }else{
	  	console.log("error not fiound");
	  }
	})
});

app.post('/',databaseStorage);

app.set("port", 3000);
var server = app.listen(3000,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});

