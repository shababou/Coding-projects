angular.module("app").controller
(
	"ctrlDialogues",
	function($rootScope, $scope, $q, factoryDialogues, factoryMessages, notifsServices)
	{
		$scope.controller_on = true;

		$scope.setDialogue = function(dialogue, matrix_reinit)
		{	
			$scope.messages = [];

			$scope.id_dialogue = dialogue._id;
			if(($scope.type_dialogue == "RDV") || ($scope.type_dialogue == "Chat")){$scope.id_dialogue = $scope.id_dialogue + "_" + $scope.type_dialogue;}

			factoryDialogues.getDialogue($scope.id_dialogue)
				.then(function(promise){
					if(promise.success)
					{
						var dialogue = promise.dialogue[0];
						if(promise.dialogue.length == 0)
						{
							dialogue = {
								id_dialogue:$scope.id_dialogue,
								messages:[]
							}
						}

						$scope.dialogue = dialogue;
						
						$scope.dialogue_OK = true;
					}
					else{console.log(promise.messages);}
				});
		};

		$scope.sendMessage = function(message)
		{	
			var new_message = {
				id_user:$rootScope.ME._id,
				message:message,
				emission_date:new Date(),
			}

			factoryMessages.saveMessage(new_message)
				.then(function(promise){	
					if(promise.data.success)
					{
						$scope.dialogue.messages.push({message:promise.data.message});
						var dialogue = angular.copy($scope.dialogue);
						factoryDialogues.updateDialogue(dialogue)
							.then(function(promise){	
								if(promise.data.success)
								{
									//$rootScope.$emit('emitActionRT', {group:"Notification", content:notifications.RT});
								}
								else{console.log(promise.data.message);}
							});	
					}
					else{console.log(promise.data.error_message);}
				});	
		};


		$rootScope.$on
		(
			'diffuseNotifRT',
			function(event, RT_content)
			{
				if($scope.controller_on)
				{
					
				}
			}
		);

		$scope.$on('$routeChangeStart', function(event){
			$scope.controller_on = false;
		});	
	}
);

