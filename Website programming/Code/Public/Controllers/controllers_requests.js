angular.module("app").controller
(
	"ctrlRequests",
	function($rootScope, $scope, $timeout, $location, factoryRequests, googleServices, miscServices)
	{
		$scope.controller_on = true;

		$scope.setRequests = function(matrix_reinit)
		{
			//$scope.range_max = 100;
			//$scope.filter = {};
			//$scope.filter.range_target = 5;
			$scope.requests_OK = false;
			$scope.map_OK = false;
			$scope.requests_to_display = [];

			factoryRequests.getAllRequests(matrix_reinit)
				.then(function(promise){
					if(promise.data.success)
					{
						$scope.requests = promise.data.requests;
						googleServices.completePOIArrayWithDest($rootScope.ME, $scope.requests, "Request")
							.then(function(promise){
								$scope.requests = promise;
								$scope.my_linked_teams = miscServices.filterArrayByDataname(miscServices.filterArrayByCriterias($rootScope.ME.linked_teams, "Accepting", "Accepted", "membership_status"), "team");										 
								for(var i = 0; i < $scope.requests.length; i++)
								{
									if($scope.requests[i].linked_teams.length > 0)
									{
										var teams_request = miscServices.filterArrayByDataname($scope.requests[i].linked_teams, "team");
										if(!miscServices.areObjectsFromArrayAInArrayB(teams_request, $scope.my_linked_teams, "_id"))
										{
											$scope.requests.splice(i, 1);
										}								
									}								
								}
								$scope.kind = "Classic";

								$scope.setRequestsByDistance();

								$scope.requests_OK = true;
								$scope.map_OK = true;
							});
					}
				});
			}
		
		//Etablit les annonces à afficher, sur la map comme dans la liste, en fonction de la distance target		
		$scope.setRequestsByDistance = function()
		{
			$scope.requests_to_display = [];
			for(var i = 0; i < $scope.requests.length; i++)
			{
				//if($scope.requests[i].distance <= $scope.filter.range_target)
				//{
					$scope.requests_to_display.push($scope.requests[i]);
				//}
			}
		};


		$scope.clickOnRequest = function(id_request)
		{
			$location.path($location.path() + '/' + id_request);			
		}

		$rootScope.$on
		(
			'diffuseNotifRT',
			function(event, RT_content)
			{
				if($scope.controller_on)
				{
					console.log("pulse requests");
					$timeout(function(){
						$scope.setRequests(RT_content.matrix_reinit);
					}, 1000);
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
	"ctrlCartRequest",
	function($scope, factoryUsers, factoryTopics, factorySubjects, miscServices)
	{
		$scope.next_date = miscServices.getNextDate();
				
		$scope.request = {};
		$scope.request.contents = []; //Tableau listant les éléments du caddie		
	}
);


//ROLE : gérer la suppression d’un élément du caddie
angular.module("app").controller
(
	"ctrlElementI",
	function($rootScope, $scope, $element)
	{
		
		$scope.selection_categories.selected_subjects = [];

		$scope.addElement = function(index, selected_format)
		{
			var subjects = [];
			if(selected_format.name != "Question")
			{
				for (var i=0; i < $scope.selection_categories.selected_subjects.length; i++)
				{
					subjects[i] = {subject:$scope.selection_categories.selected_subjects[i]};
				}
			}
			var new_content = {
				category:$scope.selection_categories.selected_category,
				level:$scope.selection_categories.selected_level,
				topic:$scope.selection_categories.selected_topics[index],
				subjects:subjects,
				format:selected_format,
				other:$scope.selection_categories.question,
			}
			$scope.request.contents.push(new_content);
		};

		$scope.removeElement = function(index)
		{
			$scope.request.contents.splice(index,1);
			$element.remove();
		};				
	}
);



//ROLE: Gérer le formulaire de création d'une annonce.
angular.module("app").controller
(
	"setupRequest",
	function($rootScope, $scope, $timeout, $q, $location, factoryRequests, factoryNotifications, miscServices, notifsServices)
	{	
		$scope.selection_teams = {};
		$scope.selection_teams.selected_teams = [];

		$scope.request.linked_teams = [];

		$scope.createRequest = function()
		{		
			$scope.request.student = $rootScope.ME;	
			$scope.request.nb_participants = $scope.request.nb_participants + 1;

			for (var i=0; i < $scope.selection_teams.selected_teams.length; i++)
			{
				$scope.request.linked_teams[i] = {team:$scope.selection_teams.selected_teams[i]};
			}

			var request = angular.copy($scope.request);

			var reorg_contents = [];
			for (var i=0; i < request.contents.length; i++)
			{
				var object_existance = miscServices.isObjectInArray(reorg_contents, request.contents[i], "category");
				var content_datas = {
					level:request.contents[i].level,
					topic:request.contents[i].topic,
					subjects:request.contents[i].subjects,
					format:request.contents[i].format,
					other:request.contents[i].other
				}
				if(object_existance.result)
				{
					reorg_contents[object_existance.index].datas.push(content_datas)
				}
				else
				{
					reorg_contents.push({
						category:request.contents[i].category,
						datas:[content_datas]
					})
				}
			}
			request.contents = reorg_contents;
					
			factoryRequests.saveRequest(request)
				.then(function(promise){	
					if(promise.data.success)
					{
						$scope.request._id = promise.data.request._id;
						var notifications = notifsServices.prepareNotifsRequest($rootScope.ME, $scope.request);
	
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
		 					window.location.href = "/Requests";
						}
						else
						{
							window.location.href = "/Requests";
						}
					}
					else{console.log(promise.data.message);}
				});	
		};
	}
);

