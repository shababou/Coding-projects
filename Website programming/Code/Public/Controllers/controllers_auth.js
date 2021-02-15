angular.module("app").controller
(
	"ctrlGeneral",
	function($rootScope, $scope, $timeout, $q, $location, factoryAuthUser, factoryUsers, factoryTeams, factoryMarks, factorySchedules, factoryRequests, factoryOffers, miscServices, usersServices)
	{
		$rootScope.Math = window.Math;

		$rootScope.isObjectInArray = function(A, object, dataname_1, dataname_2)
		{
			return miscServices.isObjectInArray(A, object, dataname_1, dataname_2);
		}

		$rootScope.minutesToHours = function(minutes)
		{
			return miscServices.minutesToHours(minutes);
		}

		$rootScope.roundNumber = function(number, precision)
		{
			return miscServices.roundNumber(number, precision);
		}


		$rootScope.ready = false;
		$rootScope.is_logged = factoryAuthUser.isLoggedIn();

		$rootScope.setME = function(reinit)
		{
			console.log("hello");
			factoryUsers.getMe(reinit)
				.then(function(promise){
					if(promise.success)
					{
						$rootScope.ME = promise.user;
						$rootScope.ME.birthdate = new Date($rootScope.ME.birthdate);
						$rootScope.ME.inscription_date = new Date($rootScope.ME.inscription_date);
					}
					else{console.log(promise.message);}					
				});
		};

		$rootScope.completeMarksToUsers = function(matrix_reinit)
		{
			$q.all([
		        factoryUsers.getAllUsers(),
		        factoryRequests.getAllRequests(),
		        factoryOffers.getAllOffers(),
		        factoryMarks.getAllMarks(),
		        factorySchedules.getAllSchedules()
	       	]).then(function(res){
	       		if(res[0].data.success && res[1].data.success  && res[2].data.success  && res[3].data.success  && res[4].data.success)
				{	
					var users = res[0].data.users;
					var requests = res[1].data.requests;
					var offers = res[2].data.offers;
					var marks = res[3].data.marks;
					var schedules = res[4].data.schedules;
					for(var i = 0; i < users.length; i++)
					{
						var marks_user_brut = angular.copy(miscServices.filterArrayByCriterias(marks, users[i]._id, null, "id_assessed", null, 1));
		    			var statistics = usersServices.computeUserStatistics(marks_user_brut, schedules, offers, requests);
		    			users[i].global_synthesis = statistics.global_synthesis;
		    			users[i].global_average = statistics.global_average;
					};

					factoryUsers.setAllUsersSync(users);
					$rootScope.setME();
				}
				else{console.log(res[0].data.message) + " " + console.log(res[1].data.message) + " " + console.log(res[2].data.message) + " " + console.log(res[3].data.message) + " " + console.log(res[4].data.message);}
			});
		}

		$rootScope.completeTeamsToUsers = function(matrix_reinit)
		{
			//$scope.my_linked_teams = [];
			//$rootScope.users_with_teams_OK = false;
				
			//if(!matrix_reinit){matrix_reinit = {'users':false, 'teams':false};}
			$q.all([
				factoryTeams.getAllTeams(),
				factoryUsers.getAllUsers()
			]).then(function(res){	
				if(res[0].data.success && res[1].data.success)
				{
					var teams = res[0].data.teams;
					var users = res[1].data.users;
					for(var i = 0; i < users.length; i++)
					{
						users[i].linked_teams = miscServices.deformatArray(users[i].linked_teams, teams, "team");
					};

					factoryUsers.setAllUsersSync(users);
					$rootScope.setME();

					//$timeout(function(){
					//	$scope.my_linked_teams = miscServices.filterArrayByDataname(miscServices.filterArrayByCriterias($rootScope.ME.linked_teams, "Accepting", "Accepted", "membership_status"), "team");
					//	$rootScope.users_with_teams_OK = true;
					//}, 200);			
				}
				else{console.log(res[0].data.message) + " " + console.log(res[1].data.message);}
			});
			//else{$scope.my_linked_teams = miscServices.filterArrayByDataname(miscServices.filterArrayByCriterias($rootScope.ME.linked_teams, "Accepting", "Accepted", "membership_status"), "team");}
		}

		if($rootScope.is_logged)
		{
			$rootScope.completeMarksToUsers();
			$timeout($rootScope.completeTeamsToUsers(), 100);
			$timeout(function(){$rootScope.ready = true}, 2000);						
		}
		else
		{
			factoryUsers.getAllUsers(true)
				.then(function(promise){
					if(promise.data.success)
					{
						$rootScope.init = true;
					}
					else{console.log(promise.message);}					
				});
		}

		$rootScope.authNeeded = function()
		{
			if(!($rootScope.is_logged) && $rootScope.init)
			{
				$rootScope.$broadcast('launchAuthPopup');
			}			
		};

		$rootScope.$on
		(
			'openingPopup',
			function()
			{
				var el = $(".popup:first").find($(".action"));				
				enableAction(el,1);				
			}
		);
		
		$rootScope.$on
		(
			'closingPopup',
			function()
			{
				var el = $(".popup:first").find($(".action"));				
				enableAction(el,3);				
			}
		);
		
		function enableAction(el,crit)
		{
			if($(".popup:visible").length>crit)
			{
				el.attr('disabled', true);
			}
			else
			{
				el.attr('disabled', false);
			}
		}	
	}
);





angular.module("app").controller
(
	"ctrlAuthentification",
	function($rootScope, $scope, $timeout, $location, factoryAuthUser, miscServices)
	{	
		$scope.user_coming = {};
		$scope.selection_levels = {};
		$scope.selection_auth = {};

		
		$scope.doAuthMethod= function()
		{
			if($scope.selection_auth.name=="Inscription"){createUser($scope.user_coming);}
			else if($scope.selection_auth.name=="Connexion"){logUser($scope.user_coming);}
			else
			{
				factoryAuthUser.logout();
				window.location.reload();
			}
		}
		
		function createUser(user_coming)
		{
			factoryAuthUser.addUser(user_coming)
				.then(function(promise){
					if(promise.data.success){window.location.reload();}
					else{console.log(promise.data.message);}				
				});	
		}
		
		function logUser(user_coming)
		{
			factoryAuthUser.login(user_coming)
				.then(function(promise){					
					if(promise.data.success){window.location.reload();}	
					else
					{
						$timeout(function(){
							
							$scope.$apply(function(){
								$scope.log_error = "Connexion invalide !";
							});
						})
						console.log(promise.data.message);
					}
				});			
		}
		
	}
);


angular.module("app").controller
(
	"ctrlAuthPopup",
	function($scope, $rootScope, $timeout)
	{
		$scope.$on
		(
			'launchAuthPopup',
			function()
			{
	 			$scope.show_auth = true;
		    }
		);
		//La directive signale au controller qui l'encadre (celui-ci) qu'elle a été fermée
		$scope.$on
		(
			'hideAuthPopup',
			function()
			{
				$scope.show_auth = false;
				$timeout(function() {
					$scope.$apply();
				});
			}
		);
	}
);


