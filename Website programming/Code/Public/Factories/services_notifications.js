angular.module("app").service
(
	'notifsServices',
	function(factoryNotifications, factoryRequests, miscServices)
	{
		this.getTextForNotifs = function(player, notif)
		{
			var message = {};
			switch(notif.cat) {
			    case "Request":
			    	var start;
			    	if(notif.receiver._id == notif.action.student._id){start = "Vous avez émis ";}
			        else{start = notif.emitter.username + " a émis ";}
			    	var middle = "une <a href='/Requests/" + notif.action._id + "'>annonce</a> ";
			    	var end = "qui se termine le " + notif.action.target_date + "."; 
			    	message.text = start + middle + end;
			        break;
			    case "Offer":
			    	var parent_request = factoryRequests.allRequestsSync()[miscServices.isObjectInArray(factoryRequests.allRequestsSync(), {_id:notif.action.id_request}, "_id", null).index];  
			    	var start_1;
			    	var middle_1;
			       	if(notif.subtype == "RDV"){middle_1 = "<a href='/Requests/" + notif.action.id_request + "/RDV/" + notif.action._id + "'>cours</a> ";} 
			    	else if(notif.subtype == "Chat"){middle_1 = "<a href='/Requests/" + notif.action.id_request + "/Chat/" + notif.action._id + "'>chat</a> ";}
			    	else{middle_1 = "<a href='/Requests/" + notif.action.id_request + "'>offre</a> ";}
			    	var middle_2 = "de <a href='/Profile/" + notif.action.teacher._id + "'>" + notif.action.teacher.username + "</a> ";
			        var end_1;
			        var emitter_path = "<a href='/Profile/" + notif.emitter._id + "'>" + notif.emitter.username + "</a> ";
			        if(notif.receiver._id == parent_request.student._id)
			        {
			        	end_1 = "par rapport à votre <a href='/Requests/" + notif.action.id_request + "'>annonce</a> ";
			        }
			       	else
			       	{
			       		end_1 = "par rapport à l'<a href='/Requests/" + notif.action.id_request + "'>annonce</a> de <a href='/Profile/" + parent_request.student._id + "'>" + parent_request.student.username + "</a> ";
			       	}
			        var end_2 = "qui se termine le " + parent_request.target_date + ".";
			        if(notif.type == "Creation")
			        {
			    		if(notif.receiver._id == notif.action.teacher._id){start_1 = "Vous avez créé une ";}
			       	 	else{start_1 = emitter_path + " a créé une ";}
			       	 	message.text = start_1 + middle_1 + end_1 + end_2;
			        }
			        else if(notif.type == "Update")
			        {
			        	if(notif.receiver._id == notif.action.teacher._id){start_1 = "Vous avez modifié votre ";}
			        	else{start_1 = emitter_path + " a modifié son ";}
			        	message.text = start_1 + middle_1 + end_1 + end_2;
			        }
			        else if(notif.type == "Participation")
			        {
			       		var participating = {};
			       		if(notif.subtype == "RDV"){participating = miscServices.isObjectInArray(notif.action.RDV_datas.participants, {user:notif.emitter}, "user", null);}
			        	if(notif.receiver._id == notif.action.teacher._id)
			        	{
				        	if(participating.result){start_1 = emitter_path + " s'est inscrit à votre ";}
				        	else{start_1 = emitter_path + " ne souhaite plus participer à votre ";}
				        	message.text = start_1 + middle_1 + end_1 + end_2;
				        }
				        else if(notif.receiver._id == notif.emitter._id)
				        {
				        	if(participating.result){start_1 = "Vous participez désormais au ";}
				        	else{start_1 = "Vous ne souhaitez plus participer au ";}
				        	message.text = start_1 + middle_1 + middle_2 + end_1 + end_2;
				        }
				        else
				        {
				        	if(participating.result){start_1 = emitter_path + " s'inscrit au ";}
				        	else{start_1 = emitter_path + " ne souhaite plus participer au  ";}
				        	message.text = start_1 + middle_1 + middle_2 + end_1 + end_2;
				        }
			        }
			        else if(notif.type == "Invitation")
			        {
			        	message.comp = {};
			        	message.comp.text = "";
			        	var start_2;
			        	var middle_3 = "publique ";
			        	for(var i = 0; i < parent_request.linked_teams.length; i++)
						{	
							var current_status_team;
							current_status_team = miscServices.objectByCriteriaFromArray(parent_request.linked_teams[i].team.linked_users, notif.receiver._id, "user", "_id", 1); 
							if(current_status_team && ((current_status_team.membership_status == "Accepting") || (current_status_team.membership_status == "Accepted")))
							{
								message.comp.text = message.comp.text + "(<a href='/Team/" + parent_request.linked_teams[i].team._id + "'>" + parent_request.linked_teams[i].team.name + "</a>) ";
							};
			        	}
			        	if(parent_request.linked_teams.length > 0){middle_3 = "d'équipe ";}
			        	if(notif.receiver._id == notif.emitter._id)
			        	{
			        		start_1 = "Vous avez invité des personnes à rejoindre ";
			        		if(notif.emitter._id == notif.action.teacher._id)
			        		{
			        			start_2 = "votre ";
			        			message.text = start_1 + start_2 + middle_1 + middle_3 + message.comp.text + end_1 + end_2;
			        		}
			        		else
			        		{
			        			start_2 = "le ";
			        			message.text = start_1 + start_2 + middle_1 + middle_3 + message.comp.text + middle_2 + end_1 + end_2;
			        		}
			        		
			        	}
			        	else
			        	{
			        		var participating = {};
			       			if(notif.subtype == "RDV"){participating = miscServices.isObjectInArray(notif.action.RDV_datas.participants, {user:notif.receiver}, "user", null);}
			        		if(participating.result){start_1 = "Vous avez accepté de rejoindre ";}
			        		else{start_1 = notif.emitter.username + " vous invite à rejoindre ";}
			        		if(notif.emitter._id == notif.action.teacher._id)
			        		{
			        			start_2 = "son ";
			        			message.text = start_1 + start_2 + middle_1 + end_1 + end_2;
			        		}
			        		else
			        		{
			        			start_2 = "le ";
			        			message.text = start_1 + start_2 + middle_1 + middle_2 + end_1 + end_2;
			        		}
			        	}
			        }
			        else{}
			        break;
			   case "Report":
			   		var emitter_path;
			   		if(notif.action.status != "New"){emitter_path = "<a href='/Profile/" + notif.emitter._id + "'>" + notif.emitter.username + "</a> ";}
			   		var offer_path;
			   		var report_date;
			   		if(notif.type == "RDV")
			   		{
			   			offer_path = "<a href='/Requests/" + notif.action.request._id + "/RDV/" + notif.action.offer._id + "'>cours</a> "; 
			   			report_date = notif.action.offer.RDV_datas.time_slots[notif.action.offer.RDV_datas.selected_time_slot].date_slot;
			   		}
			   		var start;
			   		var middle;
			   		var end;
				    if(notif.receiver._id == notif.action.teacher._id)
					{
						if(notif.action.status == "New")
						{
							start = "Le rapport du ";
							middle = "que vous avez donné le " + report_date;
							end = " est disponible.";
						}
						else
						{
							if(notif.action.status == "Diffused"){start = "Vous avez transmis le rapport du ";}
							else{start = emitter_path + " a commenté le rapport du ";}	
							middle = "que vous avez donné ";
							end = "le " + report_date;		   		
						}
			   				
					}
					else
					{
						var index_participant = miscServices.isObjectInArray(notif.action.participants, {user:notif.receiver}, "user", "_id").index;
						if(notif.action.status == "Diffused" || ((notif.action.status == "Commented")&&(notif.action.participants[index_participant].complementary_datas.status == "New")))
						{start = emitter_path + "vous a envoyé le rapport d'après-séance du ";}
			   			else{start = "Vous avez commenté le rapport d'après-séance du ";}
			   			middle = "qui a eu lieu ";
			   			end = "le " + report_date;
					}
					message.text = start + offer_path + middle + end;
					break;
				case "Team":
					var team_path = "<a href='/Team/" + notif.action._id + "'>" + notif.action.name + "</a> ";
					var founder_path = "<a href='/Profile/" + notif.action.founder._id + "'>" + notif.action.founder.username + "</a> ";
					var emitter_path = "<a href='/Profile/" +  notif.emitter._id + "'>" + notif.emitter.username + "</a> ";
				 	if(notif.type == "Participation"){message.text = emitter_path + "rejoint l'équipe " + team_path;}
				 	else if(notif.type == "Creation")
			        {
			        	if(notif.receiver._id == notif.action.founder._id){message.text = "Vous avez créé l'équipe " + team_path;}
			        	else if(notif.receiver._id == notif.action._id){message.text = founder_path + "a créé l'équipe.";}
			        	else{message.text =  emitter_path + "a créé l'équipe " + team_path;}
			        }
			        else if(notif.type == "Update"){message.text = emitter_path + "a modifié le paramétrage de l'équipe.";}
			        else{message.text = "Equipe " + team_path + ": il y a du nouveau !";}
			        break;
			    default:
			}
		
			return message;
		};



		this.prepareNotifsNetwork = function(ME, user)
		{
			var notifications = {};
			notifications.notifs = [];
			notifications.RT = [];

			var receivers = [ME, user];
			notifications.notifs = this.generateNotifications(ME, receivers, user, "Network", "");

			notifications.RT = factoryNotifications.formatNotifications(angular.copy(notifications.notifs));

			return notifications;
		};

		this.prepareNotifsMembership = function(emitter, receiver, next_status_emitter)
		{
			var notifications = {};
			notifications.notifs = [];
			notifications.RT = [];

			var member;
			var team;
			if(emitter.age)
			{
				member = emitter;
				team = receiver;
			}
			else
			{
				member = receiver;
				team = emitter;
			}
			var member_copy = angular.copy(member);
			var users_member = [];
			if(!team.private && ((next_status_emitter=="Accepting")||(next_status_emitter=="Accepted")))
			{
				users_member = miscServices.filterArrayByCriterias(member_copy.linked_users, "Accepted", "Accepting", "network_status");	
				users_member = miscServices.filterArrayByDataname(users_member, "user");
			}
			var notifications_for_users = this.generateNotifications(member, users_member, team, "Team", "Participation");
			var notifications_for_team = this.generateNotifications(emitter, [team], receiver, "Team", "Membership");
			var notifications_for_member = this.generateNotifications(emitter, [member], receiver, "Team", "Membership");
			var notifications_team = this.prepareNotifsTeam(team, "Team", "Membership");
			
			notifications.notifs = notifications_for_users;
			notifications.notifs = miscServices.mergeArrays(notifications.notifs, notifications_for_team);
			notifications.notifs = miscServices.mergeArrays(notifications.notifs, notifications_for_member);
			notifications.notifs = miscServices.mergeArrays(notifications.notifs, notifications_team.notifs);

			notifications.RT = factoryNotifications.formatNotifications(angular.copy(notifications.notifs));

			return notifications;
		};

		this.prepareNotifsRequest = function(emitter, request)
		{
			var notifications = {};
			notifications.notifs = [];
			notifications.RT = [];

			var emitter_copy = angular.copy(emitter);
			var request_copy = angular.copy(request);
			if(request_copy.linked_teams.length > 0)
			{
				for(var i = 0; i < request_copy.linked_teams.length; i++)
				{
					var notif_team = this.generateNotifications(emitter, [request.linked_teams[i].team], request, "Request", "");
    				notifications.notifs = miscServices.mergeArrays(notifications.notifs, notif_team);
					var notifications_team_i = this.prepareNotifsTeam(request_copy.linked_teams[i].team, "Request", "");
					notifications.notifs = miscServices.mergeArrays(notifications.notifs, notifications_team_i.notifs);
				}
			}
			else
			{
				var receivers = [];
				var linked_users_emitter = miscServices.filterArrayByCriterias(emitter_copy.linked_users, "Accepted", "Accepting", "network_status");
				linked_users_emitter = miscServices.filterArrayByDataname(linked_users_emitter, "user");
				receivers = linked_users_emitter;
				receivers.push(emitter);
				notifications.notifs = this.generateNotifications(emitter, receivers, request, "Request", "");
			}

			notifications.RT = factoryNotifications.formatNotifications(angular.copy(notifications.notifs));

			return notifications;
		}

		this.prepareNotifsOffer = function(emitter, offer, parent_request, type, subtype, guests)
		{
			var notifications = {};
			notifications.notifs = [];
			notifications.RT = [];

			if((parent_request.linked_teams.length > 0) && (type != "Invitation"))
			{
				for(var i = 0; i < parent_request.linked_teams.length; i++)
				{
    				var notif_team = this.generateNotifications(emitter, [parent_request.linked_teams[i].team], offer, "Offer", type, subtype);
    				notifications.notifs = miscServices.mergeArrays(notifications.notifs, notif_team);
					var notifications_team_i = this.prepareNotifsTeam(parent_request.linked_teams[i].team, "Offer", type);
					notifications.notifs = miscServices.mergeArrays(notifications.notifs, notifications_team_i.notifs);
				}
			}
			else
			{
				var receivers = [];
				if(type == "Creation")
				{
					receivers.push(offer.teacher);
					receivers.push(parent_request.student);
				}
				else if(type == "Update")
				{
					var offer_participants = [];
					if(subtype == "RDV"){offer_participants = offer.RDV_datas.participants;}		
					offer_participants = miscServices.filterArrayByDataname(offer_participants, "user");
					receivers = offer_participants;
					receivers.push(offer.teacher);
					receivers.push(parent_request.student);
				}
				else if(type == "Participation")
				{
					var linked_users_emitter = miscServices.filterArrayByCriterias(emitter.linked_users, "Accepted", "Accepting", "network_status");
					linked_users_emitter = miscServices.filterArrayByDataname(linked_users_emitter, "user");
					receivers = linked_users_emitter;
					var offer_participants = [];
					if(subtype == "RDV"){offer_participants = offer.RDV_datas.participants;}	
					offer_participants = miscServices.filterArrayByDataname(offer_participants, "user");
					receivers = miscServices.mergeArrays(linked_users_emitter, offer_participants, "_id");
					receivers = miscServices.mergeArrays(receivers, [emitter], "_id");
					receivers.push(offer.teacher);
				}
				else if(type == "Invitation")
				{
					receivers = angular.copy(guests);
					receivers.push(emitter);
				}
				else{}

				notifications.notifs = this.generateNotifications(emitter, receivers, offer, "Offer", type, subtype);
			}

			notifications.RT = factoryNotifications.formatNotifications(angular.copy(notifications.notifs));

			return notifications;
		}

		this.prepareNotifsTeam = function(team, emitter, cat, type, user_captain)
		{
			var notifications = {};
			notifications.notifs = [];
			notifications.RT = [];

			switch(cat)
			{
    			case "Team":
    				var team_copy = angular.copy(team);
        			if(type == "Creation")
        			{
        				var receivers = [];
        				var linked_users_founder = [];
        				if(!team.private)
        				{
        					linked_users_founder = miscServices.filterArrayByCriterias(team_copy.founder.linked_users, "Accepted", "Accepting", "network_status");
							linked_users_founder = miscServices.filterArrayByDataname(linked_users_founder, "user");
        				}
        				receivers.push(team);
        				receivers.push(team.founder);
        				receivers = miscServices.mergeArrays(receivers, linked_users_founder, "_id");
        				notifications.notifs = this.generateNotifications(team, receivers, team, cat, type);
        			}
        			else if(type == "Update")
        			{
        				var notif_team = this.generateNotifications(emitter, [team], team, cat, type);
        				var linked_users_team = miscServices.filterArrayByCriterias(team_copy.linked_users, "Accepted", "Accepting", "membership_status");
        				linked_users_team = miscServices.filterArrayByDataname(linked_users_team, "user");
        				var notifs_linked_users_team = this.generateNotifications(team, linked_users_team, team, cat, "Info");
        				notifications.notifs = miscServices.mergeArrays(notif_team, notifs_linked_users_team);
        			}
        			else if(type == "Membership")
        			{
        				var linked_users_team = miscServices.filterArrayByCriterias(team_copy.linked_users, "Accepted", "Accepting", "membership_status");
        				linked_users_team = miscServices.filterArrayByDataname(linked_users_team, "user");
        				notifications.notifs = this.generateNotifications(team, linked_users_team, team, cat, "Info");
        			}
        			else if(type == "Captaincy")
        			{
        				var notif_team = this.generateNotifications(team, [team], user_captain, cat, type);
        				var linked_users_team = miscServices.filterArrayByCriterias(team_copy.linked_users, "Accepted", "Accepting", "membership_status");
        				linked_users_team = miscServices.filterArrayByDataname(linked_users_team, "user");
        				var notifs_linked_users_team = this.generateNotifications(team, linked_users_team, team, cat, "Info");
        				notifications.notifs = miscServices.mergeArrays(notif_team, notifs_linked_users_team);	
        			}
        			break;
    			case "Request":
    			case "Offer":
    			    var team_copy = angular.copy(team);
    				var linked_users_team = miscServices.filterArrayByCriterias(team_copy.linked_users, "Accepted", "Accepting", "membership_status");
    				linked_users_team = miscServices.filterArrayByDataname(linked_users_team, "user");
        			notifications.notifs = this.generateNotifications(team, linked_users_team, team, "Team", "info");
        		default:
        	}

        	notifications.RT = factoryNotifications.formatNotifications(angular.copy(notifications.notifs));

        	return notifications;
        }

		this.prepareNotifsReport = function(emitter, report, type)
		{
			var notifications = {};
			notifications.notifs = [];
			notifications.RT = [];

			var receivers = [];
			if(report.status == "Diffused")
			{
				var report_participants = report.participants;
				report_participants = miscServices.filterArrayByDataname(report_participants, "user");
				receivers = report_participants;
			}
			receivers.push(report.teacher);
			
			notifications.notifs = this.generateNotifications(emitter, receivers, report, "Report", type);

			notifications.RT = factoryNotifications.formatNotifications(angular.copy(notifications.notifs));

			return notifications;
		}

		
        this.generateNotifications = function(emitter, receivers, action, cat, type, subtype)
        {
        	var notifications = [];
        	for(var i = 0; i < receivers.length; i++)
			{
				notifications.push(
					{
						emitter:emitter,
						receiver:receivers[i],
						action:action,
						cat:cat,
						type:type,
						subtype:subtype,
						emission_date:new Date()
					}
				)
			}

			return notifications;
		}
	}
)