var bcrypt = require('bcrypt-nodejs');
var config = require('../../config');

var Subject = require('../Models/subject');
var Topic = require('../Models/topic');
var Level = require('../Models/level');
var Category = require('../Models/category');
var Criteria = require('../Models/criteria');
var Format = require('../Models/format');
var User = require('../Models/user');
var Request = require('../Models/request');
var Offer = require('../Models/offer');
var Notification = require('../Models/notification');
var Report = require('../Models/report');
var Mark = require('../Models/mark');
var Comment = require('../Models/comment');
var Schedule = require('../Models/schedule');
var Team = require('../Models/team');
var Advice = require('../Models/advice');
var Message = require('../Models/message');
var Dialogue = require('../Models/dialogue');

var secret_key = config.secret_key;
var admin_pass = config.admin_pass;
var admin_username = config.admin_username;
var admin = {_id:""};

var fs = require("fs");
var multer  = require('multer');
var ephemeric_storage_photos_users = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'Public/Photos_users')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
});
var ephemeric_upload_photos_users = multer({ storage: ephemeric_storage_photos_users });
var ephemeric_storage_photos_teams = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'Public/Photos_teams')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
});
var ephemeric_upload_photos_teams = multer({ storage: ephemeric_storage_photos_teams });

var AWS = require('aws-sdk');
var bucket_name = "help-teacher";
var bucket_root_path = "https://s3." + config.aws_region + ".amazonaws.com/" + bucket_name;
var bucket_path_users_photos = "users/photos";
var bucket_path_teams_photos = "teams/photos";

AWS.config.update({
    "accessKeyId":config.aws_access_key_id,
    "secretAccessKey":config.aws_secret_access_key,
    "region":config.aws_region
});
var s3 = new AWS.S3();



var jsonwebtoken = require('jsonwebtoken');
function createToken(user)
{
	var token = jsonwebtoken.sign({
		user:user
	}, secret_key);
	
	return token;
}

var user_parameters = Object.keys(User.schema.paths);
var user_parameters_simplified = ["username", "profile", "id_level", "activity"];
var user_parameters_without_pass = [];
for (var i=0; i < user_parameters.length; i++)
{
	if(user_parameters[i]!="password"){user_parameters_without_pass.push(user_parameters[i]);}
}
var category_parameters = Object.keys(Category.schema.paths);
var criteria_parameters = Object.keys(Criteria.schema.paths);
var level_parameters = Object.keys(Level.schema.paths);
var format_parameters = Object.keys(Format.schema.paths);
var topic_parameters = Object.keys(Topic.schema.paths);
var subject_parameters = Object.keys(Subject.schema.paths);
var request_parameters = Object.keys(Request.schema.paths);
var offer_parameters = Object.keys(Offer.schema.paths);
var notification_parameters = Object.keys(Notification.schema.paths);
var report_parameters = Object.keys(Report.schema.paths);
var mark_parameters = Object.keys(Mark.schema.paths);
var comment_parameters = Object.keys(Comment.schema.paths);
var schedule_parameters = Object.keys(Schedule.schema.paths);
var team_parameters = Object.keys(Team.schema.paths);
var advice_parameters = Object.keys(Advice.schema.paths);
var message_parameters = Object.keys(Message.schema.paths);
var dialogue_parameters = Object.keys(Dialogue.schema.paths);



