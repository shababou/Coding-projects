var mongoose = require('mongoose');

var schema = mongoose.Schema;


var message = new schema
(
	{
		id_user:{type:String, required:true},
		message:{type:String},
		emission_date:{type:Date},
	}
);


module.exports = mongoose.model("Message", message);