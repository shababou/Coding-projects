angular.module("app").service
(
	'relashionshipServices',
	function($rootScope, $q, $timeout, miscServices, factoryUsers, factoryTeams, factoryNotifications, networkServices, membershipServices, captaincyServices, notifsServices)
	{
		def_transposed_status = {};
		def_transposed_status["None"] = "None";
		def_transposed_status["Requesting"] = "Requested";
		def_transposed_status["Requested"] = "Requesting";
		def_transposed_status["Accepting"] = "Accepted";
		def_transposed_status["Accepted"] = "Accepting";
		def_transposed_status["Refusing"] = "Refused";
		def_transposed_status["Refused"] = "Refusing";
		def_transposed_status["Cancelling"] = "Cancelled";
		def_transposed_status["Cancelled"] = "Cancelling";


		this.getCurrentRelashionshipStatus = function(ref, other, context)
		{
			var other_in_ref;
			var relashionship_status;
			switch(context)
			{
			    case "Membership":
			    	var ref_in_other;
			        if(ref.age)
			        {
			        	ref_in_other = miscServices.objectByCriteriaFromArray(other.linked_users, ref._id, "user", "_id", 1);
			        	if(ref_in_other){relashionship_status = def_transposed_status[ref_in_other.membership_status];}
			        	else{relashionship_status = "None";}
			        }
					else
					{
						other_in_ref = miscServices.objectByCriteriaFromArray(ref.linked_users, other._id, "user", "_id", 1);
						if(other_in_ref){relashionship_status = other_in_ref.membership_status;}
						else{relashionship_status = "None";}
					}
					break;
			    case "Captaincy":
			    	var ref_in_other;
			        if(ref.age)
			        {
			        	ref_in_other = miscServices.objectByCriteriaFromArray(other.captains, ref._id, "user", "_id", 1);
			        	if(ref_in_other){relashionship_status = def_transposed_status[ref_in_other.captaincy_status];}
			        	else{relashionship_status = "None";}
			        	break;
			        }
					else
					{
						other_in_ref = miscServices.objectByCriteriaFromArray(ref.captains, other._id, "user", "_id", 1);
						if(other_in_ref){relashionship_status = other_in_ref.captaincy_status;}
						else{relashionship_status = "None";}
					}
					break;
			    case "Network":
			        other_in_ref = miscServices.objectByCriteriaFromArray(ref.linked_users, other._id, "user", "_id", 1);
			        if(other_in_ref){relashionship_status = other_in_ref.network_status;}
			        else{relashionship_status = "None";}
			        break;
			    default:
			}	 

			return relashionship_status;
		};

		getRelashionshipSatusImg = function(relashionship_status, type, context)
		{
			switch(context)
			{
				case "Membership":
					return membershipServices.getSatusImg(relashionship_status, type);
				case "Captaincy":
					return captaincyServices.getSatusImg(relashionship_status, type);
				case "Network":
					return networkServices.getSatusImg(relashionship_status, type);
				default:
			}
		};

		getText = function(ref, other, context, type, action_name)
		{
			switch(context)
			{
				case "Membership":
					if(type=="Classic"){return membershipServices.getTextAction(ref, other, action_name.substr(3));}
					else{return membershipServices.getTextNotif(ref, other, action_name.substr(3));}
				case "Captaincy":
					if(type=="Classic"){return captaincyServices.getTextAction(ref, other, action_name.substr(3));}
					else{return captaincyServices.getTextNotif(ref, other, action_name.substr(3));}
				case "Network":
					if(type=="Classic"){return networkServices.getTextAction(ref, other, action_name.substr(3));}
					else{return networkServices.getTextNotif(ref, other, action_name.substr(3));}
				default:
			}	
		};

		
		this.updateRelashionship = function(ref, other, datas, index, context)
		{
			var ref_copy = angular.copy(ref);
			var other_copy = angular.copy(other);
			next_status_ref = datas[index].next_status_ref;
			next_status_other = datas[index].next_status_other;
			switch(context)
			{
				case "Membership":
					var notifications = notifsServices.prepareNotifsMembership(ref_copy, other_copy, next_status_ref);
					var deferred = $q.defer();
					$q.all([
				           factoryTeams.updateMembershipStatus(ref, other, next_status_ref, next_status_other),
				           factoryNotifications.updateNotifications(notifications.notifs)
			       	]).then(function(res){
			       		//$rootScope.$emit('emitActionRT', {group:"Notification", content:notifications.RT});
					});
					break;
				case "Captaincy":
					var team_captain = captaincyServices.updateCaptainsTeam(ref, other, next_status_ref, next_status_other);
					var team = team_captain.team;
					var notifications = notifsServices.prepareNotifsTeam(angular.copy(team), "Team", "Captaincy", team_captain.captain);
					var deferred = $q.defer(); 
					$q.all([
				           factoryTeams.updateTeam(team),
				           factoryNotifications.updateNotifications(notifications.notifs)
			       	]).then(function(res){
			       		$rootScope.$emit('emitActionRT', {group:"Notification", content:notifications.RT});
					});
					break;
				case "Network":
					var notifications = notifsServices.prepareNotifsNetwork(ref_copy, other_copy);
					var deferred = $q.defer();
					$q.all([
				           factoryUsers.updateNetworkStatus(ref, other, next_status_ref, next_status_other),
				           factoryNotifications.updateNotifications(notifications.notifs)
			       	]).then(function(res){
			       		$rootScope.$emit('emitActionRT', {group:"Notification", content:notifications.RT});
					});
					break;
				default:
			}	
		}



		this.getRelashionshipDatas = function(ref, other, relashionship_status, context)
		{
			var deferred = $q.defer();

			var relashionship_datas = {};
			relashionship_datas.current = {};
			relashionship_datas.notif = {};
			relashionship_datas.actions = [];

			switch(context)
			{
				case "Membership":
				case "Captaincy":
					var user;
					var team;
					if(ref.age)
					{
						var user = ref;
						var team = other;
					}
					else
					{
						var user = other;
						var team = ref;
					}
					$q.all([
				        factoryTeams.getTeam(team),
		            	factoryUsers.getUser(user)
			       	]).then(function(res){
			       		if(ref.age)
						{
							res.ref = res[1].user;
							res.other = res[0].team;
						}
						else
						{
							res.other = res[1].user;
							res.ref = res[0].team;
						}
				       	res.relashionship_datas = getDatas(res.ref, res.other, relashionship_status, context);
						deferred.resolve(res);	
					});	
					return deferred.promise;
				case "Network":
					$q.all([
						factoryUsers.getUser(ref),
						factoryUsers.getUser(other)
		       		]).then(function(res){
				       	res.ref = res[0].user;
				       	res.other = res[1].user;
				       	res.relashionship_datas = getDatas(res.ref, res.other, relashionship_status, context);
						deferred.resolve(res);	
					});	
					return deferred.promise;
				default:	
			}
		};

		getDatas = function(ref, other, relashionship_status, context)
		{
			var relashionship_datas = {current:{}, notif:{}};
			relashionship_datas.current.status = relashionship_status;
			relashionship_datas.current.img = getRelashionshipSatusImg(relashionship_status, "Classic", context);
			relashionship_datas.actions = getActionsDatas().DO_Action(ref, other, relashionship_status, context);
			relashionship_datas.notifs = getNotifsDatas().DO_Action(ref, other, relashionship_status, context);
			return relashionship_datas;
		};


		getActionsDatas = function()
		{
			return sm_actions;
		};

		getNotifsDatas = function()
		{
			return sm_notifs;
		};



		var sm_actions = StateMachine.create({
			events:
			[
				{ name: 'None_to_Requesting', from: 'None', to: 'Requesting' },
				{ name: 'Refusing_to_Requesting', from: 'Refusing', to: 'Requesting' },
				{ name: 'Refused_to_Requesting', from: 'Refused', to: 'Requesting' },
				{ name: 'Cancelling_to_Requesting', from: 'Cancelling', to: 'Requesting' },
				{ name: 'Cancelled_to_Requesting', from: 'Cancelled', to: 'Requesting' },

				{ name: 'Requesting_to_Requesting', from: 'Requesting', to: 'Requesting' },

				{ name: 'Requested_to_Accepting', from: 'Requested', to: 'Accepting' },
				{ name: 'Requested_to_Refusing', from: 'Requested', to: 'Refusing' },

			    { name: 'Accepting_to_Cancelling', from: 'Accepting', to: 'Cancelling' },
			    { name: 'Accepted_to_Cancelling', from: 'Accepted', to: 'Cancelling' },
			],
		    callbacks: {
			    DO_Action: function(ref, other, relashionship_status, context)
			    {
			    	var datas_actions = [];

			    	this.current = relashionship_status;
			    	var events_names = this.transitions();
			    	for (var i = 0; i < events_names.length; i++)
					{
						var datas_action_i = {};
						var action_name = "DO_" + events_names[i];		    		
				   		this[events_names[i]]();
				   		datas_action_i.next_status_ref = this.current;
				   		datas_action_i.next_status_other = def_transposed_status[this.current];
				   		datas_action_i.next_img = getRelashionshipSatusImg(this.current, "Classic", context);
				   		datas_action_i.text = this[action_name](ref, other, context);
				   		datas_actions.push(datas_action_i);
				   		this.current = relashionship_status;
					}

			    	return datas_actions;
			   	},
			   	DO_None_to_Requesting: function(ref, other, context)
			    {
			   		return getText(ref, other, context, "Classic", arguments.callee.name);	 
				},
				DO_Refusing_to_Requesting: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Classic", arguments.callee.name); 
				},
				DO_Refused_to_Requesting: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Classic", arguments.callee.name);	
				},
				DO_Cancelling_to_Requesting: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Classic", arguments.callee.name);	
				},
				DO_Cancelled_to_Requesting: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Classic", arguments.callee.name);
				},
				DO_Requesting_to_Requesting: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Classic", arguments.callee.name);
				},
				DO_Requested_to_Accepting: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Classic", arguments.callee.name);	
				},
				DO_Requested_to_Refusing: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Classic", arguments.callee.name);	
				},
				DO_Accepting_to_Cancelling: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Classic", arguments.callee.name);	
				},
				DO_Accepted_to_Cancelling: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Classic", arguments.callee.name);
				},
		    }
 		});


 		var sm_notifs = StateMachine.create({
			events:
			[
				{ name: 'Requesting_to_PostRequesting', from: 'Requesting', to: 'PostRequesting' },
				{ name: 'Accepting_to_PostAccepting', from: 'Accepting', to: 'PostAccepting' },
				{ name: 'Refusing_to_PostRefusing', from: 'Refusing', to: 'PostRefusing' },
				{ name: 'Cancelling_to_PostCancelling', from: 'Cancelling', to: 'PostCancelling' },

				{ name: 'Requested_to_Accepting', from: 'Requested', to: 'Accepting' },
				{ name: 'Requested_to_Refusing', from: 'Requested', to: 'Refusing' },
			 
			    { name: 'Accepted_to_PostAccepted', from: 'Accepted', to: 'PostAccepted' },
			    { name: 'Refused_to_PostRefused', from: 'Refused', to: 'PostRefused' },
			    { name: 'Cancelled_to_PostCancelled', from: 'Cancelled', to: 'PostCancelled' },
			],
		    callbacks: {
			    DO_Action: function(ref, other, relashionship_status, context)
			    {
			    	var datas_notifs = [];
			    	this.current = relashionship_status;
			    	var events_names = this.transitions();
			    	for (var i = 0; i < events_names.length; i++)
					{
						var datas_notif_i = {};
						var action_name = "DO_" + events_names[i];	
						datas_notif_i.text = this[action_name](ref, other, context);	    		
				   		this[events_names[i]]();
				   		datas_notif_i.img = getRelashionshipSatusImg(this.current, "Notification", context);
				   		datas_notifs.push(datas_notif_i),
				   		this.current = relashionship_status;
					}

			    	return datas_notifs;
			   	},
			   	DO_Requesting_to_PostRequesting: function(ref, other, context)
			    {
			   		return getText(ref, other, context, "Notification", arguments.callee.name);	 
				},
				DO_Accepting_to_PostAccepting: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Notification", arguments.callee.name); 
				},
				DO_Refusing_to_PostRefusing: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Notification", arguments.callee.name);	
				},
				DO_Cancelling_to_PostCancelling: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Notification", arguments.callee.name);	
				},
				DO_Requested_to_Accepting: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Notification", arguments.callee.name);
				},
				DO_Requested_to_Refusing: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Notification", arguments.callee.name);	
				},
				DO_Accepted_to_PostAccepted: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Notification", arguments.callee.name);	
				},
				DO_Refused_to_PostRefused: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Notification", arguments.callee.name);	
				},
				DO_Cancelled_to_PostCancelled: function(ref, other, context)
			   	{
			   		return getText(ref, other, context, "Notification", arguments.callee.name);
				},
		    }
 		});


		

	}
);