module.exports = function(app, express)
{
	var api = express.Router();
	

//////////////////////////////////////// PUBLIC ROUTES //////////////////////////////////////////////////////////////////
	
	api.post('/signup', function(req, res){
		var new_user = new User(req.body);
		var token = createToken(new_user);
		new_user.save(function(err){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when signing new user"
				});
			}
			else
			{
				if(new_user.password=="admin"){admin = new_user;}
				res.status(201).json({
					success:true,
					message:"User has been created",
					token:token
				});
			}
		});	
	});

	api.post('/login', function(req, res){
		User.findOne({username:req.body.username}).select(user_parameters.join(' ')).exec(function(err, user_loging){ //cette synthaxe avec select('password').exec en raison du fait qu'à la création le pass était masqué
		//User.findOne({username:req.body.username}, function(err, userLoging){ //synthaxe qui peut être utilisée quand on ne masque pas les pasword
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when logging new user"
				});
			}
			else
			{
				if(!user_loging)
				{
					res.status(404).json({
						success:false,
						message:"User not existing !"
					});
				}
				else
				{
					var valid_password = user_loging.comparePassword(req.body.password);
					if(!valid_password)
					{
						res.status(409).json({
							success:false,
							message:"Invalid password !"
						});
					}
					else
					{
						user_loging.password = req.body.password;
						var token = createToken(user_loging);
						res.status(200).json({
							success:true,
							message:"User is logged !",
							token:token
						});
					}
				}
			}				
		});
	});
	
	api.get('/getAllUsers', function(req, res){
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];
		if(!token)
		{
			User.find().select(user_parameters_simplified.join(' ')).exec(function(err, users){ 
				if(err)
				{
					console.log(err);
					res.status(400).json({
						success:false,
						message:"Error when finding all users"
					});
				}
				else
				{
					for (var i=0; i < users.length; i++)
					{
						users[i].src_photo = bucket_root_path + "/" + bucket_path_users_photos + "/" + users[i].username + "_" + users[i]._id; 
						if(users[i].username == admin_username){users.splice(i, 1);}
					}
					res.status(200).json({
						success:true,
						message:"Users well found",
						users:users
					});
				}
			}); 
		}
		else
		{
			User.find({}, function(err, users){
				if(err)
				{
					console.log(err);
					res.status(400).json({
						success:false,
						message:"Error when finding all users"
					});
				}
				else
				{
					for (var i=0; i < users.length; i++)
					{
						users[i].src_photo = bucket_root_path + "/" + bucket_path_users_photos + "/" + users[i].username + "_" + users[i]._id; 
						if(users[i].username == admin_username){users.splice(i, 1);}
					}
					res.status(200).json({
						success:true,
						message:"Users well found",
						users:users
					});
				}
			});
		}
	});
	
	api.get('/getAllTeams', function(req, res){
		Team.find({}, function(err, teams){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all teams"
				});
			}
			else
			{
				for (var i=0; i < teams.length; i++)
				{
					teams[i].src_photo = bucket_root_path + "/" + bucket_path_teams_photos + "/" + teams[i].name + "_" + teams[i]._id;
					console.log(teams); 
				}

				res.status(200).json({
					success:true,
					message:"Teams well found",
					teams:teams
				});
			}
		});
	});
	
	api.post('/getLevel', function(req, res){
		Level.findOne({_id:req.body.id_level}).select(level_parameters.join(' ')).exec(function(err, level){ 
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding level"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Level found !",
					level:level
				});
			}
		});
	});

	api.get('/getAllAdvices', function(req, res){
		Advice.find({}, function(err, advices){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all advices"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Advices well found",
					advices:advices
				});
			}
		});
	});

	api.post('/addAdvices', function(req, res){
		var	inserted = 0;
		var res_data = {};
		for (var i=0; i < req.body.length; i++)
		{
			var new_advice = new Advice(req.body[i]);
			new_advice.save
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res_data.success = false;
						res_data.message = "Error when registering new advice";
						res.status(400).json(res_data);
						return;
					}
					else
					{
						res_data.success = true;
						res_data.message = "Advcie has been created";
						if(++inserted == req.body.length){res.status(201).json(res_data);}	
					}
				}
			);
		}
	});

	api.get('/getAllCategories', function(req, res){
		Category.find({}, function(err, categories){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all categories"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Categories well found",
					categories:categories
				});
			}
		});
	});

	api.get('/getAllCriterias', function(req, res){
		Criteria.find({}, function(err, criterias){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all criterias"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Criterias well found",
					criterias:criterias
				});
			}
		});
	});

	api.get('/getAllLevels', function(req, res){
		Level.find({}, function(err, levels){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all levels"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Levels well found",
					levels:levels
				});
			}
		});
	});

	api.get('/getAllFormats', function(req, res){
		Format.find({}, function(err, formats){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all formats"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Formats well found",
					formats:formats
				});
			}
		});
	});


	api.get('/getAllTopics', function(req, res){
		Topic.find({}, function(err, topics){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all topics"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Topics well found",
					topics:topics
				});
			}
		});
	});

	api.get('/getAllSubjects', function(req, res){
		Subject.find({}, function(err, subjects){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all subjects"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Subjects well found",
					subjects:subjects
				});
			}
		});
	});

	api.get('/getAllMarks', function(req, res){
		Mark.find({}, function(err, marks){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all marks"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Marks well found",
					marks:marks
				});
			}
		});
	});

	api.get('/getAllComments', function(req, res){
		Comment.find({}, function(err, comments){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all comments"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Comments well found",
					comments:comments
				});
			}
		});
	});

	api.get('/getAllSchedules', function(req, res){
		Schedule.find({}, function(err, schedules){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all schedules"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Schedules well found",
					schedules:schedules
				});
			}
		});
	});


	api.get('/getAllOffersForServer', function(req, res){
		Offer.find({}, function(err, offers){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all offers"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Offers well found",
					offers:offers
				});
			}
		});
	});

	api.get('/createReportForServer/:id_offer/:id_teacher', function(req, res){
		Report.findOne({id_offer:req.params.id_offer, id_teacher:req.params.id_teacher}).select(report_parameters.join(' ')).exec(function(err, report){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when checking report"
				});
			}
			else
			{
				if(!report)
				{
					var report = new Report({
						id_offer:req.params.id_offer,
						id_teacher:req.params.id_teacher,
						emission_date:new Date()
					});
					report.save
					(
						function(err, report)
						{
							console.log(err);
							if(err)
							{
								res.status(400).json({
									success:false,
									message:"Failure saving report"
								});
							}
							else
							{
								res.json({
									success:true,
									message:"OK saving report",
									report:report
								});
							}
						}
					);
				}
				else
				{													
					res.status(400).json({
						success:false,
						message:"Failure updating report"
					});
				}
			}			
		});
	});

	api.get('/saveNotificationForServer/:id_receiver/:id_action', function(req, res){
		var notification = new Notification({
			id_emitter:req.params.id_receiver,
			id_receiver:req.params.id_receiver,
			id_action:req.params.id_action,
			cat:"Report",
			type:"RDV",
			emission_date:new Date()
		});
		notification.save
		(
			function(err)
			{
				console.log(err);
				if(err)
				{
					res.status(400).json({
						success:false,
						message:"Failure saving notification"
					});
				}
				else
				{
					res.json({
						success:true,
						message:"OK updating notification",
					});
				}
			}
		)
	});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// MIDDLEWARE //////////////////////////////////////////////////////////////////////	
	
	api.use(function(req, res, next){
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];
		if(token)
		{
			jsonwebtoken.verify(token, secret_key, function(err, decoded){
				if(err)
				{
					console.log(err);
					res.status(400).json({
						success:false,
						message:"Failure auth"
					});
				}
				else
				{
					req.decoded = decoded;
					next();
				}
			});
		}
		else
		{
			res.status(403).json({
				success:false,
				message:"No token provided"
			});
		}
	});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

