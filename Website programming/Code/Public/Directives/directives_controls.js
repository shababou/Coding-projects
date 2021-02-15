angular.module("app").directive
(
	"checkAddress",
	function()
	{
		return {
		    require:'ngModel',
		    link: function(scope, element, attrs, model) {

		    	    model.$parsers.unshift(function (viewValue) {
		    	    	if (viewValue instanceof Object)
		    	    	{
		    	    		model.$setValidity('checkAddress', true); 
		    	    		if(element.next()[0] instanceof HTMLSpanElement){element.next().remove();}   	    		
		                } 
		                else
		                {
		                	model.$setValidity('checkAddress', false);
		                	if(!(element.next()[0] instanceof HTMLSpanElement))
		                	{
		                		element.after("<span class='error_form'>Veuillez entrer une addresse correcte !</span>");
		                	}
		                }

		                return viewValue;
		           });

		    }
  		};

	}
);


angular.module("app").directive
(
	"checkUsername",
	function(factoryUsers)
	{
		return {
			restrict:'A',
		    require:'ngModel',
		    link: function(scope, element, attrs, model) {

		    		var my_username;

			    	scope.$watch('model', function(){
	                	my_username = model.$viewValue;
	            	}, true);


		    	    model.$parsers.unshift(function (viewValue) {
		    	    	if((factoryUsers.allUsernames().indexOf(viewValue) <= -1) || (viewValue == my_username))
		    	    	{
		    	    		model.$setValidity('checkUsername', true); 
		    	    		if(element.next()[0] instanceof HTMLSpanElement){element.next().remove();} 	    		
		                } 
		                else
		                {
		                	model.$setValidity('checkUsername', false);
		                	if(!(element.next()[0] instanceof HTMLSpanElement))
		                	{
		                		element.after("<span class='error_form'>Cet username est déjà utilisé !</span>");
		                	}
		                }

		                return viewValue;
		           });

		    }
  		};

	}
);


angular.module("app").directive
(
	"checkTeamName",
	function(factoryTeams)
	{
		return {
			restrict:'A',
		    require:'ngModel',
		    link: function(scope, element, attrs, model) {

		    		var my_username;

			    	scope.$watch('model', function(){
	                	my_team_name = model.$viewValue;
	            	}, true);


		    	    model.$parsers.unshift(function (viewValue) {
		    	    	if((factoryTeams.allTeamsNames().indexOf(viewValue) <= -1) || (viewValue == my_team_name))
		    	    	{
		    	    		model.$setValidity('checkTeamName', true); 
		    	    		if(element.next()[0] instanceof HTMLSpanElement){element.next().remove();} 	    		
		                } 
		                else
		                {
		                	model.$setValidity('checkTeamName', false);
		                	if(!(element.next()[0] instanceof HTMLSpanElement))
		                	{
		                		element.after("<span class='error_form'>Ce nom est déjà utilisé !</span>");
		                	}
		                }

		                return viewValue;
		           });

		    }
  		};

	}
);

