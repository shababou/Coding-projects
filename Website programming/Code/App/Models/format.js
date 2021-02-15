var mongoose = require('mongoose');

var schema = mongoose.Schema;


var format = new schema
(
	{
		name:{type:String, required:true},
		id_level:{type:String, default:""}
	}
);


module.exports = mongoose.model("Format", format);