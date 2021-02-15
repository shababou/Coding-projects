var mongoose = require('mongoose');

var schema = mongoose.Schema;


var subject = new schema
(
	{
		name:{type:String, required:true},
		id_topic:{type:String, default:""}		
	}
);


module.exports = mongoose.model("Subject", subject);