////////////////////////////////////// PRIVATE CATEGORIES ROUTES //////////////////////////////////////////////////////////////////////////	

	api.post('/addCategories', function(req, res){
		var	inserted = 0;
		var res_data = {};
		for (var i=0; i < req.body.length; i++)
		{
			var new_category = new Category(req.body[i]);
			new_category.save
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res_data.success = false;
						res_data.message = "Error when registering new category";
						res.status(400).json(res_data);
						return;
					}
					else
					{
						res_data.success = true;
						res_data.message = "Category has been created";
						if(++inserted == req.body.length){res.status(201).json(res_data);}	
					}
				}
			);
		}
	});

	api.post('/updateCategory', function(req, res){
		Category.findOne({_id:req.body._id}).select(category_parameters.join(' ')).exec(function(err, category){ 
			category.name = req.body.name;
			category.save
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Failure modifying category"
						});
					}
					else
					{
						res.json({
							success:true,
							message:"OK modifying category"
						});
					}
				}
			);
		});
	});

	api.post('/deleteCategory', function(req, res){
		Category.findOne({_id:req.body._id}).select(category_parameters.join(' ')).exec(function(err, category){ 
			category.remove
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Failure deleting category"
						});
					}
					else
					{
						res.json({
							success:true,
							message:"OK deleting category"
						});
					}
				}
			);
		});
	});

////////////////////////////////////// PRIVATE CRITERIAS ROUTES //////////////////////////////////////////////////////////////////////////	

	api.post('/addCriterias', function(req, res){
		var	inserted = 0;
		var res_data = {};
		for (var i=0; i < req.body.length; i++)
		{
			var new_criteria = new Criteria(req.body[i]);
			new_criteria.save
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res_data.success = false;
						res_data.message = "Error when registering new criteria";
						res.status(400).json(res_data);
						return;
					}
					else
					{
						res_data.success = true;
						res_data.message = "Criteria has been created";
						if(++inserted == req.body.length){res.status(201).json(res_data);}	
					}
				}
			);
		}
	});

	api.post('/updateCriteria', function(req, res){
		Criteria.findOne({_id:req.body._id}).select(criteria_parameters.join(' ')).exec(function(err, criteria){ 
			criteria.name = req.body.name;
			criteria.save
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Failure modifying criteria"
						});
					}
					else
					{
						res.json({
							success:true,
							message:"OK modifying criteria"
						});
					}
				}
			);
		});
	});

	api.post('/deleteCriteria', function(req, res){
		Criteria.findOne({_id:req.body._id}).select(criteria_parameters.join(' ')).exec(function(err, criteria){ 
			criteria.remove
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Failure deleting criteria"
						});
					}
					else
					{
						res.json({
							success:true,
							message:"OK deleting criteria"
						});
					}
				}
			);
		});
	});


