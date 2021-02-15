angular.module("app").service
(
	'networkServices',
	function(miscServices)
	{
		var def_matrix_network_img = {};

		def_matrix_network_img["Classic"] = {};
		def_matrix_network_img["Classic"]["None"] = "None_Student"; 
		def_matrix_network_img["Classic"]["Requesting"] = "Requested_Student";
		def_matrix_network_img["Classic"]["Requested"] = "Requested_Student";
		def_matrix_network_img["Classic"]["Accepting"] = "Linked_Student";
		def_matrix_network_img["Classic"]["Accepted"] = "Linked_Student";
		def_matrix_network_img["Classic"]["Refusing"] = "Refused_Student";
		def_matrix_network_img["Classic"]["Refused"] = "Refused_Student";
		def_matrix_network_img["Classic"]["Cancelling"] = "Cancelled_Student";
		def_matrix_network_img["Classic"]["Cancelled"] = "Cancelled_Student";
		def_matrix_network_img["Notification"] = {}; 
		def_matrix_network_img["Notification"]["PostRequesting"] = "Requested_Student";
		def_matrix_network_img["Notification"]["Accepting"] = "Linked_Student";
		def_matrix_network_img["Notification"]["Refusing"] = "Refused_Student";
		def_matrix_network_img["Notification"]["PostAccepting"] = "Linked_Student_notif";
		def_matrix_network_img["Notification"]["PostAccepted"] = "Linked_Student_notif";
		def_matrix_network_img["Notification"]["PostRefused"] = "Rejected_Student_notif";
		def_matrix_network_img["Notification"]["PostRefusing"] = "Rejected_Student_notif";
		def_matrix_network_img["Notification"]["PostCancelling"] = "Rejected_Student_notif";
		def_matrix_network_img["Notification"]["PostCancelled"] = "Rejected_Student_notif";
	

		this.getSatusImg = function(network_status, type)
		{
			return def_matrix_network_img[type][network_status];
		};

		this.getTextAction = function(ref, other, states)
		{
		    if(states == "None_to_Requesting"){return "Souhaitez-vous rajouter " + other.username + " à votre réseau ?";}
			else if(states == "Refusing_to_Requesting"){return "Voulez-vous vraiment retenter d'avoir " + other.username + " dans votre réseau ?";}
			else if(states == "Refused_to_Requesting"){return "Tentez-vous de rejouter de nouveau " + other.username + " dans votre réseau ?";}
			else if(states == "Cancelling_to_Requesting"){return "Souhaitez-vous que " + other.username + " fasse de nouveau partie de votre réseau ?";}
			else if(states == "Cancelled_to_Requesting"){return "Souhaitez-vous que " + other.username + " fasse de nouveau partie de votre réseau ?"}
			else if(states == "Requesting_to_Requesting"){return "";}
			else if(states == "Requested_to_Accepting"){return "Confirmez-vous que " + other.username + " fasse partie de votre réseau ?";}
			else if(states == "Requested_to_Refusing"){return "Refusez-vous vraiment que " + other.username + " fasse partie de votre réseau ?";}
			else if(states == "Accepting_to_Cancelling"){return "Souhaitez-vous vraiment que " + other.username + " ne fasse plus partie de votre réseau ?"}
			else if(states == "Accepted_to_Cancelling"){return "Souhaitez-vous vraiment que " + other.username + " ne fasse plus partie de votre réseau ?"}
			else{}
		};

		this.getTextNotif = function(ref, other, states)
		{
			var other_path = "<a href='/Profile/" + other._id + "'>" + other.username + "</a> ";
		    if(states == "Requested_to_Accepting"){return other_path + "souhaite vous rajouter à votre réseau.";}
		    else if(states == "Requested_to_Refusing"){return other_path + "souhaite vous rajouter à votre réseau.";}
			else if(states == "Requesting_to_PostRequesting"){return "Voulez avez demandé à " + other_path + "de faire partie de votre réseau.";}
			else if(states == "Accepting_to_PostAccepting"){return other_path + "fait désormais partie de votre réseau !";}
			else if(states == "Accepted_to_PostAccepted"){return other_path + "fait désormais partie de votre réseau !";}
			else if(states == "Refusing_to_PostRefusing"){return other_path + "ne fera pas partie de votre réseau.";}
			else if(states == "Refused_to_PostRefused"){return other_path + "ne fera pas partie de votre réseau.";}
			else if(states == "Cancelling_to_PostCancelling"){return other_path + "ne fait plus partie de votre réseau.";}
			else if(states == "Cancelled_to_PostCancelled"){return other_path + "ne fait plus partie de votre réseau.";}
			else{}
		};

		this.updateLinkedUsers = function(user_A, user_B, new_network_status)
		{
			var add_user_to_network = true;
			for (var i=0; i < user_A.linked_users.length; i++)
			{
				if(user_A.linked_users[i].user._id == user_B._id)
				{
					user_A.linked_users[i].network_status = new_network_status;
					user_A.linked_users[i].contact_date = new Date();
					add_user_to_network = false;
					break;
				}
				else{add_user_to_network = true;}
			}
			if(add_user_to_network == true)
			{
				user_A.linked_users.push({
					user:user_B,
					contact_date:new Date(),
					network_status:new_network_status});
			}
			return user_A.linked_users;
		};
	























		this.getCurrentNetworkStatus = function(ME, user)
		{
			var network_status;
			if(miscServices.objectByCriteriaFromArray(ME.linked_users, user._id, "user", "_id", 1))
			{
				network_status = miscServices.objectByCriteriaFromArray(ME.linked_users, user._id, "user", "_id", 1).network_status;
			}
			else{network_status = "None";}
			return network_status;
		};
		
		getNetworkImg_src = function(type, network_status)
		{
			if(def_matrix_network_img_src[type][network_status]){return def_matrix_network_img_src[type][network_status];}
			else{return "";}
		};

		


		this.getStateMachineActions = function()
		{
			return fsm_actions;
		};

		this.getStateMachineNotifications = function()
		{
			return fsm_notifications;
		};



		var fsm_actions = StateMachine.create({
		    events: [
		    	{ name: 'Request_emitter', from: 'None',   to: 'Requesting'  },
		      	{ name: 'Request_receiver', from: 'None',   to: 'Requested'  },

		      	{ name: 'Request_emitter',  from: 'Refusing',  to: 'Requesting' },
		      	{ name: 'Request_receiver',  from: 'Refusing',  to: 'Requested' },
		      	{ name: 'Request_emitter',  from: 'Refused',  to: 'Requesting' },
		      	{ name: 'Request_receiver',  from: 'Refused',  to: 'Requested' },

		      	{ name: 'Request_emitter',  from: 'Cancelling',  to: 'Requesting' },
		      	{ name: 'Request_receiver',  from: 'Cancelling',  to: 'Requested' },
			    { name: 'Request_emitter',  from: 'Cancelled',  to: 'Requesting' },			   
			    { name: 'Request_receiver',  from: 'Cancelled',  to: 'Requested' },

		      	{ name: 'Request_waiting', from: 'Requesting',   to: 'Requesting' },

		      	{ name: 'Confirm_emitter', from: 'Requesting',   to: 'Linking'  },
		      	{ name: 'Confirm_receiver', from: 'Requesting',   to: 'Linked'  },
		      	{ name: 'Confirm_emitter', from: 'Requested',   to: 'Linking'  },
		      	{ name: 'Confirm_receiver', from: 'Requested',   to: 'Linked'  },

		      	{ name: 'Refuse_emitter', from: 'Requesting',   to: 'Refusing'  },
		      	{ name: 'Refuse_receiver', from: 'Requesting',   to: 'Refused'  },
		      	{ name: 'Refuse_emitter', from: 'Requested',   to: 'Refusing'  },
		      	{ name: 'Refuse_receiver', from: 'Requested',   to: 'Refused'  },

		      	{ name: 'Cancel_emitter',  from: 'Linking',  to: 'Cancelling' },
			    { name: 'Cancel_receiver',  from: 'Linking',  to: 'Cancelled' },
			    { name: 'Cancel_emitter',  from: 'Linked',  to: 'Cancelling' },
			    { name: 'Cancel_receiver',  from: 'Linked',  to: 'Cancelled' }
		    ],
		    callbacks: {
		    	doAction: function(ME, user, from)
		    	{
		    		var results = [];

		    		this.current = from;
		    		var events_names = this.transitions();
		    		for (var i = 0; i < events_names.length; i++)
					{
						var event_name = events_names[i];
						var action_name = "do" + event_name;
						var current_text_img = this[action_name](ME, user);			    		
			    		this[event_name]();
			    		var next_state_img = getNetworkImg_src("Classic", this.current);
			    		results.push({action:event_name, current_state:from, current_text_img:current_text_img, next_state:this.current, next_state_img:next_state_img});
			    		this.current = from;
					}
		    		return results;
		    	},
		    	doRequest_waiting: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		current_text_img.text = "";
					current_text_img.network_img_src = getNetworkImg_src("Classic", this.current);
					return current_text_img;
				},
				doNothing: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		current_text_img.text = "";
					current_text_img.network_img_src = getNetworkImg_src("Classic", this.current);
					return current_text_img;
				},
		    	doRequest_emitter: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		if(this.current == "None")
		    		{
			    		current_text_img.text = "Souhaitez-vous rajouter " + user.username + " à votre réseau ?";
					}
					else if(this.current == "Refusing")
					{
						current_text_img.text = "Souhaitez-vous finalement avoir " + user.username + " dans votre réseau ?";
					}
					else if(this.current == "Refused")
					{
						current_text_img.text = "Voulez-vous vraiment retenter d'avoir " + user.username + " dans votre réseau ?";
					}
					else
					{
						current_text_img.text = "Souhaitez-vous que " + user.username + " fasse de nouveau partie de votre réseau ?";
					}
					current_text_img.network_img_src = getNetworkImg_src("Classic", this.current);
					return current_text_img;
				},
		    	doRequest_receiver: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		if(this.current == "None")
		    		{
			    		current_text_img.text = "Souhaitez-vous rajouter " + user.username + " à votre réseau ?";
					}
					else if(this.current == "Refusing")
					{
						current_text_img.text = "Voulez-vous finalement avoir " + user.username + " dans votre réseau ?";
					}
					else if(this.current == "Refused")
					{
						current_text_img.text = "Voulez-vous vraiment retenter d'avoir " + user.username + " dans votre réseau ?";
					}
					else
					{
						current_text_img.text = "Souhaitez-vous que " + user.username + " fasse de nouveau partie de votre réseau ?";
					}
					current_text_img.network_img_src = getNetworkImg_src("Classic", this.current);
					return current_text_img;
				},
				doConfirm_emitter: function(ME, user)
		    	{
		    		var current_text_img = {};
					current_text_img.text = "Acceptez-vous que " + user.username + " fasse partie de votre réseau ?";
					current_text_img.network_img_src = getNetworkImg_src("Classic", this.current);
					return current_text_img;
				},
				doConfirm_receiver: function(ME, user)
		    	{
		    		var current_text_img = {};
					current_text_img.text = "Acceptez-vous que " + user.username + " fasse partie de votre réseau ?";
					current_text_img.network_img_src = getNetworkImg_src("Classic", this.current);
					return current_text_img;
				},
				doRefuse_emitter: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		current_text_img.text = "Refusez-vous vraiment que " + user.username + " fasse partie de votre réseau ?";
					current_text_img.network_img_src = getNetworkImg_src("Classic", this.current);
					return current_text_img;
				},
				doRefuse_receiver: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		current_text_img.text = "Refusez-vous vraiment que " + user.username + " fasse partie de votre réseau ?";
					current_text_img.network_img_src = getNetworkImg_src("Classic", this.current);
					return current_text_img;
				},
				doCancel_emitter: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		current_text_img.text = "Souhaites-tu réellement exclure " + user.username + " de votre réseau ?";
					current_text_img.network_img_src = getNetworkImg_src("Classic", this.current);
					return current_text_img;
				},
				doCancel_receiver: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		current_text_img.text = "Souhaites-tu réellement exclure " + user.username + " de votre réseau ?";
					current_text_img.network_img_src = getNetworkImg_src("Classic", this.current);
					return current_text_img;
				}
		    }
 		});




		var fsm_notifications = StateMachine.create({
		    events: [
		      	{ name: 'Accept_emitter',  from: 'Requesting',  to: 'Requesting' },
		      	{ name: 'Accept_receiver',  from: 'Requested',  to: 'Linking' },
		      	{ name: 'Accept_receiver',  from: 'Requested',  to: 'Linked' },

		      	{ name: 'Refuse_emitter',  from: 'Requesting',  to: 'Requesting' },
		      	{ name: 'Refuse_receiver',  from: 'Requested',  to: 'Refusing' },
			    { name: 'Refuse_receiver',  from: 'Requested',  to: 'Refused' },

			    { name: 'Confirm_emitter',  from: 'Linking',  to: 'Confirm_Linking' },
			    { name: 'Confirm_receiver',  from: 'Linked',  to: 'Confirm_Linked' },
			    { name: 'Confirm_emitter',  from: 'Refusing',  to: 'Confirm_Refusing' },
			    { name: 'Confirm_receiver',  from: 'Refused',  to: 'Confirm_Refused' },
			    { name: 'Confirm_emitter',  from: 'Cancelling',  to: 'Confirm_Cancelling' },
			    { name: 'Confirm_receiver',  from: 'Cancelled',  to: 'Confirm_Cancelled' }
		    ],
		    callbacks: {
		    	doAction: function(ME, user, from)
		    	{
		    		var results = [];

		    		this.current = from;
		    		var events_names = this.transitions();
		    		for (var i=0; i < events_names.length; i++)
					{
						var current_text_img = {};
						var event_name = events_names[i];
						var action_name = "do" + event_name;
						current_text_img.text = this[action_name](ME, user).text;			    		
			    		this[event_name]();
			    		current_text_img.network_img_src = this[action_name](ME, user).network_img_src;
			    		results.push({action:event_name, current_text_img:current_text_img, next_state:this.current});
			    		this.current = from;
					}

		    		return results;
		    	},
		    	doAccept_emitter: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		current_text_img.text = "Vous avez demandé à "+ user.username + " (" + user.activity + "), de faire partie de votre réseau.";
					current_text_img.network_img_src = getNetworkImg_src("Notification", this.current);
					return current_text_img;
				},
				doAccept_receiver: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		current_text_img.text = user.username + " (" + user.activity + ") souhaite faire partie de votre réseau.";
					current_text_img.network_img_src = getNetworkImg_src("Notification", this.current);
					return current_text_img;
				},
				doRefuse_emitter: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		current_text_img.text = user.username + " (" + user.activity + ") souhaite faire partie de votre réseau.";
					current_text_img.network_img_src = getNetworkImg_src("Notification", this.current);
					return current_text_img;
				},
				doRefuse_receiver: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		current_text_img.text = user.username + " (" + user.activity + ") souhaite faire partie de votre réseau.";
					current_text_img.network_img_src = getNetworkImg_src("Notification", this.current);
					return current_text_img;
				},
		    	doConfirm_emitter: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		if(this.current == "Linking")
		    		{
		    			current_text_img.text = "Vous avez accepté que " + user.username + " (" + user.activity + "), fasse partie de votre réseau !";
					}
					else if(this.current == "Refusing")
					{
						current_text_img.text = user.username + " (" + user.activity + ") ne fera pas partie de votre réseau !";
					}
					else
					{
						current_text_img.text = "Vous ne souhaitez plus que " + user.username + " (" + user.activity + ") fasse partie de votre réseau.";
					}
					current_text_img.network_img_src = getNetworkImg_src("Notification", this.current);
					return current_text_img;
				},
				doConfirm_receiver: function(ME, user)
		    	{
		    		var current_text_img = {};
		    		if(this.current == "Linked")
		    		{
		    			current_text_img.text = user.username + " (" + user.activity + ") a accepté de faire partie de votre réseau !";						
					}
					else if(this.current == "Refused")
					{
						current_text_img.text = user.username + " (" + user.activity + "), a refusé de faire partie de votre réseau !";
					}
					else
					{
						current_text_img.text = user.username + " (" + user.activity + ") ne souhaite plus faire partie de votre réseau.";
					}
					current_text_img.network_img_src = getNetworkImg_src("Notification", this.current);
					return current_text_img;
				}
		    }
 		});

	}
);