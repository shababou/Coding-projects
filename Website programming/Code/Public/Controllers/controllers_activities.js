angular.module("app").controller
(
	"ctrlNotifications",
	function($rootScope, $scope, $timeout, factoryNotifications, notifsServices)
	{
		$scope.controller_on = true;

		$scope.setNotifications = function(player, matrix_reinit)
		{	
			$scope.notifications = [];
			$scope.player = player;

			factoryNotifications.getMyNotifications(player, matrix_reinit)
				.then(function(promise){
					if(promise.data.success)
					{
						$scope.notifications = promise.data.notifications;
						$scope.notifications_OK = true;
					}
					else{console.log(promise.data.message);}
				});
		};


		$rootScope.$on
		(
			'diffuseNotifRT',
			function(event, RT_content)
			{
				if($scope.controller_on)
				{
					console.log("pulse notifications");
					if(RT_content.cat != "Team")
					{
						if(RT_content.cat == "Network")
						{
				          	$rootScope.$broadcast('broadcastNetworkUpdated');
						}
						else if(RT_content.cat == "Report")
						{
				        	$rootScope.$broadcast('broadcastReportUpdated');
				         	$scope.setNotifications($scope.player, RT_content.matrix_reinit);
				        }
				         else
				        {
				           	$scope.setNotifications($scope.player, RT_content.matrix_reinit);
				        }
						$timeout(function(){
							if(RT_content.matrix_reinit['users']){$rootScope.setME(true);}
						}, 1000);
					}	
				}
			}
		);

		$scope.$on('$routeChangeStart', function(event){
			$scope.controller_on = false;
		});	
	}
);


angular.module("app").controller
(
	"ctrlTextNotifs",
	function($scope, notifsServices)
	{
		$scope.getTextNotif = function(ME, notif)
		{
		    return notifsServices.getTextForNotifs(ME, notif);
		};		
	}
);