////////////////////////////////////// PRIVATE LEVELS ROUTES //////////////////////////////////////////////////////////////////////////	

	api.post('/addLevels', function(req, res){
		var	inserted = 0;
		var res_data = {};
		for (var i=0; i < req.body.length; i++)
		{
			var new_level = new Level(req.body[i]);
			new_level.save
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res_data.success = false;
						res_data.message = "Error when registering new level";
						res.status(400).json(res_data);
						return;
					}
					else
					{
						res_data.success = true;
						res_data.message = "Level has been created";
						if(++inserted == req.body.length){res.status(201).json(res_data);}	
					}
				}
			);
		}
	});

	api.post('/updateLevel', function(req, res){
		Level.findOne({_id:req.body._id}).select(level_parameters.join(' ')).exec(function(err, level){ 
			level.name = req.body.name;
			level.save
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Failure modifying level"
						});
					}
					else
					{
						res.json({
							success:true,
							message:"OK modifying level"
						});
					}
				}
			);
		});
	});

	api.post('/deleteLevel', function(req, res){
		Level.findOne({_id:req.body._id}).select(topic_parameters.join(' ')).exec(function(err, level){ 
			level.remove
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Failure deleting level"
						});
					}
					else
					{
						res.json({
							success:true,
							message:"OK deleting level"
						});
					}
				}
			);
		});
	});

////////////////////////////////////// PRIVATE FORMATS ROUTES //////////////////////////////////////////////////////////////////////////	

	api.post('/addFormats', function(req, res){
		var	inserted = 0;
		var res_data = {};
		for (var i=0; i < req.body.length; i++)
		{
			var new_format = new Format(req.body[i]);
			new_format.save
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res_data.success = false;
						res_data.message = "Error when registering new format";
						res.status(400).json(res_data);
						return;
					}
					else
					{
						res_data.success = true;
						res_data.message = "Format has been created";
						if(++inserted == req.body.length){res.status(201).json(res_data);}	
					}
				}
			);
		}
	});

	api.post('/updateFormat', function(req, res){
		Format.findOne({_id:req.body._id}).select(format_parameters.join(' ')).exec(function(err, format){ 
			format.name = req.body.name;
			format.save
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Failure modifying format"
						});
					}
					else
					{
						res.json({
							success:true,
							message:"OK modifying format"
						});
					}
				}
			);
		});
	});

	api.post('/deleteFormat', function(req, res){
		Format.findOne({_id:req.body._id}).select(format_parameters.join(' ')).exec(function(err, Format){ 
			Format.remove
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Failure deleting format"
						});
					}
					else
					{
						res.json({
							success:true,
							message:"OK deleting format"
						});
					}
				}
			);
		});
	});

////////////////////////////////////// PRIVATE TOPICS ROUTES //////////////////////////////////////////////////////////////////////////	

	api.post('/addTopics', function(req, res){
		var	inserted = 0;
		var res_data = {};
		for (var i=0; i < req.body.length; i++)
		{
			var new_topic = new Topic(req.body[i]);
			new_topic.save
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res_data.success = false;
						res_data.message = "Error when registering new topic";
						res.status(400).json(res_data);
						return;
					}
					else
					{
						res_data.success = true;
						res_data.message = "Topic has been created";
						if(++inserted == req.body.length)
						{
							res.status(201).json(res_data);
						}			
					}
				}
			);
		}
	});

	api.post('/updateTopic', function(req, res){
		Topic.findOne({_id:req.body._id}).select(topic_parameters.join(' ')).exec(function(err, topic){ 
			topic.name = req.body.name;
			topic.save
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Failure modifying topic"
						});
					}
					else
					{
						res.json({
							success:true,
							message:"OK modifying topic"
						});
					}
				}
			);
		});
	});

	api.post('/deleteTopic', function(req, res){
		Topic.findOne({_id:req.body._id}).select(topic_parameters.join(' ')).exec(function(err, topic){ 
			topic.remove
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Failure deleting topic"
						});
					}
					else
					{
						res.json({
							success:true,
							message:"OK deleting topic"
						});
					}
				}
			);
		});
	});

