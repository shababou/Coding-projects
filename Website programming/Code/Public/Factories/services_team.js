angular.module("app").service
(
	'membershipServices',
	function(miscServices)
	{
		var def_matrix_membership_img = {};

		def_matrix_membership_img["Classic"] = {};
		def_matrix_membership_img["Classic"]["None"] = "Refused_Member"; 
		def_matrix_membership_img["Classic"]["Requesting"] = "In_Member";
		def_matrix_membership_img["Classic"]["Requested"] = "In_Member";
		def_matrix_membership_img["Classic"]["Accepting"] = "Linked_Member";
		def_matrix_membership_img["Classic"]["Accepted"] = "Linked_Member";
		def_matrix_membership_img["Classic"]["Refusing"] = "Refused_Member";
		def_matrix_membership_img["Classic"]["Refused"] = "Refused_Member";
		def_matrix_membership_img["Classic"]["Cancelling"] = "Linked_Member";
		def_matrix_membership_img["Classic"]["Cancelled"] = "Refused_Member";
		def_matrix_membership_img["Notification"] = {}; 
		def_matrix_membership_img["Notification"]["PostRequesting"] = "Requested_Member";
		def_matrix_membership_img["Notification"]["Accepting"] = "In_Member";
		def_matrix_membership_img["Notification"]["Refusing"] = "Out_Member";
		def_matrix_membership_img["Notification"]["PostAccepting"] = "In_Member";
		def_matrix_membership_img["Notification"]["PostAccepted"] = "In_Member";
		def_matrix_membership_img["Notification"]["PostRefused"] = "Out_Member";
		def_matrix_membership_img["Notification"]["PostRefusing"] = "Out_Member";
		def_matrix_membership_img["Notification"]["PostCancelling"] = "Out_Member";
		def_matrix_membership_img["Notification"]["PostCancelled"] = "Out_Member";
	

		this.getSatusImg = function(network_status, type)
		{
			return def_matrix_membership_img[type][network_status];
		};

		this.getTextAction = function(ref, other, states)
		{
		    if(states == "None_to_Requesting")
		    {
		    	if(ref.age){return "Souhaitez-vous rejoindre l'équipe " + other.name + " ?";}
		    	else{return "Rajouter " + other.username + " à l'équipe ?";}
		    }
			else if(states == "Refusing_to_Requesting")
			{
		    	if(ref.age){return "Voulez-vous finalement rejoindre l'équipe " + other.name + " ?";}
		    	else{return "Rajouter finalement " + other.username + " à l'équipe ?";}
		    }
			else if(states == "Refused_to_Requesting")
			{
		    	if(ref.age){return "Tentez-vous de nouveau de rejoindre l'équipe " + other.name + " ?";}
		    	else{return "Rajouter encore " + other.username + " à l'équipe ?";}
		    }
			else if(states == "Cancelling_to_Requesting")
			{
		    	if(ref.age){return "Vous avez voulu quitter l'équipe " + other.name + ". Confirmez-vous vouloir la joindre de nouveau ?";}
		    	else{return other.username + " ne fait plus partie de l'équipe. Le rajouter quand même ?";}
		    }
		    else if(states == "Requesting_to_Requesting")
			{
		    	if(ref.age){return "";}
		    	else{return "";}
		    }
			else if(states == "Cancelled_to_Requesting")
			{
		    	if(ref.age){return "Vous ne faites plus partie de l'équipe " + other.name + ". Confirmez-vous vouloir la joindre de noveau ?";}
		    	else{return other.username + " a voulu partir de l'équipe. Le rajouter quand même ?";}
		    }
			else if(states == "Requested_to_Accepting")
			{
		    	if(ref.age){return "Confirmez-vous vouloir rejoindre l'équipe " + other.name + " ?";}
		    	else{return "Rajouter " + other.username + " à l'équipe ?";}
		    }
			else if(states == "Requested_to_Refusing")
			{
		    	if(ref.age){return "Renoncez-vous à vouloir rejoindre l'équipe " + other.name + " ?";}
		    	else{return "Refuser " + other.username + " dans l'équipe ?";}
		    }
			else if(states == "Accepting_to_Cancelling")
			{
		    	if(ref.age){return "Voulez-vous quitter l'équipe " + other.name + " ?";}
		    	else{return "Exclure " + other.username + " de l'équipe ?";}
		    }
			else if(states == "Accepted_to_Cancelling")
			{
		    	if(ref.age){return "Voulez-vous quitter l'équipe " + other.name + " ?";}
		    	else{return "Exclure " + other.username + " de l'équipe ?";}
		    }
			else{}
		};

		this.getTextNotif = function(ref, other, states)
		{
			var other_path;
			if(ref.age){other_path = "<a href='/Team/" + other._id + "'>" + other.name + "</a> ";}
			else{other_path = "<a href='/Profile/" + other._id + "'>" + other.username + "</a> ";}
		    if(states == "Requesting_to_PostRequesting")
		    {
		    	if(ref.age){return "Vous avez demandé à rejoindre l'équipe " + other_path + ".";}
		    	else{return "Une demande a été envoyée à " + other_path + "pour rejoindre l'équipe.";}
		    }
			else if(states == "Requested_to_Accepting")
			{
		    	if(ref.age){return "L'équipe " + other_path + "désire que vous soyiez membre.";}
		    	else{return other_path + "souhaite rejoindre l'équipe.";}
		    }
		    else if(states == "Requested_to_Refusing")
			{
		    	if(ref.age){return "L'équipe " + other_path + "désire que vous soyiez membre.";}
		    	else{return other_path + "souhaite rejoindre l'équipe.";}
		    }
			else if(states == "Accepting_to_PostAccepting")
			{
		    	if(ref.age){return "Vous êtes désormais membre l'équipe " + other_path + "!";}
		    	else{return other_path + "est désormais membre de l'équipe !";}
		    }
			else if(states == "Accepted_to_PostAccepted")
			{
		    	if(ref.age){return "Votre demande a été acceptée. Vous êtes désormais membre l'équipe " + other_path + "!";}
		    	else{return other_path + "est désormais membre de l'équipe !";}
		    }
			else if(states == "Refusing_to_PostRefusing")
			{
		    	if(ref.age){return "Vous n'avez pas souhaité rejoindre l'équipe " + other_path + ".";}
		    	else{return other_path + "ne fera pas partie de l'équipe.";}
		    }
			else if(states == "Refused_to_PostRefused")
			{
		    	if(ref.age){return "L'équipe " + other_path + "n'a pas accepté que vous soyiez membre.";}
		    	else{return other_path + "ne fera pas partie de l'équipe !";}
		    }
			else if(states == "Cancelling_to_PostCancelling")
			{
		    	if(ref.age){return "Vous avez souhaité quitter l'équipe " + other_path + ".";}
		    	else{return "Exclusion de " + other_path + ", qui n'est plus membre de l'équipe.";}
		    }
			else if(states == "Cancelled_to_PostCancelled")
			{
		    	if(ref.age){return "Vous ne faites plus partie de l'équipe " + other_path + ".";}
		    	else{return other_path + "a souhaité quitter l'équipe.";}
		    }
			else{}
		};

		this.updateMembershipTeam = function(user, team, new_membership_status)
		{
			var add_membership_to_team = true;
			for (var i=0; i < team.linked_users.length; i++)
			{
				if(team.linked_users[i].user._id == user._id)
				{
					team.linked_users[i].membership_status = new_membership_status;
					team.linked_users[i].contact_date = new Date();
					add_membership_to_team = false;
					break;
				}
				else{add_membership_to_team = true;}
			}
			if(add_membership_to_team == true)
			{
				team.linked_users.push({
					user:user,
					contact_date:new Date(),
					membership_status:new_membership_status});
			}
			return team.linked_users;
		};

		this.updateMembershipMember = function(user, team, new_membership_status)
		{
			var add_team_to_user = true;
			for (var i=0; i < user.linked_teams.length; i++)
			{
				if(user.linked_teams[i].team._id == team._id)
				{
					user.linked_teams[i].membership_status = new_membership_status;
					user.linked_teams[i].contact_date = new Date();
					add_team_to_user = false;
					break;
				}
				else{add_team_to_user = true;}
			}
			if(add_team_to_user == true)
			{
				user.linked_teams.push({
					team:team,
					contact_date:new Date(),
					membership_status:new_membership_status});
			}
			return user.linked_teams;
		};
	}
);





