angular.module("app").factory
(
	"factoryTeams",
	function($http, $timeout, $q, factoryUsers, membershipServices, miscServices)
	{	
		var factoryTeams = {};
		var all_teams = {data:{teams:[],success:true,message:"Deformat teams OK"}};
		
		factoryTeams.getAllTeams = function(matrix_reinit)
		{
			var deferred = $q.defer();

			if(all_teams.data.teams.length == 0 || (matrix_reinit && matrix_reinit['teams']))
			{
				if(!matrix_reinit){matrix_reinit = {'users':false};}

				console.log("teams");
				all_teams.data.teams = [];

				$q.all([
		            $http.get('/api/getAllTeams'),
		            factoryUsers.getAllUsers()
	       		]).then(function(res){
	       				for (var i=0; i < res[0].data.teams.length; i++)
						{
							var team_i = {
								team:res[0].data.teams[i],
								message:res[0].data.message,
								success:res[0].data.success
							};
							if(!miscServices.isObjectInArray(all_teams.data.teams, team_i.team, "_id").result)
							{
								var deformatted_team_i = team_i;
								var deformatted_team_i = deformatTeam(team_i, res[1].data);
								if(deformatted_team_i.success)
								{
									all_teams.data.teams.push(deformatted_team_i.team);
								}
								else
								{
									all_teams.data.success = false;
									all_teams.data.message = "Error when loading and deformatting all teams"
									deferred.resolve(all_teams);
								}
							}
						}
						deferred.resolve(all_teams);
					});
			}
			else
			{		
				deferred.resolve(all_teams);
			}

			return deferred.promise;
		};


       	function deformatTeam(data_0, data_1, data_2)
		{
			var team = data_0.team;
			var users = data_1.users;
			team = miscServices.deformatData(team, users, "founder");
			team.linked_users = miscServices.deformatArray(team.linked_users, users, "user");
			team.captains = miscServices.deformatArray(team.captains, users, "user");
			var messages = [data_0.message, data_1.message];
			var results = {};
			results.messages = messages;
			results.team = team;
			if(data_0.success && data_1.success){results.success = true;}
			else{results.success = false;}
		    return results;
		};

		factoryTeams.allTeamsSync = function()
		{
			return angular.copy(all_teams.data.teams);
		}

		factoryTeams.allTeamsNames = function()
		{
			return angular.copy(miscServices.filterArrayByDataname(factoryTeams.allTeamsSync(), 'name'));
		}


		factoryTeams.getTeam = function(team, matrix_reinit)
		{
			var deferred = $q.defer();

			$q.all([
	            factoryTeams.getAllTeams(matrix_reinit)
       		]).then(function(res){
					var data = {};
		       		data.success = all_teams.data.success;
		       		data.message = all_teams.data.message;
					for (var i = 0; i < all_teams.data.teams.length; i++)
					{
						if(all_teams.data.teams[i]._id == team._id)
						{
							data.team = all_teams.data.teams[i];
							deferred.resolve(data);			
						}
					}
					deferred.resolve(data);
				});

	       	return deferred.promise;
		};



		function formatTeam(team)
		{
			team.linked_users = miscServices.formatArray(team.linked_users, "user");
			team.captains = miscServices.formatArray(team.captains, "user");
			team = miscServices.formatData(team, "founder");
		    return team;
		}


		factoryTeams.updateMembershipStatus = function(ref, other, next_status_ref, next_status_other)
		{
			if(ref.age)
			{
				var user = angular.copy(ref);
				var team = angular.copy(other);
				var next_status_team = next_status_other;
				var next_status_user = next_status_ref;
			}	
			else
			{
				var user = angular.copy(other);
				var team = angular.copy(ref);
				var next_status_team = next_status_ref;
				var next_status_user = next_status_other;
			}	

			var prepa_OK = false;
			team.linked_users = membershipServices.updateMembershipTeam(user, team, next_status_team);
			user.linked_teams= membershipServices.updateMembershipMember(user, team, next_status_user);
			prepa_OK = true;
			var deferred = $q.defer();
			if(prepa_OK)
			{
				var member_formatted = factoryUsers.formatUser(user);
							console.log(member_formatted)
				var team_formatted = formatTeam(team);
				console.log(team_formatted)
				$q.all([
		            $http.post('/api/updateUsers', [member_formatted]),
		            $http.post('/api/updateTeam', team_formatted)
	       		]).then(function(res){
			       		var messages = [res[0].data.message, res[1].data.message];
			       		var results = {};
			       		results.messages = messages;
			       		if(res[0].data.success && res[1].data.success){results.success = true;}
			       		else{results.success = false;}
			       		deferred.resolve(results);
					});
	       	}

       		return deferred.promise;	
		};


		factoryTeams.updateTeam = function(team)
		{	
			return $http.post('/api/updateTeam', formatTeam(team))
				.success(function(res){
					return res;
			});		
		};

		return factoryTeams;		
	}
);