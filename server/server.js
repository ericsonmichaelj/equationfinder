var express = require("express")
var request = require("request");
var app = express();


app.use(express.static(__dirname + "/../client"));
app.post('/',function(req,res){
	console.log("Hello world");
	res.send();
});
app.set("port", 3000);
var server = app.listen(3000,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});

