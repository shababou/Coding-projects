angular.module("app").factory
(
	"factoryCategories",
	function($http, $timeout, $q, factoryCriterias, factoryLevels, factoryFormats, factoryTopics, factorySubjects, miscServices)
	{	
		var factoryCategories = {};
		var all_categories = {data:{categories:[], success:true, message:"Deformat categories OK"}};
		
		factoryCategories.getAllCategories = function()
		{
			var deferred = $q.defer();

			if(all_categories.data.categories.length == 0)
			{	
				console.log("categories");

				$q.all([
					$http.get('/api/getAllCategories'),
					factoryCriterias.getAllCriterias(),
					factoryLevels.getAllLevels(),
					factoryFormats.getAllFormats(),
				    factoryTopics.getAllTopics(),
				    factorySubjects.getAllSubjects()
			    ]).then(function(res){
				    	var results = deformatCategories(res[0].data, res[1].data, res[2].data, res[3].data, res[4].data, res[5].data);
				    	if(results.success)
				    	{
							all_categories.data.categories = results.categories;
				    	}
						else
						{
							all_categories.data.success = false;
							all_categories.data.message = "Error when loading and deformatting all categories"
							deferred.resolve(all_categories);
						}

						deferred.resolve(all_categories);
					});
			}
			else
			{
				deferred.resolve(all_categories);
			}
			
			return deferred.promise;
		};

       	function deformatCategories(data_0, data_1, data_2, data_3, data_4, data_5)
		{
			var categories = data_0.categories;
			var criterias = data_1.criterias;
			var levels = data_2.levels;
			var formats = data_3.formats;
			var topics = data_4.topics;
			var subjects = data_5.subjects;
			topics = miscServices.addDeformattedDatasToAWithBForArray(topics, subjects, "topic", "subjects");
			levels = miscServices.addDeformattedDatasToAWithBForArray(levels, topics, "level", "topics");
			levels = miscServices.addDeformattedDatasToAWithBForArray(levels, formats, "level", "formats");
			categories = miscServices.addDeformattedDatasToAWithBForArray(categories, levels, "category", "levels");
			categories = miscServices.addDeformattedDatasToAWithBForArray(categories, criterias, "category", "criterias");
			var messages = [data_0.message, data_1.message, data_2.message, data_3.message, data_4.message, data_5.message];
			var results = {};
			results.messages = messages;
			results.categories = categories;
			if(data_0.success && data_1.success && data_2.success && data_3.success && data_4.success && data_5.success){results.success = true;}
			else{results.success = false;}
		    return results;
		}
		

		factoryCategories.allCategoriesSync = function()
		{
			return angular.copy(all_categories.data.categories);
		}

		factoryCategories.getCategoryById = function(id_category)
		{
			return miscServices.objectByCriteriaFromArray(factoryCategories.allCategoriesSync(), id_category, "_id");
		};


		factoryCategories.getCategoryByLevel = function(id_level)
		{
			var id_category = factoryLevels.getLevelById(id_level).id_category;
			return factoryCategories.getCategoryById(id_category);
		};

		factoryCategories.getCategoryByTopic = function(id_topic)
		{
			var id_level = factoryLevels.getLevelByTopic(id_topic)._id;
			var id_category = factoryLevels.getLevelById(id_level).id_category;
			return factoryCategories.getCategoryByLevel(id_level);
		};

		factoryCategories.getCategoryByCriteria = function(id_criteria)
		{
			var id_category = factoryCriterias.getCriteriaById(id_criteria).id_category;
			return factoryCategories.getCategoryById(id_category);
		};


		factoryCategories.addCategories = function(new_categories)
		{
			return $http.post('/api/addCategories', new_categories)
				.success(function(res){
					return res;
				})
		};

		factoryCategories.updateCategory = function(category)
		{
			return $http.post('/api/updateCategory', category)
				.success(function(res){
					return res;
				})
		};

		factoryCategories.deleteCategory = function(category)
		{
			return $http.post('/api/deleteCategory', category)
				.success(function(res){
					return res;
				})
		};

		return factoryCategories;		
	}
);