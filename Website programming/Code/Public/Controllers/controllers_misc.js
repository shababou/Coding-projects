angular.module("app").controller
(
	"ctrlAddAndRemoveFields",
	function($scope)
	{
		$scope.fields = [];
		
		$scope.initNbFields = function(nb_fields)
		{
			for(var i = 0; i < nb_fields; i++)
			{
				$scope.fields.push({}); 
			}
		};
		
		$scope.addField = function()
		{
			$scope.fields.push({});
		};
		$scope.removeField = function()
		{
			$scope.fields.pop({});
		};
	}
);