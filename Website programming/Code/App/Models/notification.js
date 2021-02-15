var mongoose = require('mongoose');

var schema = mongoose.Schema;


var notification = new schema
(
	{
		id_receiver:{type:String, required:true},
		id_emitter:{type:String, required:true},
		id_action:{type:String, required:true},
		cat:{type:String, required:true},
		type:{type:String, required:false},
		subtype:{type:String, required:false},
		emission_date:{type:Date, required:true},
		state:{type:String, default:"New", required:true}
	}
);


module.exports = mongoose.model("Notification", notification);

