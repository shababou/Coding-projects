//ELEMENT HTML DE L'ANNONCE
angular.module("app").directive
(
	"requestI",
	function($timeout)
	{
		return{
			restrict:'E',
			templateUrl:'Templates/template_request.html',
			replace:true,
			scope:
			{
				request:'=',
				profile:'=',
				kind:'='
			},
			link:
				function(scope, element)
				{
					$timeout
					(					
						function ()
						{
							set_font_sizes();

							$(window).resize(function() {
  								set_font_sizes();		
							});	

							function set_font_sizes()
							{
								var viewport_width = $(window).width();
								var element_width = element.width();
								var element_font_size = 2.2*element_width/viewport_width;
								element.css('font-size', element_font_size + 'vw');
								element.find(".resume_offers").css('font-size', 2.8*element_font_size + 'vw');
							}				
						}
					);
				}
		}
	}
);