angular.module("app").service
(
	'captaincyServices',
	function(miscServices)
	{
		var def_matrix_captaincy_img = {};

		def_matrix_captaincy_img["Classic"] = {};
		def_matrix_captaincy_img["Classic"]["None"] = "None_Captaincy"; 
		def_matrix_captaincy_img["Classic"]["Requesting"] = "Requested_Captaincy";
		def_matrix_captaincy_img["Classic"]["Requested"] = "Requested_Captaincy";
		def_matrix_captaincy_img["Classic"]["Accepting"] = "Acted_Captaincy";
		def_matrix_captaincy_img["Classic"]["Accepted"] = "Acted_Captaincy";
		def_matrix_captaincy_img["Classic"]["Refusing"] = "Refused_Captaincy";
		def_matrix_captaincy_img["Classic"]["Refused"] = "Refused_Captaincy";
		def_matrix_captaincy_img["Classic"]["Cancelling"] = "Cancelled_Captaincy";
		def_matrix_captaincy_img["Classic"]["Cancelled"] = "Cancelled_Captaincy";
		def_matrix_captaincy_img["Notification"] = {}; 
		def_matrix_captaincy_img["Notification"]["PostRequesting"] = "Requested_Captaincy";
		def_matrix_captaincy_img["Notification"]["Accepting"] = "Acted_Captaincy";
		def_matrix_captaincy_img["Notification"]["Refusing"] = "Refused_Captaincy";
		def_matrix_captaincy_img["Notification"]["PostAccepting"] = "Acted_Captaincy";
		def_matrix_captaincy_img["Notification"]["PostAccepted"] = "Acted_Captaincy";
		def_matrix_captaincy_img["Notification"]["PostRefused"] = "Refused_Captaincy";
		def_matrix_captaincy_img["Notification"]["PostRefusing"] = "Refused_Captaincy";
		def_matrix_captaincy_img["Notification"]["PostCancelling"] = "Cancelled_Captaincy";
		def_matrix_captaincy_img["Notification"]["PostCancelled"] = "Cancelled_Captaincy";


		this.getSatusImg = function(network_status, type)
		{
			return def_matrix_captaincy_img[type][network_status];
		};

		this.getTextAction = function(ref, other, states)
		{
		    if(states == "None_to_Requesting")
		    {
		    	if(ref.age){return "Souhaitez-vous devenir un capitaine de l'équipe ?";}
		    	else{return "Rajouter " + other.username + " en tant qu'un capitaine de l'équipe ?";}
		    }
			else if(states == "Refusing_to_Requesting")
			{
		    	if(ref.age){return "Souhaitez-vous finalement devenir un capitaine de l'équipe ?";}
		    	else{return "Rajouter finalement " + other.username + " en tant qu'un capitaine de l'équipe ?";}
		    }
			else if(states == "Refused_to_Requesting")
			{
		    	if(ref.age){return "Tentez-vous de nouveau devenir un capitaine de l'équipe ?";}
		    	else{return "Rajouter encore " + other.username + " en tant qu'un capitaine de l'équipe ?";}
		    }
			else if(states == "Cancelling_to_Requesting")
			{
		    	if(ref.age){return "Souhaitez-vous redevenir un capitaine de l'équipe ?";}
		    	else{return "Rappeler " + other.username + " en tant qu'un capitaine de l'équipe ?";}
		    }
			else if(states == "Cancelled_to_Requesting")
			{
		    	if(ref.age){return "Souhaitez-vous redevenir un capitaine de l'équipe ?";}
		    	else{return "Rappeler " + other.username + " en tant qu'un capitaine de l'équipe ?";}
		    }
			else if(states == "Requested_to_Accepting")
			{
		    	if(ref.age){return "Acceptez-vous vraiment à être un capitaine de l'équipe ?";}
		    	else{return "Accepter " + other.username + " en tant que capitaine dans l'équipe ?";}
		    }
			else if(states == "Requested_to_Refusing")
			{
		    	if(ref.age){return "Refusez-vous vraiment être un capitaine de l'équipe ?";}
		    	else{return "Refuser " + other.username + " en tant que capitaine de l'équipe ?";}
		    }
			else if(states == "Accepting_to_Cancelling")
			{
		    	if(ref.age){return "Souhaitez-vous réellement renoncer à votre capitanat ?";}
		    	else{return "Retirer le capitanat à " + other.username + " ?";}
		    }
			else if(states == "Accepted_to_Cancelling")
			{
		    	if(ref.age){return "Souhaitez-vous réellement renoncer à votre capitanat ?";}
		    	else{return "Retirer le capitanat à " + other.username + " ?";}
		    }
			else{}
		};

		this.getTextNotif = function(ref, other, states)
		{
			var other_path = "<a href='/Profile/" + other._id + "'>" + other.username + "</a> ";
		    if(states == "Requesting_to_PostRequesting")
		    {
		    	if(ref.age){return "Vous avez demandé à devenir un capitaine de l'équipe.";}
		    	else{return "Une demande a été envoyée à " + other_path + " pour devenir un capitaine de l'équipe.";}
		    }
			else if(states == "Requested_to_Accepting")
			{
		    	if(ref.age){return "L'équipe souhaite que vous deveniez un capitaine.";}
		    	else{return other_path + " souhaite devenir un capitaine de l'équipe.";}
		    }
		    else if(states == "Requested_to_Refusing")
			{
		    	if(ref.age){return "L'équipe souhaite que vous deveniez un capitaine.";}
		    	else{return other_path + " souhaite devenir un capitaine de l'équipe.";}
		    }
			else if(states == "Accepting_to_PostAccepting")
			{
		    	if(ref.age){return "Vous avez accepté de devenir un capitaine de l'équipe !" ;}
		    	else{return other_path + " est désormais membre de l'équipe !" ;}
		    }
			else if(states == "Accepted_to_PostAccepted")
			{
		    	if(ref.age){return "Vous êtes desormais un capitaine de l'équipe !";}
		    	else{return other_path + " a accepté de devenir un capitaine de l'équipe !";}
		    }
			else if(states == "Refusing_to_PostRefusing")
			{
		    	if(ref.age){return "Vous avez refusé le capitanat de l'équipe.";}
		    	else{return "Le capitanat a été refusé à " + other_path + ".";}
		    }
			else if(states == "Refused_to_PostRefused")
			{
		    	if(ref.age){return "Le capitanat de l'équipe vous a été refusé.";}
		    	else{return other_path + " a refusé de devenir un capitaine de l'équipe.";}
		    }
			else if(states == "Cancelling_to_PostCancelling")
			{
		    	if(ref.age){return "Vous ne souhaitez plus être capitaine de l'équipe.";}
		    	else{return "Le capitanat a été retiré à " + other_path + ".";}
		    }
			else if(states == "Cancelled_to_PostCancelled")
			{
		    	if(ref.age){return "Vous n'êtes plus capitaine de l'équipe.";}
		    	else{return other_path + " n'est plus capitaine de l'équipe.";}
		    }
			else{}
		};

		this.updateCaptainsTeam = function(ref, other, next_status_ref, next_status_other)
		{
			var user;
			var team;
			var new_captaincy_status;
			if(ref.age)
			{
				user = angular.copy(ref);
				team = angular.copy(other);
				new_captaincy_status = next_status_other;
			}	
			else
			{
				user = angular.copy(other);
				team = angular.copy(ref);
				new_captaincy_status = next_status_ref;
			}

			var add_captain_to_team = true;
			for (var i=0; i < team.captains.length; i++)
			{
				if(team.captains[i].user._id == user._id)
				{
					team.captains[i].captaincy_status = new_captaincy_status;
					add_captain_to_team = false;
					break;
				}
				else{add_captain_to_team = true;}
			}
			if(add_captain_to_team == true)
			{
				team.captains.push({
					user:user,
					captaincy_status:new_captaincy_status});
			}
			return {team:team, captain:user};
		};

	}
);