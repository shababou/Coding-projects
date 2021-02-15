angular.module("app").controller
(
	"ctrlChatMarks",
	function($rootScope, $scope, factoryMarks, factoryUsers, miscServices)
	{
		$scope.setChatMarks = function(messages)
		{	
			var messages  = angular.copy(messages);

			var users_in_chat = miscServices.filterArrayByDataname(messages, "message", "user");
			users_in_chat = miscServices.removeDuplicatesInArray(users_in_chat);

			var id_criteria = miscServices.filterArrayByCriterias($scope.request.contents[0].category.criterias, "Chat", null, "type_offer", null, 1)[0]._id;

			factoryMarks.getMarksByContext($scope.offer)
				.then(function(promise){
					if(promise.success)
					{
						var marks_chat = promise.marks;

						var marks_users = [];
						var my_marks_users = [];

						for (var i = 0; i < users_in_chat.length; i++)
						{
							var user_marked = false;

							var marks_user_i = miscServices.filterArrayByCriterias(marks_chat, users_in_chat[i]._id, null, "id_assessed", null, 1);
							var marks_user_i_reorg = {
								one:{users:[]},
								two:{users:[]},
								three:{users:[]}
							};
							for (var j = 0; j < marks_user_i.length; j++)
							{
								if(marks_user_i[j].id_assessor == $rootScope.ME._id)
								{
									my_marks_users.push(marks_user_i[j]);
									user_marked = true;
								}
								var marks_user_i_assessor_j = miscServices.deformatData(angular.copy(marks_user_i[j]), factoryUsers.allUsersSync(), "assessor");
								if(marks_user_i[j].marks[0].mark == 1){marks_user_i_reorg.one.users.push(marks_user_i_assessor_j.assessor);}
								else if(marks_user_i[j].marks[0].mark == 2){marks_user_i_reorg.two.users.push(marks_user_i_assessor_j.assessor);}
								else{marks_user_i_reorg.three.users.push(marks_user_i_assessor_j.assessor);}
							}
							marks_user_i_reorg.one.count = marks_user_i_reorg.one.users.length;
							marks_user_i_reorg.two.count = marks_user_i_reorg.two.users.length;
							marks_user_i_reorg.three.count = marks_user_i_reorg.three.users.length;
							marks_users.push({
								user:users_in_chat[i],
								marks:marks_user_i_reorg
							})
							if(!user_marked)
							{
								my_marks_users.push({
									id_assessor:$rootScope.ME._id,
									id_assessed:users_in_chat[i]._id,
									id_context:$scope.offer._id,
									type_context:"Chat",
									marks:[
										{
											id_criteria:id_criteria,
											mark:"NA"
										}
									]
								})
							}
						};

						$scope.marks_users = marks_users;
						$scope.my_marks_users = my_marks_users;

						$scope.marks_OK = true;
					}
					else{console.log(promise.message);}					
				});
		}

	}
)

angular.module("app").controller
(
	"ctrlChatMarksUser",
	function($rootScope, $scope, factoryMarks, factoryUsers, miscServices)
	{
		$scope.setMarksUser = function(user)
		{
			$scope.marks_user = {
				all_marks:miscServices.filterArrayByCriterias(angular.copy($scope.marks_users), user._id, null, "user", "_id", 1)[0],
				my_mark:miscServices.filterArrayByCriterias(angular.copy($scope.my_marks_users), user._id, null, "id_assessed", null, 1)[0]
			}
	
			$scope.marks_user_OK = true;
		}

		$scope.updateMark = function(mark)
		{	
			factoryMarks.updateMarks([mark])
			 	.then(function(promise){	
			 		
			 		if(promise.data.success)
			 		{
			 			//$scope.request._id = promise.data.request._id;
						
			 		}
			 		else{console.log(promise.data.message);}
			 	});	
		}

	}
)

angular.module("app").controller
(
	"ctrlChatMarksPopup",
	function($rootScope, $scope, $timeout)
	{		
		$scope.show_chat_marks = false;

		$scope.$on
		(
			'hideChatMarksPopup',
			function(event, nb_popups_open)
			{
				$scope.$apply(function () {
            		$scope.show_chat_marks = false;
        		});
				$rootScope.$emit('closingPopup'); //On informe le controller parent de la page appellante qu'il y a eu un changement d'état au niveau des popups
			}
		);
	
		//Ouverture de la directive -> update des inputs		
		$scope.openChatMarksPopup = function()
		{			
			$scope.show_chat_marks = true;
		};
		
		$rootScope.$emit('openingPopup'); //La directive signale au controller qui l'encadre (celui-ci) qu'elle a été ouverte		
	}
);




