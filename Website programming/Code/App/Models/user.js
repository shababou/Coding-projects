var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema;


var user = new schema
(
	{
		username:{type:String, required:true, index:{unique:true}},
		password:{type:String, required:true, select:false},
		name:{type:String, required:true},
		first_name:{type:String, required:true},
		birthdate:{type:Date, required:false},
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
		email: {type: String,  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
		phone_number:{type:String, required:false},
		activity:{type:String},
		activity_place:{type:String},
		description:{type:String},
		src_photo:{type:String},
		inscription_date:{type:Date, default:Date.now},		
		skills:[{id_skill:{type:schema.Types.ObjectId, ref:'Topic'}}],
		linked_users:[
			{
				id_user:{type:schema.Types.ObjectId, ref:'User'},
				contact_date:{type:Date},
				network_status:{type:String}
			}],
		linked_teams:[
			{
				id_team:{type:String},
				contact_date:{type:Date},
				membership_status:{type:String}
			}]
	}
);


user.pre
(
	'save',
	function(next)
	{
		var user = this;

		if(!user.isModified('password')){return next();}
		bcrypt.hash
		(
			user.password,
			null,
			null,
			function(err, hash)
			{
				if(err){console.log("err");return next();}
				user.password = hash;
				next();
			}
		);
	}
);


user.methods.comparePassword = function(password)
{
	return bcrypt.compareSync(password, this.password);
};

user.methods.cryptPassword = function(password)
{
	bcrypt.hash
	(
		password,
		null,
		null,
		function(err, hash)
		{
			password = hash;
			return password;
		}
	);
}


module.exports = mongoose.model("User",user);