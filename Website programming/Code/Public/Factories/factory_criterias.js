angular.module("app").factory
(
	"factoryCriterias",
	function($http, $timeout, $q, miscServices)
	{	
		var factoryCriterias = {};
		var all_criterias = {data:{criterias:[], success:true, message:"Deformat criterias OK"}};
		
		factoryCriterias.getAllCriterias = function()
		{
			var deferred = $q.defer();

			if(all_criterias.data.criterias.length == 0)
			{
				console.log("criterias");
				$http.get('/api/getAllCriterias')
					.then(function(res){
						all_criterias.data.criterias = res.data.criterias;
						deferred.resolve(res);
				});
			}
			else
			{
				deferred.resolve(all_criterias);
			}

			return deferred.promise;
		};

		factoryCriterias.allCriteriasSync = function()
		{
			return angular.copy(all_criterias.data.criterias);
		}

		factoryCriterias.getCriteriaById = function(id_criteria)
		{
			return miscServices.objectByCriteriaFromArray(factoryCriterias.allCriteriasSync(), id_criteria, "_id");
		};


		function formatCriteria(criteria)
		{
			console.log(criteria);
			criteria = miscServices.formatData(criteria, "category");
		    return criteria;
		};

		factoryCriterias.addCriterias = function(new_criterias)
		{
			var deferred = $q.defer();
			for (var i=0; i < new_criterias.length; i++)
			{
				new_criterias[i] = formatCriteria(new_criterias[i]);
			}
			$http.post('/api/addCriterias', new_criterias)
				.then(function(res){
					deferred.resolve(res);
				});
			return deferred.promise;	
		};

		factoryCriterias.updateCriteria = function(criteria)
		{
			return $http.post('/api/updateCriteria', criteria)
				.success(function(res){
					return res;
				})
		};

		factoryCriterias.deleteCriteria = function(criteria)
		{
			return $http.post('/api/deleteCriteria', criteria)
				.success(function(res){
					return res;
				})
		};

		return factoryCriterias;	
	}
);





