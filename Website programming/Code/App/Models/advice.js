var mongoose = require('mongoose');

var schema = mongoose.Schema;


var advice = new schema
(
	{
		id_user:{type:String},
		emission_date:{type:Date, default:Date.now},
		text:{type:String, required:true}		
	}
);


module.exports = mongoose.model("Advice", advice);