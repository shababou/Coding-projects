angular.module("app").controller
(
	"ctrlRelashionship",
	function($rootScope, $scope, relashionshipServices)
	{
		$scope.controller_on = true;

		$scope.setRelashionshipDatas = function(ref, other, context, for_notification)
		{
			$scope.action_possible = false;
			$scope.for_notification = for_notification;
			$scope.current_status;
			console.log(context);
			console.log(ref);
			console.log(other);

			$scope.current_status = relashionshipServices.getCurrentRelashionshipStatus(angular.copy(ref), angular.copy(other), context);

			relashionshipServices.getRelashionshipDatas(ref, other, $scope.current_status, context)
				.then(function(promise){
					if(promise[0].success && promise[1].success)
					{
						$scope.relashionship_datas = promise.relashionship_datas;
						if( (!$scope.for_notification && ($scope.current_status != "Requesting") && ($scope.current_status != "Requested") && ($scope.current_status != "Accepting") && ($scope.current_status != "Accepted"))  
							|| ($scope.for_notification && $scope.current_status == "Requested")) 
						{			
							$scope.action_possible = true;
						}	
									console.log($scope.relashionship_datas);
		
					}
					else{console.log(promise[0].message + " " + promise[1].message);}	
				});	
		};
	}
);

angular.module("app").controller
(
	"ctrlRelashionshipPopup",
	function($rootScope, $scope, $timeout)
	{
		$scope.show_relashionship = false;

		$scope.$on
		(
			'hideRelashionshipPopup',
			function(event, nb_popups_open)
			{
				$scope.$apply(function () {
            		$scope.show_relashionship = false;
        		});
				$rootScope.$emit('closingPopup'); //On informe le controller parent de la page appellante qu'il y a eu un changement d'état au niveau des popups
			}
		);
	
		//Ouverture de la directive -> update des inputs		
		$scope.openRelashionshipPopup = function()
		{
			$scope.show_relashionship = true;
		};
		
		$rootScope.$emit('openingPopup'); //La directive signale au controller qui l'encadre (celui-ci) qu'elle a été ouverte		
	}
);


//ROLE: Gérer le formulaire de l'ajout d'un individu au réseau
angular.module("app").controller
(
	"setupRelashionship",
	function($rootScope, $scope, relashionshipServices)
	{
		$scope.updateRelashionship = function(ref, user, datas, index, context)
		{
			relashionshipServices.updateRelashionship(ref, user, datas, index, context);
		}
	}
);

