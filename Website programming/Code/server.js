var bodyParser = require('body-parser');
var config = require('./config.js');
var mongoose = require('mongoose');
var morgan = require('morgan');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('run-middleware')(app);


app.use(bodyParser.urlencoded({extended:true})); //pour Postman
app.use(bodyParser.json());

app.use(express.static(__dirname + '/Public'));

var api = require('./App/Routes/api')(app, express);
app.use('/api',api);

mongoose.connect(config.database, function(err){
	if(!err){startRealTimeServer();}
	else{console.log(err);}
});

app.get("*", function(req, res){
	res.sendFile(__dirname + "/Public/index.html");
});

http.listen(config.port, function(err){
	if(err){console.log(err);}
	else{console.log("Listening on port " + config.port);}
});



function startRealTimeServer()
{
	//var Message = require("./App/Models/message");
	var Notification = require('./App/Models/notification');
	var clients = {};
	io.on('connection', function(client){	
		console.log('user connected to real time app');

		client.group = client.handshake.query.group;
		client.key = client.handshake.query.key;
		client.datas = JSON.parse(client.handshake.query.datas);
		
		if(!clients[client.key])
		{
			clients[client.key] = {}
			clients[client.key].contents = {};
			clients[client.key].id_clients = [];
		};
		if(!clients[client.key].contents.participants){clients[client.key].contents.participants = [];}
		if(JSON.stringify(clients[client.key].contents.participants).indexOf(JSON.stringify(client.datas)) <= -1)
		{
			clients[client.key].contents.participants.push(client.datas);
			clients[client.key].id_clients.push(client.id);
		}
						console.log(clients[client.key].contents.participants);
		// if(client.group == "Dialogue")
		// {
		// 	var id_dialogue = client.key.split(" ")[0];
		// 	var type_dialogue = client.key.split(" ")[1];
		// 	Message.find({id_dialogue:id_dialogue, type_dialogue:type_dialogue}, function (err, messages_contents){
		// 		clients[client.key].contents.messages_contents = messages_contents;
		// 		clients[client.key].contents.type_dialogue = type_dialogue;
		// 		io.emit('initRealTimeApp', clients[client.key].contents);
		// 	});
		// }



		client.on('actionEmitterRT', function(action_emitted){
			var key_action_emitted = action_emitted.init_datas.key;
			if(action_emitted.group == "Dialogue")
			{
				// console.log("cas 1");
				// if(key_action_emitted in clients){clients[key_action_emitted].contents.messages_contents.push(action_emitted.content);}
				// else{clients[key_action_emitted].contents.messages_contents = [action_emitted.content];}
				// action_emitted.content.emission_date = new Date();
				// var message = new Message(action_emitted.content);
				// message.save
				// (
				// 	function(err)
				// 	{
				// 		if(err){console.log(err);}
				// 		else{io.emit('notifyReceiversRT', clients[key_action_emitted].contents);}
				// 	}
				// );
			}
			else if((action_emitted.group == "Notification") && (client.type == "Dialogue"))
			{
				console.log("cas 2");
				var content_to_notify = {};
				content_to_notify.cat = action_emitted.content[0].cat;
				content_to_notify.matrix_reinit = {'users':false, 'requests':false, 'offers':false, 'reports':false, 'teams':false, 'marks':false, 'comments':false, 'schedules':false};
				if(action_emitted.content[0].cat == "Network"){content_to_notify.matrix_reinit['users'] = true;}
				if(action_emitted.content[0].cat == "Request"){content_to_notify.matrix_reinit['requests'] = true;}
				if(action_emitted.content[0].cat == "Offer"){content_to_notify.matrix_reinit['offers'] = true; content_to_notify.matrix_reinit['requests'] = true;}
				if(action_emitted.content[0].cat == "Report"){content_to_notify.matrix_reinit['reports'] = true; content_to_notify.matrix_reinit['users'] = true; content_to_notify.matrix_reinit['marks'] = true; content_to_notify.matrix_reinit['comments'] = true; content_to_notify.matrix_reinit['schedules'] = true}
				if(action_emitted.content[0].cat == "Team"){content_to_notify.matrix_reinit['teams'] = true; content_to_notify.matrix_reinit['users'] = true;}
				io.emit('notifyReceiversRT', content_to_notify);
			}
			else// if(type_action_emitted == "Notification")
			{
				console.log("cas 3");
				var content_to_notify = {};
				content_to_notify.cat = action_emitted.content[0].cat;
				content_to_notify.type = action_emitted.content[0].type;
				var participants = clients[key_action_emitted].contents.participants;
				for (var i = 0; i < participants.length; i++)
				{
					content_to_notify.matrix_reinit = {'users':false, 'requests':false, 'offers':false, 'reports':false, 'teams':false, 'marks':false, 'comments':false, 'schedules':false};
					if(action_emitted.content[0].cat == "Network"){content_to_notify.matrix_reinit['users'] = true;}
					if(action_emitted.content[0].cat == "Request"){content_to_notify.matrix_reinit['requests'] = true;}
					if(action_emitted.content[0].cat == "Offer"){content_to_notify.matrix_reinit['offers'] = true; content_to_notify.matrix_reinit['requests'] = true;}
					if(action_emitted.content[0].cat == "Report"){content_to_notify.matrix_reinit['reports'] = true; content_to_notify.matrix_reinit['users'] = true; content_to_notify.matrix_reinit['marks'] = true; content_to_notify.matrix_reinit['comments'] = true; content_to_notify.matrix_reinit['schedules'] = true}
					if(action_emitted.content[0].cat == "Team"){content_to_notify.matrix_reinit['teams'] = true; content_to_notify.matrix_reinit['users'] = true;}

					if((participants[i].id_user == client.datas.id_user) && clients[key_action_emitted])
					{
						console.log("emission vers: " + participants[i].id_user);
						io.to(clients[key_action_emitted].id_clients[i]).emit('notifyReceiversRT', content_to_notify);
					}
					for (var j = 0; j < action_emitted.content.length; j++)
					{
						if((participants[i].id_user == action_emitted.content[j].id_receiver) && (participants[i].id_user != client.datas.id_user) && clients[key_action_emitted])
						{	
							console.log("emission vers: " + participants[i].id_user);
							io.to(clients[key_action_emitted].id_clients[i]).emit('notifyReceiversRT', content_to_notify);
						}
					}
				}
				
				
			}
	  	});	


		client.on('disconnectRT', function(action_leaving){
	 		console.log('user leaving RealTime APP');
			var participants = clients[action_leaving.key].contents.participants;
	 		for (var i = 0; i < participants.length; i++)
			{
				if(participants[i].id_user == action_leaving.datas.id_user)
				{
					clients[action_leaving.key].contents.participants.splice(i, 1);
					clients[action_leaving.key].id_clients.splice(i, 1);
				}
			}
	  		if(client.type == "Dialogue")
	  		{
	  			for (var i = 0; i < clients[action_leaving.key].id_clients.length; i++)
				{
					console.log("emission vers "+participants[i].id_user);
	  				io.to(clients[action_leaving.key].id_clients[i]).emit('notifyReceiversRT', clients[action_leaving.key].contents);
	  			}
	  		}
	  		client.disconnect(true);
	  	});


	});
}




setInterval(function(){
	app.runMiddleware('/api/getAllOffersForServer',{},function(code, data){
		var offers = JSON.parse(data).offers; 

		var i = 0;
		function onOfferI(i)
		{
			if(i < offers.length)
			{
		    	var date_slot_offer = new Date(offers[i].RDV_datas.time_slots[offers[i].RDV_datas.selected_time_slot].date_slot);
				if(new Date() > date_slot_offer)
				{
					app.runMiddleware('/api/createReportForServer/' + offers[i]._id + '/' + offers[i].id_teacher, {}, function(code, data){
						var data = JSON.parse(data);
						if(data.success)
						{								console.log(date_slot_offer);
								console.log(new Date());
							console.log("success");
							app.runMiddleware('/api/saveNotificationForServer/' + offers[i].id_teacher + '/' + data.report._id,{},function(code, data){
							});
						}
					});
				}
			}
			if((i == offers.length) || (offers.length == 0))
			{
				
			}
			else{onOfferI(i + 1);}
		}
		onOfferI(i);

	});	
}, 1000);
  	