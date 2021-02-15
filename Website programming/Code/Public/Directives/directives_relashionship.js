//ELEMENT HTML DE L'ANNONCE
angular.module("app").directive
(
	"relashionship",
	function($timeout)
	{
		return{
			restrict:'E',
			templateUrl:'Templates/template_relashionship.html',
			replace:true,
			scope:
			{
				context:'=',
				ref:'=',
				other:'=',
				notif:'=',
				next:'='
			}
		}
	}
);




//ELEMENT HTML DE L'EVALUATION
//C'est un popup: c'est donc un enfant de l'élément "background_popup"
angular.module("app").directive
(
	"actionRelashionship",
	function($timeout, $compile)
	{
		return{
			restrict:'E',
			templateUrl:'Templates/template_action_relashionship.html',
			replace:true,
			scope:
			{
				context:'=',
				ref:'=',
				other:'=',
				datas:'=',
				index:'='
			},
			link:
				function($scope, element)
				{ 
					//A l'ouverture de cette directive, on assure que l'élément "background_popup" qui porte les popups est bien affiché
					$(".background_popup").css({"display":"block"});				
					$(".background_popup").append(element);
					
					//Cette partie sert à décaler l'ouverture de cet élément HTML, qui est donc un popup, au cas où déjà au moins un autre popup est présent (pour éviter les surperpositions)
					if($(".popup:visible").length>1)
					{
						var decal = Math.floor((Math.random() * 10) + 1)
						element.css({"position":"absolute","top":decal+'%',"right":decal+'%'});
					}
					
					element.draggable();
					

					$timeout
					(
						function ()
						{
							//Au clic du bouton de soumission du formulaire que contient le popup, on avertit le controller parent que le popup va se fermer
							element.find($(".action")).click
							(
								function()
								{
									$timeout(function (){
										hide();
									}, 500);																
								}
							);
							
							//Au clic du bouton de fermeture du popup, on avertit le controller parent que le popup va se fermer
							element.find($(".popup_close")).click
							(
								function()
								{
									hide();
								}
							);
							

							function hide()
							{	
								$scope.$emit('hideRelashionshipPopup');
								element.remove();
								//Si ce popup qui doit se fermer est le dernier d'ouvert, on rend de nouveau invisible l'élément "background_popup", qui porte les popup
								if($(".popup:visible").length < 1)
								{
									$(".background_popup").css({"display":"none"});
								}
							}
						}
					);	
				}				
		}
	}
);
