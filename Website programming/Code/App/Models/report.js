var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema;


var report = new schema
(
	{
		id_offer:{type:String},
		start_time:{type:Date, default:""},
		end_time:{type:Date, default:""},	
		selected_address:{type:Number},
		id_teacher:{type:String},
		participants:[
			{
				id_user:{type:String},
				presence:{type:Boolean},
				paiement:{type:Number},
				complementary_datas:
				{
					general_comment:{type:String},
					status:{type:String, default:"New"}
				}
			}],
		general_comment:{type:String},
		status:{type:String, default:"New"}
	}
);


module.exports = mongoose.model("Report", report);


	
		