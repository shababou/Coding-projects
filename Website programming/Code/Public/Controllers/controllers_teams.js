angular.module("app").controller
(
	"ctrlTeam",
	function($rootScope, $scope, $timeout, $q, $routeParams, factoryUsers, factoryTeams, factoryNotifications, notifsServices, miscServices)
	{	
		$scope.controller_on = true;

		$scope.options_people = miscServices.options_people;

		$scope.setTeam = function(matrix_reinit)
		{
			var deferred = $q.defer();
			$q.all([
				factoryTeams.getTeam({_id:$routeParams._id}, matrix_reinit),
				factoryUsers.getAllUsers()
			]).then(function(res){	
					if(res[0].success && res[1].data.success)
					{
						$scope.users = angular.copy(res[1].data.users);

						$scope.my_linked_teams = miscServices.filterArrayByDataname(miscServices.filterArrayByCriterias($rootScope.ME.linked_teams, "Accepting", "Accepted", "membership_status"), "team");

						if(res[0].team)
						{
							$scope.team = res[0].team;
							$scope.is_member = miscServices.isObjectInArray($scope.my_linked_teams, $scope.team, "_id").result;
							$scope.team_OK = true;
						}
						else
						{
							var ME = angular.copy($rootScope.ME);
							$scope.team = {};
							$scope.team.name = "";
							$scope.team.founder = ME;
							$scope.team.captains = [];
							$scope.team.captains.push({user:ME, captaincy_status:"Accepting"});
							$scope.team.linked_users = [{user:ME, membership_status:"Accepted", contact_date:new Date()}];
							$scope.team.first_color = "#FFFFFF";
							$scope.team.second_color = "#000000";
							$scope.team.private = false;
							$scope.new_team = true;
							$scope.iam_captain = {result:true};
						}
						$scope.team_users = miscServices.filterArrayByCriterias($scope.team.linked_users, "Accepting", "Accepted", "membership_status");
						$scope.other_users =  miscServices.removeObjectsInArray($scope.users, miscServices.filterArrayByDataname($scope.team_users, "user"), "_id");
					}
					else{console.log(res[0].message + " " + res[1].data.message);}				
			});
		};


		$scope.updatePhoto = function()
		{
			$scope.loading_photo = true;
			factoryFiles.uploadFile(event.target.files[0], $scope.team, "Photo_team")
				.then(function(promise){
					if(promise.data.success)
					{
						var actual_date = (new Date()).toString();
						$scope.team.src_photo = promise.data.src_photo + "?cb=" + actual_date;
						$scope.loading_photo = false;			
					}
				});
		}

		$scope.isCaptain = function(captaincy_status, team)
		{
			var captains = angular.copy(team.captains);
			var is_captain = {};
			if((captaincy_status == 'Accepting') || (captaincy_status == 'Accepted')){is_captain.result = true;}
			else{is_captain.result = false;}
			if(miscServices.filterArrayByCriterias(captains, "Accepted", "Accepting", "captaincy_status").length == 1){is_captain.alone = true;}
			else{is_captain.alone = false;}
			return is_captain;
		}

		$scope.updateTeam = function(team)
		{
			var team_copy = angular.copy(team);
			var reason;
			
			if($scope.new_team){reason = "Creation";}
			else{reason = "Update";}

			factoryTeams.updateTeam(team_copy)
				.then(function(promise){
					if(promise.data.success)
					{
						if($scope.new_team)
						{
							team._id = promise.data.team._id;
							$rootScope.ME.linked_teams.push({team:team, membership_status:"Accepting", contact_date:new Date()});		
							factoryUsers.updateME($rootScope.ME)
								.then(function(promise){
									var notifications = notifsServices.prepareNotifsTeam(team, $rootScope.ME, "Team", reason);
									concludeWithNotifs(notifications);
									window.location.href = "/Team/" + team._id;
								});
						}
						else
						{
							var notifications = notifsServices.prepareNotifsTeam(team, $rootScope.ME, "Team", reason);
							concludeWithNotifs(notifications);
						}
					}
					else{console.log(promise.data.message);}
				});

			function concludeWithNotifs(notifications)
			{
				if(notifications.notifs.length > 0)
				{
					factoryNotifications.updateNotifications(notifications.notifs)
						.then(function(promise){
							if(promise.data.success)
							{		 		
							}
							else{console.log(promise.data.message);}
						});
				}
				if(notifications.RT.length > 0)
				{
					$rootScope.$emit('emitActionRT', {group:"Notification", content:notifications.RT});
				}
			} 	
		}		



		// $rootScope.$on
		// (
		// 	'broadcastTeamUpdated',
		// 	function()
		// 	{
  //          		$scope.setTeam();		
		// 	}
		// );

		// $rootScope.$on
		// (
		// 	'diffuseNotifRT',
		// 	function(event, RT_content)
		// 	{
		// 		if($scope.controller_on)
		// 		{
		// 			if((RT_content.cat == "Team") && (RT_content.type != "membership"))
		// 			{
		// 				console.log("pulse team");
		// 				$scope.setTeam(RT_content.matrix_reinit);
		// 			}
		// 		}
		// 	}
		// );
	}
);
