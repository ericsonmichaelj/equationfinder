var client = require("./server.js")


module.exports = function(req,res){
	data = req.body;
	var hash_key;
	for(property in req.body){
		hash_key = property; 
	}
	var variables = data[hash_key];
	for(var i = 0;i<variables.length;i++){
	client.hset(variables[i],hash_key,variables);
	}
  res.send()
}