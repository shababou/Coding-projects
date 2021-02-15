//ELEMENT HTML DE LA NOTATION D'UN PROF
angular.module("app").directive
(
	"thumbsRating",
	function($timeout)
	{
		return{
			restrict:'EA',
			template:
				'<span ng-class="{\'thumb one_full\':hover_1, \'thumb one_empty\':!hover_1}" ng-mouseover="hover_1=true" ng-mouseleave="hover_1=false" ng-click="toggleStar(1)">1</span>' +
				'<span ng-class="{\'thumb two_full\':hover_2, \'thumb two_empty\':!hover_2}" ng-mouseenter="hover_2=true" ng-mouseleave="hover_2=false" ng-click="toggleStar(2)">2</span>' +
				'<span ng-class="{\'thumb three_full\':hover_3, \'thumb three_empty\':!hover_3}" ng-mouseenter="hover_3=true" ng-mouseleave="hover_3=false" ng-click="toggleStar(3)">3</span>',
			scope:
			{
				mark:'=',
			},
			link: function (scope, element)
			{	
		

				if(scope.mark == 1){scope.hover_1 = true;}
				if(scope.mark == 2){scope.hover_2 = true;}
				if(scope.mark == 3){scope.hover_3 = true;}
				//Au clic sur une étoile, les étoiles qui devront être remplies sont celles précédent le clic + celle du clic
				scope.toggleStar = function(value)
				{
					scope.mark = value;
				};
			}
		}
	}
);
