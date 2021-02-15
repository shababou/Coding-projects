angular.module("app").controller
(
	"ctrlAdmin",
	function($rootScope, $scope, miscServices, factoryAuthUser, factoryCategories, factoryCriterias, factoryLevels, factoryFormats, factoryTopics, factorySubjects, factoryAdmin)
	{
		if($rootScope.is_logged)
		{
			factoryAuthUser.checkAdminStatus($rootScope.userCtrl)
				.then(function(promise){			
					$scope.is_admin = promise.data.admin;
				});
		}

		$scope.options_people = miscServices.options_people;
		$scope.types_offer = miscServices.types_offer;

		$scope.new_categories = [];
		$scope.new_criterias = [];
		$scope.new_levels = [];
		$scope.new_formats = [];
		$scope.new_topics = [];
		$scope.new_subjects = [];

		$scope.advices = [{}];

		$scope.addCategories = function()
		{
			factoryCategories.addCategories($scope.new_categories)
				.then(function(promise){	
					if(promise.data.success){window.location.reload();}
					else{console.log(promise.data.message);}
				});	
		};

		$scope.addCriterias = function(selection_categories)
		{
			for (var i=0; i < $scope.new_criterias.length; i++)
			{
				$scope.new_criterias[i].category = selection_categories.selected_category;
			}
			factoryCriterias.addCriterias($scope.new_criterias)
				.then(function(promise){	
					if(promise.data.success){window.location.reload();}
					else{console.log(promise.data.message);}
				});	
		 };

		$scope.addLevels = function(selection_categories)
		{
			for (var i=0; i < $scope.new_levels.length; i++)
			{
				$scope.new_levels[i].category = selection_categories.selected_category;
			}
			factoryLevels.addLevels($scope.new_levels)
				.then(function(promise){	
					if(promise.data.success){window.location.reload();}
					else{console.log(promise.data.message);}
				});	
		};

		$scope.addFormats = function(selection_categories)
		{
			for (var i=0; i < $scope.new_formats.length; i++)
			{
				$scope.new_formats[i].level = selection_categories.selected_level;
			}
			factoryFormats.addFormats($scope.new_formats)
				.then(function(promise){	
					if(promise.data.success){window.location.reload();}
					else{console.log(promise.data.message);}
				});	
		 };

		$scope.addTopics = function(selection_categories)
		{
			for (var i=0; i < $scope.new_topics.length; i++)
			{
				$scope.new_topics[i].level = selection_categories.selected_level;
			}
			factoryTopics.addTopics($scope.new_topics)
				.then(function(promise){	
					if(promise.data.success){window.location.reload();}
					else{console.log(promise.data.message);}
				});	
		 };

		$scope.addSubjects = function(selection_categories)
		{
			for (var i=0; i < $scope.new_subjects.length; i++)
			{
				$scope.new_subjects[i].topic = selection_categories.selected_topic;
			}
			factorySubjects.addSubjects($scope.new_subjects)
				.then(function(promise){	
					if(promise.data.success){window.location.reload();}
					else{console.log(promise.data.message);}
				});	
		};
		
		$scope.updateOrDeleteDocument = function(operation, collec_name, doc)
		{
			if(collec_name == "Category")
			{
				if(operation == "Modification")
				{
					factoryCategories.updateCategory(doc)
						.then(function(promise){	
							if(promise.data.success){window.location.reload();}
							else{console.log(promise.data.message);}
						});
				}
				else
				{
					factoryCategories.deleteCategory(doc)
						.then(function(promise){	
							if(promise.data.success){window.location.reload();}
							else{console.log(promise.data.message);}
						});
				}
			}
			else if(collec_name == "Criteria")
			{
				if(operation == "Modification")
				{
					factoryCriterias.updateCriteria(doc)
						.then(function(promise){	
							if(promise.data.success){window.location.reload();}
							else{console.log(promise.data.message);}
						});
				}
				else
				{
					factoryCriterias.deleteCriteria(doc)
						.then(function(promise){	
							if(promise.data.success){window.location.reload();}
							else{console.log(promise.data.message);}
						});
				}
			}
			else if(collec_name == "Level")
			{
				if(operation == "Modification")
				{
					factoryLevels.updateLevel(doc)
						.then(function(promise){	
							if(promise.data.success){window.location.reload();}
							else{console.log(promise.data.message);}
						});
				}
				else
				{
					factoryLevels.deleteLevel(doc)
						.then(function(promise){	
							if(promise.data.success){window.location.reload();}
							else{console.log(promise.data.message);}
						});
				}
			}
			else if(collec_name == "Format")
			{
				if(operation == "Modification")
				{
					factoryFormats.updateFormat(doc)
						.then(function(promise){	
							if(promise.data.success){window.location.reload();}
							else{console.log(promise.data.message);}
						});
				}
				else
				{
					factoryFormats.deleteFormat(doc)
						.then(function(promise){	
							if(promise.data.success){window.location.reload();}
							else{console.log(promise.data.message);}
						});
				}
			}
			else if(collec_name == "Topic")
			{
				if(operation == "Modification")
				{
					factoryTopics.updateTopic(doc)
						.then(function(promise){								
							if(promise.data.success){window.location.reload();}
							else{console.log(promise.data.message);}
						});
				}
				else
				{
					factoryTopics.deleteTopic(doc)
						.then(function(promise){	
							if(promise.data.success){window.location.reload();}
							else{console.log(promise.data.message);}
						});
				}
			}
			else
			{
				if(operation == "Modification")
				{
					factorySubjects.updateSubject(doc)
						.then(function(promise){								
							if(promise.data.success){window.location.reload();}
							else{console.log(promise.data.message);}
						});
				}
				else
				{
					factorySubjects.deleteSubject(doc)
						.then(function(promise){	
							if(promise.data.success){window.location.reload();}
							else{console.log(promise.data.message);}
						});
				}
			}
		};


		$scope.addAdvices = function()
		{
			if($rootScope.is_logged)
			{
				for (var i=0; i < $scope.advices.length; i++)
				{
					$scope.advices[i].id_user = $rootScope.ME._id;
				}
			}
			factoryAdmin.addAdvices($scope.advices)
				.then(function(promise){	
					if(promise.data.success){window.location.reload();}
					else{console.log(promise.data.message);}
				});	
		};

		$scope.getAllAdvices = function()
		{
			factoryAdmin.getAllAdvices()
				.then(function(promise){		
					if(promise.data.success)
					{
					 	$scope.advices = promise.data.advices;

					 	$scope.advices_OK = true;
					 }
					 else{console.log(promise.data.messages);}
				 });	
		};

			
	}
);
