var mongoose = require('mongoose');

var schema = mongoose.Schema;


var category = new schema
(
	{
		name:{type:String, required:true, index:{unique:true}}
	}
);


module.exports = mongoose.model("Category", category);