////////////////////////////////////// PRIVATE SUBJECTS ROUTES ////////////////////////////////////////////////////////////////////////	

	api.post('/addSubjects', function(req, res){
		var	inserted = 0;
		var res_data = {};
		for (var i=0; i < req.body.length; i++)
		{
			var new_subject = new Subject(req.body[i]);
			new_subject.save
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res_data.success = false;
						res_data.message = "Error when registering new subject";
						res.status(400).json(res_data);
						return;
					}
					else
					{
						res_data.success = true;
						res_data.message = "Subject has been created";
						if(++inserted == req.body.length)
						{
							res.status(201).json(res_data);
						}		
					}
				}
			);
		}
	});

	api.post('/updateSubject', function(req, res){
		Subject.findOne({_id:req.body._id}).select(subject_parameters.join(' ')).exec(function(err, subject){ 
			subject.name = req.body.name;
			subject.save
			(
				function(err)
				{
					console.log(err);
					if(err)
					{
						res.status(400).json({
							success:false,
							message:"Failure modifying subject"
						});
					}
					else
					{
						res.json({
							success:true,
							message:"OK modifying subject"
						});
					}
				}
			);
		});
	});

	api.post('/deleteSubject', function(req, res){
		Subject.findOne({_id:req.body._id}).select(subject_parameters.join(' ')).exec(function(err, subject){ 
			subject.remove
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Failure deleting subject"
						});
					}
					else
					{
						res.json({
							success:true,
							message:"OK deleting subject"
						});
					}
				}
			);
		});
	});


	api.post('/saveRequest', function(req, res){
		console.log(req.body.contents[0].datas);
		Request.findOne({_id:req.body._id}).select(request_parameters.join(' ')).exec(function(err, request){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when checking request"
				});
			}
			else
			{
				if(!request){var request = new Request(req.body);}
				request.save
				(
					function(err)
					{
						console.log(err);
						if(err)
						{
							res.status(400).json({
								success:false,
								message:"Failure saving request"
							});
						}
						else
						{
							res.json({
								success:true,
								message:"OK saving request",
								request:request
							});
						}
					}
				);
			}			
		});
	});

	api.get('/getAllRequests', function(req, res){
		Request.find({}, function(err, requests){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all requests"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Requests well found",
					requests:requests
				});
			}
		});
	});

	api.post('/getRequest', function(req, res){
		Request.findOne({_id:req.body._id}).select(request_parameters.join(' ')).exec(function(err, request){ 
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding request"
				});
			}
			else
			{
				if(!request)
				{
					res.status(404).json({
						success:false,
						message:"Request not existing !"
					});
				}
				else
				{
					res.status(200).json({
						success:true,
						message:"Request found !",
						request:request
					});
				}
			}
		});
	});

	api.post('/saveOffer', function(req, res){
		Offer.findOne({_id:req.body._id}).select(offer_parameters.join(' ')).exec(function(err, offer){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when checking offer"
				});
			}
			else
			{
				if(!offer)
				{
					var offer = new Offer(req.body);
					offer.save
					(
						function(err)
						{
							console.log(err);
							if(err)
							{
								res.status(400).json({
									success:false,
									message:"Failure saving offer"
								});
							}
							else
							{
								res.json({
									success:true,
									message:"OK saving offer",
									offer:offer
								});
							}
						}
					);
				}
				else
				{
					offer.update
					(
						req.body,
						function(err)
						{
							console.log(err);
							if(err)
							{
								res.status(400).json({
									success:false,
									message:"Failure updating offer"
								});
							}
							else
							{
								res.json({
									success:true,
									message:"OK updating offer",
									offer:offer
								});
							}
						}
					);
				}
			}			
		});
	});

	api.get('/getAllOffers', function(req, res){
		Offer.find({}, function(err, offers){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all offers"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Offers well found",
					offers:offers
				});
			}
		});
	});

	api.get('/getAllReports', function(req, res){
		Report.find({}, function(err, reports){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all reports"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Reports well found",
					reports:reports
				});
			}
		});
	});

	api.post('/updateReport', function(req, res){
		Report.findOne({_id:req.body._id}).select(report_parameters.join(' ')).exec(function(err, report){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when checking report"
				});
			}
			else
			{
				if(!report)
				{
					var report = new Report(req.body);
					report.save
					(
						function(err)
						{
							console.log(err);
							if(err)
							{
								res.status(400).json({
									success:false,
									message:"Failure saving report"
								});
							}
							else
							{
								res.json({
									success:true,
									message:"OK saving report",
									report:report
								});
							}
						}
					);
				}
				else
				{
					report.update
					(
						req.body,
						function(err)
						{
							console.log(err);
							if(err)
							{
								res.status(400).json({
									success:false,
									message:"Failure updating report"
								});
							}
							else
							{
								res.json({
									success:true,
									message:"OK updating report",
									report:report
								});
							}
						}
					);
				}
			}			
		});
	});

	api.post('/updateMarks', function(req, res){
		var marks = req.body;
		var i = 0;
		function saveMarkI(i)
		{
			if(i < marks.length)
			{
				Mark.findOne({_id:marks[i]._id}).select(mark_parameters.join(' ')).exec(function(err, mark){
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Error when checking mark"
						});
					}
					else
					{
						if(!mark)
						{
							var mark = new Mark(marks[i]);
							mark.save
							(
								function(err)
								{
									console.log(err);
									if(err)
									{
										res.status(400).json({
											success:false,
											message:"Failure saving mark"
										});
									}
									else
									{
										saveMarkI(i+1);
									}
								}
							);
						}
						else
						{
							mark.update
							(
								marks[i],
								function(err)
								{
									console.log(err);
									if(err)
									{
										res.status(400).json({
											success:false,
											message:"Failure updating mark"
										});
									}
									else
									{
										saveMarkI(i+1);
									}
								}
							);
						}
					}			
				});
			}
			if((i == marks.length) || (marks.length == 0))
			{
				res.json({
					success:true,
					message:"OK updating mark",
				});
			}
		}
		saveMarkI(i);	
	});

	// api.post('/updateMarks', function(req, res){
	// 	var	inserted = 0;
	// 	var res_data = {};
	// 	for (var i=0; i < req.body.length; i++)
	// 	{
	// 		var new_mark = new Mark(req.body[i]);
	// 		new_mark.save
	// 		(
	// 			function(err)
	// 			{
	// 				if(err)
	// 				{
	// 					console.log(err);
	// 					res_data.success = false;
	// 					res_data.message = "Error when registering new mark";
	// 					res.status(400).json(res_data);
	// 					return;
	// 				}
	// 				else
	// 				{
	// 					res_data.success = true;
	// 					res_data.message = "Mark has been created";
	// 					if(++inserted == req.body.length)
	// 					{
	// 						res.status(201).json(res_data);
	// 					}		
	// 				}
	// 			}
	// 		);
	// 	}
	// });

	api.post('/addComments', function(req, res){
		var	inserted = 0;
		var res_data = {};
		for (var i=0; i < req.body.length; i++)
		{
			var new_comment = new Comment(req.body[i]);
			new_comment.save
			(
				function(err)
				{
					if(err)
					{
						console.log(err);
						res_data.success = false;
						res_data.message = "Error when registering new comment";
						res.status(400).json(res_data);
						return;
					}
					else
					{
						res_data.success = true;
						res_data.message = "Comment has been created";
						if(++inserted == req.body.length)
						{
							res.status(201).json(res_data);
						}		
					}
				}
			);
		}
	});

	api.post('/addSchedules', function(req, res){
		var new_schedule = new Schedule(req.body);
		new_schedule.save
		(
			function(err)
			{
				if(err)
				{
					res.status(400).json({
						success:false,
						message:"Error when registering new schedule"
					});
				}
				else
				{
					res.json({
						success:true,
						message:"Schedule has been created",
					});
				}
			}
		);
	});



	api.post('/getNotifications', function(req, res){
		Notification.find({id_receiver:req.body.id_player}, function(err, notifications){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding notifications"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Notifications well found",
					notifications:notifications
				});
			}
		});
	});


	api.post('/updateNotifications', function(req, res){
		var notifications = req.body;
		var i = 0;
		function saveNotificationI(i)
		{
			if(i < notifications.length)
			{
				var finding_criterias = [];
				if((notifications[i].cat == "Network") || ((notifications[i].cat == "Team")&&((notifications[i].type == "Membership") || (notifications[i].type == "Captaincy"))))
				{
					finding_criterias.push(
						{id_receiver:notifications[i].id_receiver, id_emitter:notifications[i].id_action, id_action:notifications[i].id_emitter, cat:notifications[i].cat, type:notifications[i].type},
						{id_receiver:notifications[i].id_receiver, id_emitter:notifications[i].id_emitter, id_action:notifications[i].id_action, cat:notifications[i].cat, type:notifications[i].type}
					);
				}
				else if(notifications[i].cat == "Offer")
				{
					finding_criterias.push(
						{id_emitter:notifications[i].id_emitter, id_receiver:notifications[i].id_receiver, id_action:notifications[i].id_action, cat:notifications[i].cat}
					);
				}
				else
				{
					finding_criterias.push(
						{id_emitter:notifications[i].id_emitter, id_receiver:notifications[i].id_receiver, id_action:notifications[i].id_action, cat:notifications[i].cat, type:notifications[i].type}
					);
				}
		    	Notification.findOne({$or:finding_criterias}).exec(function(err, notification){
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Error when checking notification"
						});
					}
					else
					{
						if(!notification)
						{
							var notification = new Notification(notifications[i]);
							notification.save
							(
								function(err)
								{
									console.log(err);
									if(err)
									{
										res.status(400).json({
											success:false,
											message:"Failure saving notification"
										});
									}
									else
									{
										saveNotificationI(i+1);
									}
								}
							);
						}
						else
						{
							notification.update
							(
								notifications[i],
								function(err)
								{
									console.log(err);
									if(err)
									{
										res.status(400).json({
											success:false,
											message:"Failure updating notification"
										});
									}
									else
									{
										saveNotificationI(i+1);
									}
								}
							);
						}
					}			
				});
			}
			if((i == notifications.length) || (notifications.length == 0))
			{
				res.json({
					success:true,
					message:"OK updating notification",
				});
			}
		}
		saveNotificationI(i);	
	});

	api.post('/deleteNotification', function(req, res){
		Notification.findOne({id_receiver:req.body[0].id_receiver, id_emitter:req.body[0].id_emitter, id_action:req.body[0].id_action, cat:req.body[0].cat, type:req.body[0].type}).select(notification_parameters.join(' ')).exec(function(err, notification){ 
			if(notification)
			{	
				notification.remove
				(
					function(err)
					{
						if(err)
						{
							console.log(err);
							res.status(400).json({
								success:false,
								message:"Failure deleting notification"
							});
						}
						else
						{
							res.json({
								success:true,
								message:"OK deleting notification"
							});
						}
					}
				);
			}
			else
			{
				res.json({
					success:true,
					message:"Nothing to delete"
				});
			}
		});
	});



