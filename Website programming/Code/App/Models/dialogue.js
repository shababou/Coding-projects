var mongoose = require('mongoose');

var schema = mongoose.Schema;


var dialogue = new schema
(
	{
		id_dialogue:{type:String, required:true},
		messages:[
			{
				id_message:{type:String, required:true}
			}],
	}
);


module.exports = mongoose.model("Dialogue", dialogue);