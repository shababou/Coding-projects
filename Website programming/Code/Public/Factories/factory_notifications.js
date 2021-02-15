angular.module("app").factory
(
	"factoryNotifications",
	function($http, $q, factoryUsers, factoryRequests, factoryOffers, factoryReports, factoryTeams, miscServices)
	{
		var factoryNotifications = {};
		var my_notifications = {data:{notifications:[], success:true, message:"OK when loading and deformatting my notifications"}};
			
		factoryNotifications.getMyNotifications = function(player, matrix_reinit)
		{
			var deferred = $q.defer();
			if(my_notifications.data.notifications.length == 0 || matrix_reinit)
			{
				if(!matrix_reinit || (matrix_reinit == "change_player")){matrix_reinit = {'requests':false, 'offers':false, 'reports':false};}

				console.log("notifications");
				my_notifications.data.notifications = [];

				$q.all([
					$http.post('/api/getNotifications', {id_player:player._id}),
		            factoryUsers.getAllUsers(),
		            factoryRequests.getAllRequests(matrix_reinit),
		            factoryOffers.getAllOffers(matrix_reinit),
		            factoryReports.getAllReports(matrix_reinit),
		            factoryTeams.getAllTeams(matrix_reinit)
	       		]).then(function(res){
	       				for (var i=0; i < res[0].data.notifications.length; i++)
						{
							var notification_i = {
								notification:res[0].data.notifications[i],
								message:res[0].data.message,
								success:res[0].data.success
							};
							if(!miscServices.isObjectInArray(my_notifications.data.notifications, notification_i.notification, "_id").result)
							{
								var deformatted_notification_i = deformatNotification(notification_i, res[1].data, res[2].data, res[3].data, res[4].data, res[5].data);
								if(deformatted_notification_i.success)
									my_notifications.data.notifications.push(deformatted_notification_i.notification);
								else
								{
									my_notifications.data.success = false;
									my_notifications.data.message = "Error when loading and deformatting my notifications"
									deferred.resolve(my_notifications);
								}
							}
						}
						deferred.resolve(my_notifications);
					});
			}
			else
			{
				deferred.resolve(my_notifications);
			}
			return deferred.promise;
		};

		function deformatNotification(data_0, data_1, data_2, data_3, data_4, data_5)
		{
			var notification = data_0.notification;
		    var users = data_1.users;
		    var requests = data_2.requests;
		    var offers = data_3.offers;
		    var reports = data_4.reports;
		    var teams = data_5.teams;
		    if(miscServices.isObjectInArray(users, {_id:notification.id_emitter}, "_id").result){notification = miscServices.deformatData(notification, users, "emitter");}
		    else{notification = miscServices.deformatData(notification, teams, "emitter");}
		    if(miscServices.isObjectInArray(users, {_id:notification.id_receiver}, "_id").result){notification = miscServices.deformatData(notification, users, "receiver");}
		    else{notification = miscServices.deformatData(notification, teams, "receiver");}
		    if(miscServices.isObjectInArray(users, {_id:notification.id_action}, "_id").result){notification = miscServices.deformatData(notification, users, "action");}
		    else{notification = miscServices.deformatData(notification, teams, "action");}
		    if((notification.cat == "Network") || ((notification.cat == "Team")&&(notification.type == "Membership")) || ((notification.cat == "Team")&&(notification.type == "Captaincy")))
		    { 
		    	if(notification.receiver._id == notification.emitter._id){notification.player = notification.action;}
		    	else{notification.player = notification.emitter;}
		    }
		    if(notification.cat == "Request"){miscServices.deformatData(notification, requests, "action");}
		    if(notification.cat == "Offer"){miscServices.deformatData(notification, offers, "action");}
		    if(notification.cat == "Report"){miscServices.deformatData(notification, reports, "action");}
		    var messages = [data_0.message, data_1.message, data_2.message, data_3.message, data_4.message, data_5.message];
		    var results = {};
		    results.messages = messages;
		    results.notification = notification;
		    if(data_0.success && data_1.success && data_2.success && data_3.success && data_4.success && data_5.success){results.success = true;}
		    else{results.success = false;}

		    return results;
		};


		factoryNotifications.formatNotifications = function(notifications)
		{
			for (var i = 0; i < notifications.length; i++)
			{
				notifications[i] = miscServices.formatData(notifications[i], "receiver");
				notifications[i] = miscServices.formatData(notifications[i], "emitter");
				notifications[i] = miscServices.formatData(notifications[i], "action");
			}
		    return notifications;
		};

		factoryNotifications.updateNotifications = function(notifications)
		{
			notifications = factoryNotifications.formatNotifications(notifications);

			var deferred = $q.defer();
			$http.post('/api/updateNotifications', notifications)
				.then(function(res){
					deferred.resolve(res);
				});
		    return deferred.promise;
		};

		factoryNotifications.deleteNotification = function(notification)
		{
			console.log("deletion");
			var deferred = $q.defer();
			$http.post('/api/deleteNotification', factoryNotifications.formatNotifications(notification))
				.then(function(res){
					deferred.resolve(res);
				});
		    return deferred.promise;
		};

		return factoryNotifications;
	}

);