////////////////////////////////////// PRIVATE PEOPLE ROUTES //////////////////////////////////////////////////////////////////////////////	

	api.get('/me', function(req, res){
		User.findOne({_id:req.decoded.user._id}).select(user_parameters.join(' ')).exec(function(err, user){ 
			user.password = req.decoded.user.password;
			res.json({
				success:true,
				message:"User is logged !",
				user:user
			});
		});
	});
	
	api.post('/getUser', function(req, res){
		User.findOne({_id:req.body._id}).select(user_parameters_without_pass.join(' ')).exec(function(err, user){ 
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding user"
				});
			}
			else
			{
				if(!user)
				{
					res.status(404).json({
						success:false,
						message:"User not existing !"
					});
				}
				else
				{
					res.status(200).json({
						success:true,
						message:"User found !",
						user:user
					});
				}
			}
		});
	});

	// api.post('/updateUser', function(req, res){
	// 	User.findOne({_id:req.body._id}).select(user_parameters.join(' ')).exec(function(err, user){ 
	// 		delete req.body['password'];
	// 		user.update
	// 		(
	// 			req.body,
	// 			function(err)
	// 			{
	// 				if(err)
	// 				{
	// 					res.status(400).json({
	// 						success:false,
	// 						message:"Failure modifying user"
	// 					});
	// 				}
	// 				else
	// 				{
	// 					res.json({
	// 						success:true,
	// 						message:"OK modifying user"
	// 					});
	// 				}
	// 			}
	// 		);
	// 	});
	// });



