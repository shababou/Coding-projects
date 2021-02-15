var mongoose = require('mongoose');

var schema = mongoose.Schema;


var schedule = new schema
(
	{
		id_report:{type:String, default:""},
		schedules:[
			{
				id_topic:{type:String, default:""},
				id_format:{type:String, default:""},
				schedule:{type:Number}
			}],
	}
);


module.exports = mongoose.model("Schedule", schedule);