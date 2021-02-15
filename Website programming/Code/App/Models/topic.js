var mongoose = require('mongoose');

var schema = mongoose.Schema;


var topic = new schema
(
	{
		name:{type:String, required:true},
		id_level:{type:String, default:""}
	}
);


module.exports = mongoose.model("Topic", topic);