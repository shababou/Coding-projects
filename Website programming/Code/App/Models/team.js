var mongoose = require('mongoose');
var schema = mongoose.Schema;


var team = new schema
(
	{
		name:{type:String, required:true, index:{unique:true}},
		id_founder:{type:String, required:true},
		captains:[
			{
				id_user:{type:String},
				captaincy_status:{type:String}
			}],
		first_color:{type:String},
		second_color:{type:String},
		src_photo:{type:String},
		foundation_date:{type:Date, default:Date.now},
		linked_users:[
			{
				id_user:{type:String},
				contact_date:{type:Date},
				membership_status:{type:String}
			}],
		private:{type:Boolean, required:true}
	}
);


module.exports = mongoose.model("Team", team);