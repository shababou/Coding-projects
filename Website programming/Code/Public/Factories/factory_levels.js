angular.module("app").factory
(
	"factoryLevels",
	function($http, $timeout, $q, factoryTopics, miscServices)
	{	
		var factoryLevels = {};
		var all_levels = {data:{levels:[],success:true,message:"Deformat levels OK"}};
		
		factoryLevels.getAllLevels = function()
		{
			var deferred = $q.defer();

			if(all_levels.data.levels.length == 0)
			{	
				console.log("levels");
				$http.get('/api/getAllLevels')
					.then(function(res){
	       				all_levels.data.levels = res.data.levels;
						deferred.resolve(res);
					});
			}
			else
			{
				deferred.resolve(all_levels);		
			}
			
			return deferred.promise;
		};


		factoryLevels.allLevelsSync = function()
		{
			return angular.copy(all_levels.data.levels);
		}

		factoryLevels.getLevelById = function(id_level)
		{
			return miscServices.objectByCriteriaFromArray(factoryLevels.allLevelsSync(), id_level, "_id");
		}
		

		factoryLevels.getLevelByTopic = function(id_topic)
		{
			var id_level = factoryTopics.getTopicById(id_topic).id_level;
			return factoryLevels.getLevelById(id_level);
		};


		factoryLevels.getAllUniquesLevelsNamesByCategory = function(category_levels)
		{
			var uniques_levels = [];
			var levels_names = [];
			for (var i=0; i < category_levels.length; i++)
			{
				if(!miscServices.isObjectInArray(uniques_levels, category_levels[i], "name").result)
				{
					uniques_levels.push(category_levels[i]);
					levels_names.push(category_levels[i].name);
				}
			};
			return levels_names;
		};


		function formatLevel(level)
		{
			level = miscServices.formatData(level, "category");
		    return level;
		};

		factoryLevels.addLevels = function(new_levels)
		{
			var deferred = $q.defer();
			for (var i=0; i < new_levels.length; i++)
			{
				new_levels[i] = formatLevel(new_levels[i]);
			}
			$http.post('/api/addLevels', new_levels)
				.then(function(res){
					deferred.resolve(res);
				});
			return deferred.promise;
		};

		factoryLevels.updateLevel = function(level)
		{
			return $http.post('/api/updateLevel', level)
				.success(function(res){
					return res;
				})
		};

		factoryLevels.deleteLevel = function(level)
		{
			return $http.post('/api/deleteLevel', level)
				.success(function(res){
					return res;
				})
		};

		return factoryLevels;		
	}
);