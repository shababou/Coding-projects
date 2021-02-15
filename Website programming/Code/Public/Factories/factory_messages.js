angular.module("app").factory
(
	"factoryMessages",
	function($http, $q, factoryUsers, miscServices)
	{	
		var factoryMessages = {};
		var all_messages = {data:{messages:[], success:true, message:"Deformat messages OK"}};
		
		factoryMessages.getAllMessages = function(matrix_reinit)
		{
			var deferred = $q.defer();

			if(all_messages.data.messages.length == 0 || (matrix_reinit && matrix_reinit['messages']))
			{	
				console.log("messages");
				all_messages.data.messages = [];

				$q.all([
					$http.get('/api/getAllMessages'),
		            factoryUsers.getAllUsers()
	       		]).then(function(res){	
	       				for (var i=0; i < res[0].data.messages.length; i++)
						{
							var message_i = {
								message:res[0].data.messages[i],
								error_message:res[0].data.error_messages,
								success:res[0].data.success
							};
							if(!miscServices.isObjectInArray(all_messages.data.messages, message_i.message, "_id").result)
							{
								var deformatted_message_i = deformatMessage(message_i, res[1].data);
								if(deformatted_message_i.success)
								{
									all_messages.data.messages.push(deformatted_message_i.message);
								}
								else
								{
									all_messages.data.success = false;
									all_messages.data.error_messages = "Error when loading and deformatting all messages"
									deferred.resolve(all_messages);
								}
							}
						}
						deferred.resolve(all_messages);
					});
			}
			else
			{
				deferred.resolve(all_messages);		
			}
			
			return deferred.promise;
		};

		function deformatMessage(data_0, data_1)
		{
			var message = data_0.message;
		    var users =data_1.users;

		    message = miscServices.deformatData(message, users, "user");

		    var error_messages = [data_0.error_message, data_1.message];
		    var results = {};
		    results.error_messages = error_messages;
		    results.message = message;
		    if(data_0.success && data_1.success){results.success = true;}
		    else{results.success = false;}

		    return results;
		}


		factoryMessages.saveMessage = function(message)
		{
			var deferred = $q.defer();

			$http.post('/api/saveMessage', message)
				.then(function(res){
					deferred.resolve(res);
				});
			return deferred.promise;	
		};


		return factoryMessages;	
	}
);





