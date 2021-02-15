//ELEMENT HTML DE L'OFFRE
angular.module("app").directive
(
	"offerI",
	function($timeout)
	{
		return{
			restrict:'EA',
			templateUrl:'Templates/template_offer.html',
			replace:true,
			scope:
			{
				offer:'=',
				profile:'='
			},
			link:
				function(scope,element)
				{
					$timeout
					(
						function ()
						{
							switch(scope.offer.type)
							{
								case "Chat", "RDV":
									element.find(".line2_Chat").addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
									element.find(".line2_RDV").addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');													
									break;
								default:
									element.find(".line2_Chat").addClass('col-xs-3 col-sm-3 col-md-3 col-lg-3');
									element.find(".line2_RDV").addClass('col-xs-8 col-sm-8 col-md-8 col-lg-8');
									break;
							}

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
							}					
						}
					);
				}
		}
	}
);
