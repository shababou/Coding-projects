var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema;


var offer = new schema
(
	{
		id_request:{type:String, required:true},
		emission_date:{type:Date, default:Date.now, required:true},	
		id_teacher:{type:String, required:true},
		RDV_datas:
		{
			open:{type:Boolean, required:true},
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
			selected_address:{type:Number, required:false},
			time_slots:[
				{
					duration:{type:Number, default:2, required:false},
					date_slot:{type:String, required:false}
				}],
			selected_time_slot:{type:Number, default:0, required:false},
			nb_participants:{type:Number, default:1, required:false},
			participants:[
				{
					id_user:{type:String, required:false}
				}
			],
			description:{type:String, default:"", required:false},
			price:{type:Number, drequired:false},
			status:{type:String, default:'New', required:true},
		},
		Chat_datas:
		{
			open:{type:Boolean, required:true},
			status:{type:String, default:'New', required:true}
		}
	}
);


module.exports = mongoose.model("Offer",offer);