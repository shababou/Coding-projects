var mongoose = require('mongoose');

var schema = mongoose.Schema;


var level = new schema
(
	{
		name:{type:String, required:true},
		id_category:{type:String, default:""}
	}
);


module.exports = mongoose.model("Level", level);