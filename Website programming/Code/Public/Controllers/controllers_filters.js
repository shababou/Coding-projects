angular.module("app").filter
(
	"trustAsHtml",
	function($sce)
	{
		return function(text) {
   			return $sce.trustAsHtml(text);
  		};

	 }
);
