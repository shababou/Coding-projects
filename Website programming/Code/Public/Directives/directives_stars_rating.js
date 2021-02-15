//ELEMENT HTML DE LA NOTATION D'UN PROF
angular.module("app").directive
(
	"starsRating",
	function($timeout)
	{
		return{
			restrict:'EA',
			template:
				'<div ng-if="link_ready" ng-init="abstention=false">' +
					'<span class="star" ng-class="star" ng-if="state==\'New\' || (state!=\'New\' && !$parent.abstention)" ng-repeat="star in stars" ng-click="toggleStar($index); $parent.$parent.abstention=false">★</span>' +
					'<span ng-if="state==\'New\' || (state!=\'New\' && abstention)">' +
						'<input type="checkbox" ng-disabled="state!=\'New\'" ng-model="$parent.abstention" ng-init="$parent.abstention=mark==\'NA\'" ng-click="toggleAbstention($parent.abstention)"/>Non évalué' +
					'</span>' +
				'</div>',
			scope:
			{
				mark:'=',
				state:'='
			},
			link: function (scope, element)
			{	
				//Les étoiles qui doivent être remplies ont la propriété "filled"
				if(scope.state == "New")
				{
					scope.mark = 2.5;
				} 	


				//Au clic sur une étoile, les étoiles qui devront être remplies sont celles précédent le clic + celle du clic
				scope.toggleStar = function(index)
				{
					if(scope.state == "New")
					{
						scope.mark = index + 1;
					}
				};

				scope.toggleAbstention = function(abstention)
				{
					if(abstention)
					{
						scope.mark = "NA";
					}
				};


				//Dès lors que l'on clique sur une étoile différente, on change la propriété des étoiles pour celles qui doivent être remplies
				scope.$watch
				(
					'mark',
					function (oldVal, newVal)
					{
						updateStars();
					},
					true
				);


				var updateStars = function ()
				{
					scope.stars = [];
					for (var i = 0; i < 5; i++)
					{
						scope.stars.push
						(
							{
								filled: i < scope.mark
							}
						);
					}
				};
				
				
				if(scope.state == "New")
				{
					element.css({"cursor":"pointer"});
				}
				else
				{
					element.css({"cursor":"default"});
				}

				scope.link_ready = true;
			}
		}
	}
);
