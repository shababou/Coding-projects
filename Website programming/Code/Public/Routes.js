angular.module("app", ['ngRoute']).config
(
	function($routeProvider, $locationProvider)
	{	
		$routeProvider
			.when('/', {
				templateUrl:'Views/Presentation.html',
			})
			.when('/Welcome', {
				templateUrl:'Views/Welcome.html',
			})
			.when('/Profile/:_id', {
				templateUrl:'Views/Profile.html',
				controller:function($rootScope){
					$rootScope.authNeeded();
				}			
			})
			.when('/Requests', {
				templateUrl:'Views/Requests.html',
				controller:function($rootScope){
					$rootScope.authNeeded();
				}		
			})
			.when('/RequestCreation', {
				templateUrl:'Views/RequestCreation.html',
				controller:function($rootScope){
					$rootScope.authNeeded();
				}				
			})
			.when('/TeamCreation', {
				templateUrl:'Views/Team.html',
				controller:function($rootScope){
					$rootScope.authNeeded();
				}				
			})
			.when('/Team/:_id', {
				templateUrl:'Views/Team.html',
				controller:function($rootScope){
					$rootScope.authNeeded();
				}				
			})
			.when('/Requests/:_id', {
				templateUrl:'Views/Offers.html',
				controller:function($rootScope){
					$rootScope.authNeeded();
				}				
			})
			.when('/Requests/:id_request/Chat/:id_offer', {
				templateUrl:'Views/Chat.html',
				controller:function($rootScope){
					$rootScope.authNeeded();
				}				
			})
			.when('/Requests/:id_request/RDV/:id_offer', {
				templateUrl:'Views/RDV.html',
				controller:function($rootScope){
					$rootScope.authNeeded();
				}				
			})
			.when('/Admin', {
				templateUrl:'Views/Administration.html',
			})
			.when('/Activities', {
				templateUrl:'Views/Activities.html',
				controller:function($rootScope){
					$rootScope.authNeeded();
				}
			})
		
		$locationProvider.html5Mode(true);
	}
);