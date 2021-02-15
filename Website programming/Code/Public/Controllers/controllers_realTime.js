angular.module("app").controller
(
	"ctrlRealTime",
	function($rootScope, $scope, $timeout, $routeParams, miscServices)
	{
		var client;
		var RT_init = {};

		$scope.setRealTimeParamAndInitApp = function(group, additionnal_type)
		{
			if(group == "Notification")
			{
				RT_init.group = group;
				RT_init.key = group;
				RT_init.datas = {id_user:$rootScope.ME._id};
			}
			else
			{
				//RT_init.content = {};
				//RT_init.content.message_content = {id_dialogue:$routeParams.id_offer, username:$rootScope.ME.username, type_dialogue:additionnal_type};
				RT_init.group = group;
				RT_init.key = $routeParams.id_offer + " " + additionnal_type;
				RT_init.datas = {id_user:$rootScope.ME._id, username:$rootScope.ME.username};
			}

			$scope.setRealTimeApp(RT_init);
		}


		$scope.setRealTimeApp = function(RT_init)
		{
			var datas = miscServices.objectToString(RT_init.datas);
			
			client = io.connect('', {query:{group:RT_init.group, key:RT_init.key, datas:datas}});	
			client.on('initRealTimeApp', function(RT_content){
				console.log("diffusing init RT");
				//$rootScope.$emit('initDialoguesNotifRT', RT_content);	
			});

			client.on('notifyReceiversRT', function(RT_content){
				console.log("diffusing notif RT");
				$rootScope.$emit('diffuseNotifRT', RT_content);		
			});


			$rootScope.$on('emitActionRT', function(event, RT_content){
				//$scope.sendMessage(RT_content); 
			});

			$scope.$on('$routeChangeStart', function( event ) {
				client.emit('disconnectRT', RT_init);
			});

			window.onbeforeunload = function(e){
				client.emit('disconnectRT', RT_init);
			}
		}


		

		// $scope.sendMessage = function(RT_content)
		// {
		// 	var RT_emitted = {};

		// 	RT_emitted.init_datas = RT_init;
		// 	RT_emitted.group = RT_content.group;
		// 	RT_emitted.content = RT_content.content;
		// 	client.emit('actionEmitterRT', RT_emitted);
		// };
	}

);

