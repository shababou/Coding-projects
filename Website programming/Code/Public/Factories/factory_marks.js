angular.module("app").factory
(
	"factoryMarks",
	function($http, $q, miscServices)
	{	
		var factoryMarks = {};
		var all_marks = {data:{marks:[], success:true, message:"Deformat marks OK"}};
		
		factoryMarks.getAllMarks = function(matrix_reinit)
		{
			var deferred = $q.defer();

			if(all_marks.data.marks.length == 0 || (matrix_reinit && matrix_reinit['marks']))
			{	
				console.log("marks");
				$http.get('/api/getAllMarks')
					.then(function(res){
	       				all_marks.data.marks = res.data.marks;
						deferred.resolve(all_marks);
				});
			}
			else
			{
				deferred.resolve(all_marks);		
			}

			return deferred.promise;
		};


		factoryMarks.getMarksByContext = function(context)
		{
			var deferred = $q.defer();

			$q.all([
	            factoryMarks.getAllMarks(false)
       		]).then(function(res){
					var data = {};
		       		data.success = res[0].data.success;
		       		data.message = res[0].data.message;
					data.marks = miscServices.filterArrayByCriterias(res[0].data.marks, context._id, null, "id_context", null, 1);
					deferred.resolve(data);
				});

	       	return deferred.promise;
		};

		factoryMarks.updateMarks = function(marks)
		{
			var deferred = $q.defer();

			$http.post('/api/updateMarks', marks)
				.then(function(res){
					deferred.resolve(res);
				});
			return deferred.promise;	
		};


		return factoryMarks;	
	}
);





