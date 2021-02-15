angular.module("app").factory
(
	"factorySubjects",
	function($http, $q, miscServices)
	{	
		var factorySubjects = {};
		
		factorySubjects.getAllSubjects = function()
		{
			var deferred = $q.defer();
			$http.get('/api/getAllSubjects')
				.then(function(res){
					deferred.resolve(res);
				})
			return deferred.promise;	
		};

		function formatSubject(subject)
		{
			subject = miscServices.formatData(subject, "topic");
		    return subject;
		};

		factorySubjects.addSubjects = function(new_subjects)
		{
			var deferred = $q.defer();
			for (var i=0; i < new_subjects.length; i++)
			{
				new_subjects[i] = formatSubject(new_subjects[i]);
			}
			$http.post('/api/addSubjects', new_subjects)
				.then(function(res){
					deferred.resolve(res);
				});
			return deferred.promise;	
		};

		factorySubjects.updateSubject = function(subject)
		{
			return $http.post('/api/updateSubject', subject)
				.success(function(res){
					return res;
				})
		};

		factorySubjects.deleteSubject = function(subject)
		{
			return $http.post('/api/deleteSubject', subject)
				.success(function(res){
					return res;
				})
		};

		return factorySubjects;	
	}
);





