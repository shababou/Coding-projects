var mongoose = require('mongoose');

var schema = mongoose.Schema;


var mark = new schema
(
	{
		id_assessed:{type:String, default:""},
		id_assessor:{type:String, default:""},
		id_context:{type:String, default:""},
		type_context:{type:String, default:""},
		marks:[
			{
				id_criteria:{type:String, default:""},
				mark:{type:String}
			}],
	}
);


module.exports = mongoose.model("Mark", mark);