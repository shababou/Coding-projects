angular.module("app").factory
(
	"factorySchedules",
	function($http, $q, miscServices)
	{	
		var factorySchedules = {};
		var all_schedules = {data:{schedules:[], success:true, message:"Deformat schedules OK"}};
		
		factorySchedules.getAllSchedules = function(matrix_reinit)
		{
			var deferred = $q.defer();

			if(all_schedules.data.schedules.length == 0 || (matrix_reinit && matrix_reinit['schedules']))
			{	
				console.log("schedules");
				$http.get('/api/getAllSchedules')
					.then(function(res){
	       				all_schedules.data.schedules = res.data.schedules;
						deferred.resolve(all_schedules);
				});
			}
			else
			{
				deferred.resolve(all_schedules);		
			}
			
			return deferred.promise;
		};


		factorySchedules.addSchedules = function(new_schedules)
		{
			var deferred = $q.defer();

			$http.post('/api/addSchedules', new_schedules)
				.then(function(res){
					deferred.resolve(res);
				});
			return deferred.promise;	
		};


		return factorySchedules;	
	}
);





