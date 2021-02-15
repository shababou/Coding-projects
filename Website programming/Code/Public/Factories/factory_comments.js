angular.module("app").factory
(
	"factoryComments",
	function($http, $q, miscServices)
	{	
		var factoryComments = {};
		var all_comments = {data:{comments:[], success:true, message:"Deformat comments OK"}};
		
		factoryComments.getAllComments = function(matrix_reinit)
		{
			var deferred = $q.defer();

			if(all_comments.data.comments.length == 0 || (matrix_reinit && matrix_reinit['comments']))
			{	
				console.log("comments");
				$http.get('/api/getAllComments')
					.then(function(res){
	       				all_comments.data.comments = res.data.comments;
						deferred.resolve(all_comments);
				});
			}
			else
			{
				deferred.resolve(all_comments);		
			}
			
			return deferred.promise;
		};



		factoryComments.addComments = function(new_comments)
		{
			var deferred = $q.defer();

			$http.post('/api/addComments', new_comments)
				.then(function(res){
					deferred.resolve(res);
				});
			return deferred.promise;	
		};


		return factoryComments;	
	}
);





