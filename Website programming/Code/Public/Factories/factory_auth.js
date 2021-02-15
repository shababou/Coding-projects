angular.module("app").factory
(
	"factoryAuthUser",
	function($http, $q, $window, factoryAuthToken, factoryUsers, miscServices)
	{	
		var factoryAuthUser = {};
		
		//Injecte un nouvel utilisateur dans la base
		factoryAuthUser.addUser = function(user)
		{
			return $http.post('/api/signup', user)
				.success(function(res){
					$window.localStorage.setItem('token', res.token);
					return res;
				})
		};
		
		factoryAuthUser.login = function(user){
			return $http.post('/api/login', user)
				.success(function(res){
					factoryAuthToken.setToken(res.token);
					return res;
				})
		}
			
		factoryAuthUser.logout = function(){
			factoryAuthToken.setToken();
		}
			
		factoryAuthUser.isLoggedIn = function(){
			if(factoryAuthToken.getToken() && factoryAuthToken.getToken()!="undefined"){return true;}
			else{return false;}
		}
		
		factoryAuthUser.checkAdminStatus = function(user){
			return $http.post('/api/admin', user)
				.success(function(res){
					return res;
				})
		}
		
		return factoryAuthUser;
	}	
);


angular.module("app").factory
(
	"factoryAuthToken",
	function($window)
	{	
		var factoryAuthToken = {};
		
		factoryAuthToken.getToken = function(){
			return $window.localStorage.getItem('token');
		}
			
		factoryAuthToken.setToken = function(token){
			if(token){$window.localStorage.setItem('token', token);}
			else{$window.localStorage.removeItem('token');}
		}
		
		return factoryAuthToken;
	}
);


angular.module("app").factory
(
	"factoryAuthInterceptor",
	function($q, $rootScope, $location, factoryAuthToken)
	{	
		var factoryAuthInterceptor = {};

		factoryAuthInterceptor.request = function(config){
			var token = factoryAuthToken.getToken();
			if(token)
			{
				config.headers['x-access-token'] = token;
			}
			return config;
		}
		
		factoryAuthInterceptor.responseError = function(config){
			var token = factoryAuthToken.getToken();
			if(!token)
			{
				$rootScope.$broadcast('launchAuthPopup');
			}
			return config;
		}
		
		return factoryAuthInterceptor;
	}
);


angular.module("app").config(function($httpProvider){
	$httpProvider.interceptors.push('factoryAuthInterceptor');
});

