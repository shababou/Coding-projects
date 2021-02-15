angular.module("app").controller
(
	"ctrlWelcome",
	function($scope, $q, factoryUsers, factoryTeams, miscServices)
	{
		$scope.options_people = miscServices.options_people;

		var deferred = $q.defer();
		$q.all([
			factoryUsers.getAllUsers(),
			factoryTeams.getAllTeams()
	    ]).then(function(res){	
			if(res[0].data.success && res[1].data.success)
			{
				$scope.users = res[0].data.users;
				$scope.teams = res[1].data.teams;
						
				$scope.welcome_OK = true;
			}		
			 else{console.log(res[0].data.message + " " + res[1].data.message);}
		});
	 }
);
