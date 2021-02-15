var mongoose = require('mongoose');

var schema = mongoose.Schema;


var comment = new schema
(
	{
		id_assessed:{type:String, default:""},
		id_assessor:{type:String, default:""},
		id_report:{type:String, default:""},
		comment:{type:String, default:""}
	}
);


module.exports = mongoose.model("Comment", comment);