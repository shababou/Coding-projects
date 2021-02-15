angular.module("app").controller
(
	"ctrlOffers",
	function($rootScope, $scope, $timeout, $routeParams, $location, factoryRequests, miscServices, googleServices)
	{
		$scope.controller_on = true;

		$scope.setOffers = function(matrix_reinit)
		{
			//$scope.range_max = 100;
			//$scope.filter = {};
			//$scope.filter.range_target = 5;
			$scope.offers_OK = false;
			$scope.map_OK = false;
			$scope.offers_to_display = [];
			$scope.offers_to_display_for_map = [];

			$scope.request = factoryRequests.getRequest($routeParams._id, matrix_reinit)
				.then(function(promise){
					if(promise.success)
					{
						$scope.request = promise.request;

						googleServices.completePOIArrayWithDest($rootScope.ME, $scope.request.offers, "Offer")
	       					.then(function(promise){
	       						$scope.request.offers = promise;
								$scope.offer = miscServices.objectByCriteriaFromArray($scope.request.offers, $rootScope.ME._id, "teacher", "_id", 1);
								if(!$scope.offer && ($scope.request.student._id != $rootScope.ME._id) && ($rootScope.ME.age>=18))
								{
									$scope.new_offer = true;
									$scope.offer = {};
									$scope.offer.id_request = $scope.request._id;
									$scope.offer.teacher = $rootScope.ME;
									$scope.offer.Chat_datas = {};
									$scope.offer.Chat_datas.open = false;
									$scope.offer.RDV_datas = {};
									$scope.offer.RDV_datas.open = true;
									$scope.offer.RDV_datas.selected_address = 1;
									$scope.offer.RDV_datas.price = 8;
									$scope.offer.RDV_datas.time_slots = [{}];
									if($scope.request.linked_teams.length == 0){$scope.offer.RDV_datas.nb_participants = $scope.request.nb_participants;}
									$scope.offer.RDV_datas.participants = [];

									$scope.my_offer_OK = true;
								}
								if($scope.offer ){$scope.my_offer_OK = true;}

								$scope.kind = "Classic";

								$scope.setOffersByDistance();

								$scope.offers_OK = true;
								$scope.map_OK = true;
						});
					}
					else{console.log(promise.message);}
				});
		}


		$scope.setOffersByDistance = function()
		{
			$scope.offers_to_display = [];
			$scope.offers_to_display_for_map = [];
			for(var i =0; i < $scope.request.offers.length; i++)
			{
				//if($scope.request.offers[i].distance <= $scope.filter.range_target)
				//{
					$scope.offers_to_display.push($scope.request.offers[i]);
					//if($scope.request.offers[i].type != "Chat"){$scope.offers_to_display_for_map.push($scope.request.offers[i]);}
				//}
			}
		};

		$rootScope.$on
		(
			'diffuseNotifRT',
			function(event, RT_content)
			{
				if($scope.controller_on)
				{
					console.log("pulse offers");
					$timeout(function(){
					 	$scope.setOffers(RT_content.matrix_reinit);
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
	"ctrlActionOnOffer",
	function($rootScope, $scope, $location, miscServices)
	{
		if($scope.offer.teacher._id == $rootScope.ME._id){$scope.teaching = true};

		if($scope.offer.RDV_datas.open)
		{
			$scope.RDV_participating = miscServices.isObjectInArray($scope.offer.RDV_datas.participants, {user:$rootScope.ME}, "user", null).result;
			if(($scope.offer.RDV_datas.participants.length < $scope.offer.RDV_datas.nb_participants) || $scope.RDV_participating || $scope.teaching){$scope.RDV_available = true;}
		}

		$scope.clickOnChatOffer = function(id_offer)
		{
			$location.path($location.path() + '/Chat/'+ id_offer);
		};
		$scope.clickOnRDVOffer = function(id_offer)
		{
			if($scope.RDV_available){$location.path($location.path() + '/RDV/'+ id_offer);}
		}			
	}
);


angular.module("app").controller
(
	"setupOffer",
	function($rootScope, $scope, $timeout, factoryOffers, miscServices, factoryNotifications, notifsServices)
	{	
		$scope.updateOffer = function(reason, subreason)
		{
			var offer = angular.copy($scope.offer);

			if($scope.new_offer){reason = "Creation";}

			if(offer.RDV_datas.open)
			{
				if(offer.RDV_datas.selected_address == 0){offer.RDV_datas.address = offer.teacher.address;}
				else if(offer.RDV_datas.selected_address > 0){offer.RDV_datas.address = $scope.request.address;}
				else if((offer.RDV_datas.participants.length > 0) && (offer.RDV_datas.selected_address > 0)){offer.RDV_datas.address = offer.RDV_datas.participants[offer.RDV_datas.selected_address - 1].user.address;}
			}

			factoryOffers.saveOffer(offer)
				.then(function(promise){	
					if(promise.data.success)
					{
						if($scope.new_offer){$scope.offer._id = promise.data.offer._id;}
						var notifications = notifsServices.prepareNotifsOffer($rootScope.ME, $scope.offer, $scope.request, reason, subreason);
						console.log(notifications);
						concludeWithNotifs(notifications);
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
		
	}
);




angular.module("app").controller
(
	"ctrlDialoguesOffer",
	function($rootScope, $scope, $timeout, $routeParams, $q, factoryUsers, factoryRequests, factoryReports, miscServices)
	{
		$scope.controller_on = true;

		$scope.setDialoguesOffer = function(type_dialogue, matrix_reinit)
		{
			$scope.type_dialogue = type_dialogue;
			$scope.offer_OK = false;
					
			if($rootScope.is_logged)
			{
				$q.all([
				    factoryRequests.getRequest($routeParams.id_request, matrix_reinit),
				    factoryReports.getReportByOffer($routeParams.id_offer, matrix_reinit)
			    ]).then(function(promise){
			       	if(promise[0].success && promise[1].success)
					{
						$scope.request = promise[0].request;
						$scope.report = promise[1].report;
						$scope.offer = miscServices.objectByCriteriaFromArray($scope.request.offers, $routeParams.id_offer, "_id");
						if($rootScope.ME == $scope.offer.teacher){$scope.teaching = true;}
						else
						{
							if(type_dialogue == "RDV"){$scope.participating = miscServices.isObjectInArray($scope.offer.RDV_datas.participants, {user:$rootScope.ME}, "user", null).result;}
						}

						// $scope.RT_emitted = {};
						// $scope.RT_emitted.group = "Dialogue";
						// $scope.RT_emitted.content = {id_dialogue:$scope.offer._id, username:$rootScope.ME.username, type_dialogue:$scope.type_dialogue};
						$scope.offer_OK = true
					}
					else{console.log(promise[0].message + " " + promise[1].message);}
				});
			}
		};


		// $rootScope.$on
		// (
		// 	'initDialoguesNotifRT',
		// 	function(event, RT_content)
		// 	{
		// 		$scope.$apply(function () {
		// 			$scope.setDialoguesOffer(RT_content.type_dialogue);
		// 			setMessagesContentsAndParticipants(RT_content);
		// 			$scope.messages_offer_OK = true;
		// 		});
		// 	}
		// );

		$rootScope.$on
		(
			'diffuseNotifRT',
			function(event, RT_content)
			{
				if($scope.controller_on)
				{
					// $timeout(function(){
					// 	if(RT_content.matrix_reinit){$scope.setDialoguesOffer($scope.type_dialogue, RT_content.matrix_reinit);}
					// 	else
					// 	{
					// 		$scope.$apply(function () {
					// 			setMessagesContentsAndParticipants(RT_content);
					// 			$scope.RT_emitted.content.message = "";				    
					// 		});  
					// 	}
					// }, 1000);
				}
			}
		);	


		// function setMessagesContentsAndParticipants(RT_content)
		// {
		// 	$scope.participants = RT_content.participants;
		// 	$scope.messages_contents = RT_content.messages_contents;
		// }

		$scope.$on('$routeChangeStart', function(event){
			$scope.controller_on = false;
		});	
	}
);


angular.module("app").controller
(
	"ctrlInvitations",
	function($rootScope, $scope, factoryNotifications, notifsServices, miscServices)
	{	
		$scope.users_to_invite = [];

		$scope.setPotentialGuests = function(type_offer)
		{
			$scope.type_offer = type_offer;
			$scope.potential_guests = [];

			var participants = [];
			if(type_offer == "RDV"){participants = miscServices.filterArrayByDataname(angular.copy($scope.offer.RDV_datas.participants), "user");}

			var potential_guests = [];
			if($scope.request.linked_teams.length > 0)
			{
				for(var i = 0; i < $scope.request.linked_teams.length; i++)
				{
					var participating_to_team_i = miscServices.isObjectInArray($scope.request.linked_teams[i].team.linked_users, {user:$rootScope.ME}, "user", null);
					if(participating_to_team_i.result)
					{
						var potential_guests_team_i = miscServices.filterArrayByDataname(miscServices.filterArrayByCriterias(angular.copy($scope.request.linked_teams[i].team.linked_users), "Accepting", "Accepted", "membership_status"), "user");							
						potential_guests_team_i = miscServices.removeObjectsInArray(potential_guests_team_i, [$scope.offer.teacher], "_id");
						potential_guests_team_i = miscServices.removeObjectsInArray(potential_guests_team_i, participants, "_id");
						potential_guests_team_i = miscServices.removeObjectsInArray(potential_guests_team_i, [$rootScope.ME], "_id");

						potential_guests.push({
							group:$scope.request.linked_teams[i].team,
							users:potential_guests_team_i
						});
					}
				}
				$scope.potential_guests = potential_guests;
			}
			else
			{
				var current_linked_users = miscServices.filterArrayByDataname(miscServices.filterArrayByCriterias(angular.copy($rootScope.ME.linked_users), "Accepting", "Accepted", "network_status"), "user");
				$scope.potential_guests.push({
					group:"",
					users:current_linked_users
				});
			}
			
		};

		$scope.sendInvitations = function()
		{	
			$scope.users_to_invite = miscServices.merge2NestedArraysInArrays($scope.users_to_invite, "_id");

			var notifications = notifsServices.prepareNotifsOffer($rootScope.ME, $scope.offer, $scope.request, "Invitation", $scope.type_offer, $scope.users_to_invite);
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
		};
	}
);
