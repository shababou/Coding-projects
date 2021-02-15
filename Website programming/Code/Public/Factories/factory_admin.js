angular.module("app").factory
(
	"factoryAdmin",
	function($http, $timeout, $q, factoryUsers, miscServices)
	{	
		var factoryAdmin = {};
		var all_advices = {data:{advices:[], success:true, message:"OK when loading and deformatting all advices"}};
		
		factoryAdmin.getAllAdvices = function()
		{
			var deferred = $q.defer();
			if(all_advices.data.advices.length == 0)
			{
				console.log("advices");
				all_advices.data.advices = [];

				$q.all([
		            $http.get('/api/getAllAdvices'),
		            factoryUsers.getAllUsers()
	       		]).then(function(res){	
	       				for (var i=0; i < res[0].data.advices.length; i++)
						{
							var advice_i = {
								advice:res[0].data.advices[i],
								message:res[0].data.message,
								success:res[0].data.success
							};
							if(!miscServices.isObjectInArray(all_advices.data.advices, advice_i.advice, "_id").result)
							{
								var deformatted_advice_i = deformatAdvice(advice_i, res[1].data);
								if(deformatted_advice_i.success)
									all_advices.data.advices.push(deformatted_advice_i.advice);
								else
								{
									all_advices.data.success = false;
									all_advices.data.message = "Error when loading and deformatting all advices"
									deferred.resolve(all_advices);
								}
							}
						}
						deferred.resolve(all_advices);
					});
			}
			else
			{	
				deferred.resolve(all_advices);
			}

			return deferred.promise;
		};

		function deformatAdvice(data_0, data_1)
		{
			var advice = data_0.advice;
		    var users =data_1.users;
		    advice = miscServices.deformatData(advice, users, "user");
		    advice.emission_date = new Date(advice.emission_date);
		    var messages = [data_0.message, data_1.message];
		    var results = {};
		    results.messages = messages;
		    results.advice = advice;
		    if(data_0.success && data_1.success){results.success = true;}
		    else{results.success = false;}

		    return results;
		}



		factoryAdmin.addAdvices = function(new_advices)
		{
			var deferred = $q.defer();
			
			$http.post('/api/addAdvices', new_advices)
				.then(function(res){
					deferred.resolve(res);
				});
			return deferred.promise;	
		};



		return factoryAdmin;	
	}
);