api.post('/updateUsers', function(req, res){
	var users = req.body;
	var i = 0;
	function updateUserI(i)
	{
		if(i < users.length)
		{
		    User.findOne({_id:users[i]._id}).select(user_parameters.join(' ')).exec(function(err, user){ 
				if(err)
				{
					console.log(err);
					res.status(400).json({
						success:false,
						message:"Error when checking user"
					});
				}
				else
				{
					if(!user)
					{
						var user = new User(users[i]);
						user.save
						(
							function(err)
							{
								console.log(err);
								if(err)
								{
									res.status(400).json({
										success:false,
										message:"Failure saving user"
									});
								}
								else
								{
									updateUserI(i+1);
								}
							}
						);
					}
					else
					{
						delete users[i]['password'];
						user.update
						(
							users[i],
							function(err)
							{
								console.log(err);
								if(err)
								{
									res.status(400).json({
										success:false,
										message:"Failure updating user"
									});
								}
								else
								{
									updateUserI(i+1);
								}
							}
						);
					}
				}			
			});
		}
		if((i == users.length) || (users.length == 0))
		{
			res.json({
				success:true,
				message:"OK updating user",
			});
		}
	}
	updateUserI(i);	
});







	api.post('/updateME', function(req, res){
		User.findOne({_id:req.body._id}).select(user_parameters.join(' ')).exec(function(err, ME){ 
			if(!ME.comparePassword(req.body.password))
			{
				bcrypt.hash
				(
					req.body.password,
					null,
					null,
					function(err, hash)
					{
						if(err){console.log("err");return next();}
						req.body.password = hash;
						ME.update
						(
							req.body,
							function(err)
							{
								if(err)
								{
									res.status(400).json({
										success:false,
										message:"Failure modifying user"
									});
								}
								else
								{
									res.json({
										success:true,
										message:"OK modifying user"
									});
								}
							}
						);
					}
				);
			}
			else
			{
				delete req.body['password'];
				ME.update
				(
					req.body,
					function(err)
					{
						if(err)
						{
							res.status(400).json({
								success:false,
								message:"Failure modifying user"
							});
						}
						else
						{
							res.json({
								success:true,
								message:"OK modifying user"
							});
						}
					}
				);
			}

		});
	});




	api.post('/admin', function(req, res){
		User.findOne({username:req.decoded.user.username}).select('password').exec(function(err, user){ 
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Failure checking admin status"
				});
			}
			else
			{
				var is_admin = user.comparePassword(admin_pass);		
				res.status(200).json({
					success:true,
					message:"Check for admin done !",
					admin:is_admin
				});
			}
		});
	});

	

	api.post('/updateTeam', function(req, res){
		Team.findOne({_id:req.body._id}).select(team_parameters.join(' ')).exec(function(err, team){ 						
			if(!team)
			{
				var new_team = new Team(req.body);
				new_team.save(function(err, team){
					if(err)
					{
						console.log(err);
						res.status(400).json({
							success:false,
							message:"Error when creating new team"
						});
					}
					else
					{
						res.status(200).json({
							success:true,
							message:"Team has been created",
							team:team
						});
					}
				});
			}
			else
			{
				team.update
				(
					req.body,
					function(err)
					{
						console.log(err);
						if(err)
						{
							res.status(400).json({
								success:false,
								message:"Failure updating team"
							});
						}
						else
						{
							res.json({
								success:true,
								message:"OK updating team",
								team:team
							});
						}
					}
				);
			};			
		});	
	});


	app.post('/uploadPhotoUser', ephemeric_upload_photos_users.single('file'), function(req, res){
		var fileBuffer = fs.readFileSync(req.file.path);
  		var metaData = req.file.fieldname;
  		var key_file = bucket_path_users_photos + "/" + req.body.username + "_" + req.body.id_object; 
    	
    	params = {ACL:'public-read', Bucket:bucket_name, Key:key_file, Body:fileBuffer, ContentType: metaData};
		s3.putObject(params, function(err, data){
			if (err)
			{
				console.log(err)
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"OK managing photo",
					src_photo:bucket_root_path + "/" + key_file
				});
			}
		});
	});

	app.post('/uploadPhotoTeam', ephemeric_upload_photos_teams.single('file'), function(req, res){
		var fileBuffer = fs.readFileSync(req.file.path);
  		var metaData = req.file.fieldname;
  		var key_file = bucket_path_teams_photos + "/" + req.body.name + "_" + req.body.id_object; 
    	
    	params = {ACL:'public-read', Bucket:bucket_name, Key:key_file, Body:fileBuffer, ContentType: metaData};
		s3.putObject(params, function(err, data){
			if (err)
			{
				console.log(err)
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"OK managing photo",
					src_photo:bucket_root_path + "/" + key_file
				});
			}
		});
	});

	api.get('/getAllDialogues', function(req, res){
		Dialogue.find({}, function(err, dialogues){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all dialogues"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					message:"Dialogues well found",
					dialogues:dialogues
				});
			}
		});
	});

	api.post('/updateDialogue', function(req, res){
		Dialogue.findOne({_id:req.body._id}).select(dialogue_parameters.join(' ')).exec(function(err, dialogue){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when checking dialogue"
				});
			}
			else
			{
				if(!dialogue)
				{
					console.log("dfhnklhnnhthjnrthnthjnkn");
					var dialogue = new Dialogue(req.body);
					dialogue.save
					(
						function(err)
						{
							console.log(err);
							if(err)
							{
								res.status(400).json({
									success:false,
									message:"Failure saving dialogue"
								});
							}
							else
							{
								res.status(200).json({
									success:true,
									message:"Dialogue well updated",
								});
							}
						}
					);
				}
				else
				{
					dialogue.update
					(
						req.body,
						function(err)
						{
							console.log(err);
							if(err)
							{
								res.status(400).json({
									success:false,
									message:"Failure updating dialogue"
								});
							}
							else
							{
								res.status(200).json({
									success:true,
									message:"Dialogue well updated",
								});
							}
						}
					);
				}
			}			
		});
	});


	api.get('/getAllMessages', function(req, res){
		Message.find({}, function(err, messages){
			if(err)
			{
				console.log(err);
				res.status(400).json({
					success:false,
					message:"Error when finding all messages"
				});
			}
			else
			{
				res.status(200).json({
					success:true,
					error_messages:"Messages well found",
					messages:messages
				});
			}
		});
	});

	api.post('/saveMessage', function(req, res){
		var	inserted = 0;
		var res_data = {};
		var new_message = new Message(req.body);
		new_message.save
		(
			function(err)
			{
				if(err)
				{
					console.log(err);
					res_data.success = false;
					res_data.error_message = "Error when registering new message";
					res.status(400).json(res_data);
					return;
				}
				else
				{
					res_data.success = true;
					res_data.error_message = "Message has been created";
					res_data.message = new_message;
					res.status(201).json(res_data);	
				}
			}
		);
	});

	return api;
}