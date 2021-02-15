angular.module("app").directive
(
	"fileModel",
	function($parse)
	{
		return{
			restrict:'A',
			link:
				function(scope, element, attrs)
				{
					var onChangeFile = scope.$eval(attrs.fileModel);
      				element.bind('change', onChangeFile);
           		}
		}
	}
);
