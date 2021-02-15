var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema;


var request = new schema
(
	{
		target_date:{type:String, required:true},
		emission_date:{type:Date, default:Date.now},	
		id_student:{type:schema.Types.ObjectId, ref:'User'},
		address:
		{
			number:{type:String, required:false},
			route:{type:String, required:false},
			ZIP:{type:String, required:false},
			city:{type:String, required:false},
			country:{type:String, required:false},
			latitude:{type:Number, required:false},
			longitude:{type:Number, required:false},
		},
		contents:[
			{
				id_category:{type:String, default:''},
				datas:[{
					id_format:{type:String, default:''},
					id_level:{type:String, default:''},
					id_topic:{type:String, default:''},
					subjects:[{id_subject:{type:String, default:''}}],
					other:{type:String, required:false, default:""}
				}]
			}],
		nb_participants:{type:Number, default:1},
		description:{type:String, required:false, default:""},
		linked_teams:[
			{
				id_team:{type:String}
			}]
	}
);


module.exports = mongoose.model("Request",request);