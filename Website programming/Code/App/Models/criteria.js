var mongoose = require('mongoose');

var schema = mongoose.Schema;


var criteria = new schema
(
	{
		name:{type:String, required:true},
		role:{type:String, required:true},
		type_offer:{type:String, required:true},
		id_category:{type:String, default:""}
	}
);


module.exports = mongoose.model("Criteria", criteria);