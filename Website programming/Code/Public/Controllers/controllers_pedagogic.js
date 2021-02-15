angular.module("app").controller
(
	"ctrlPedagogicFields",
	function($scope, $timeout, factoryCategories, miscServices)
	{
		$scope.categories_OK = false;

		$scope.selection_categories = {};

		factoryCategories.getAllCategories()
			 .then(function(promise){	
				if(promise.data.success)
				{
				 	$scope.categories = promise.data.categories;

				 	$scope.categories_OK = true;
				 }
				 else{console.log(promise.data.messages);}
			 });


		$scope.setLevels = function()
		{
			try
			{
				$scope.selection_categories.selected_level = $scope.selection_categories.selected_category.levels[0];
				$scope.setFormats();
				$scope.setTopics();
			}
			catch(e){$scope.selection_categories.selected_level = {};}
		}

		$scope.setFormats = function()
		{
			try
			{
				$scope.selection_categories.selected_format = $scope.selection_categories.selected_level.formats[0];
			}
			catch(e){$scope.selection_categories.selected_format = {};}
		}


		$scope.setTopics = function()
		{
			try
			{
				$scope.selection_categories.selected_topic = $scope.selection_categories.selected_level.topics[0];
				$scope.setSubjects();
			}
			catch(e){$scope.selection_categories.selected_topic = {};}
		}

		$scope.setSubjects = function()
		{
			try{$scope.selection_categories.selected_subject = $scope.selection_categories.selected_topic.subjects[0];}
			catch(e){$scope.selection_categories.selected_subject = {};}
		}
	}
);