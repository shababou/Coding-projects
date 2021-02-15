//Cette directive utilise la méthode d'autocomplétion des lieux géographiques de Google
angular.module("app").directive
(
	"googlePlace",
	function($timeout)
	{
		return {
			require:'ngModel',
			link:function(scope, element, attrs, model)
				{
					model.$formatters.push(function(value) {
						var init_address = value.number + ' ' + value.route + ' ' + value.ZIP + ' ' + value.city
					    return init_address;
					});
					
			

					var options = 
					{
						types: ['geocode'],
						//componentRestrictions: {country: 'fr'}               
					};
					scope.address = new google.maps.places.Autocomplete(element[0], options);
					
					
					//A chaque fois que l'utilisateur change l'input, cette méthode est exécutée: 
					//1/ On met en forme les éléments de l'adresse
					//2/ On actualise la valeur côté vue, pour qu'elle soit mise à jour dans le controller (principe du ng-model)
					google.maps.event.addListener
					(
						scope.address,
						'place_changed',
						function()
						{
							fillInAddress();
							scope.$apply(function() {
								model.$setViewValue(scope.newAddress);                
							});
						}
					);

					
					//Mise en forme des éléments de l'adresse
					function fillInAddress()
					{
						var addressTypes = scope.address.getPlace().address_components;
						scope.newAddress = 
						{
							number:extractFromAdress(addressTypes, "street_number"),
							route:extractFromAdress(addressTypes, "route"),
							ZIP:extractFromAdress(addressTypes, "postal_code"),
							city:extractFromAdress(addressTypes, "locality"),
							country:extractFromAdress(addressTypes, "country"),							
						}							

						var adressComplete = scope.newAddress.number + ", " + scope.newAddress.route + ", " + scope.newAddress.city + ", " + scope.newAddress.country
						
						//Le geodecodeur permet d'obtenir les coordonnées latérales et longitudinales du lieu					
						var addressLatLng;
						var geocoder = new google.maps.Geocoder();
						geocoder.geocode
						(
							{'address':adressComplete},
							function(results, status)
							{
								if(status == google.maps.GeocoderStatus.OK)
								{
									if (status != google.maps.GeocoderStatus.ZERO_RESULTS)
									{	
										addressLatLng = results[0].geometry.location;
										scope.newAddress.latitude = addressLatLng.lat();
										scope.newAddress.longitude = addressLatLng.lng();									
									}
								}
							}
						);
						
						// $timeout
						// (
						// 	function()
						// 	{
						// 		scope.newAddress.latitude = addressLatLng.lat();
						// 		scope.newAddress.longitude = addressLatLng.lng();
						// 	},
						// 	500
						// )
	
					}

					function extractFromAdress(components, type)
					{
						var nothing = false;
						for (var i=0; i<components.length; i++)
						{
							for (var j=0; j<components[i].types.length; j++)
							{	
								if(components[i].types[j]==type){return components[i].long_name;}
								else{nothing = true;}
							}
						}
						if(nothing == true){return "";}
					}
				}
		}
	}
);




//Cette directive utilise la Google Map, et personnalise les éléments à afficher
angular.module("app").directive
(
	"map",
	function($timeout)
	{	
		return{
			restrict:'EA',
			require:'ngModel',
			scope:
			{
				origin:'=',
				others:'=ngModel'
			},
			link:
				function(scope, element, attrs, model)
				{				
					//Lorsque le ng-model change, c'est à dire la liste des points d'intérêts définis par le controlleur à la vue, cette fonction est exécutée
					//Elle permet d'actualiser la map en conséquence
					scope.$watch('others', function(newValue, oldValue) {
						$timeout(
							function()
							{
								scope.$apply();
								defineMarkersAndBounds();
							}
						),true
					});
					
					//Options de paramétrages de la map
					var mapOptions =
					{
						center:new google.maps.LatLng(scope.origin.address.latitude, scope.origin.address.longitude),
						zoom:5,
						mapTypeId:google.maps.MapTypeId.ROADMAP,
						scaleControl:true,
						scrollwheel:true,
						zoomControl:false,
						mapTypeControl:false,
					};					
					var map = new google.maps.Map(element[0], mapOptions);
					
					
					//Création des markers, c'est à dire des points d'intérêts à afficher
					function defineMarkersAndBounds()
					{					
						var markers = [];
						createMarker(map, scope.origin.address, "Moi", "Origin");
						for(var i=0; i < scope.others.length; i++)
						{					
							if(scope.others[i].student){createMarker(map, scope.others[i].address, scope.others[i].distance, "Request");}
							else
							{
								if(scope.others[i].RDV_datas.open){createMarker(map, scope.others[i].RDV_datas.address, scope.others[i].RDV_datas.distance, "RDV");}
							}
						}						
					
						function createMarker(map, address, content, type)
						{
							var icon_src;
							var fillColor;
							if(type == "Origin"){icon_src = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";}
							else
							{
								var fillColor;
								if(type == "Request")
								{
									icon_src = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
									fillColor = "blue";
								}
								else if(type == "RDV")
								{
									icon_src = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
									fillColor = "red";
								}
								else{}
								
							}

							var markerOptions =
							{
								position:new google.maps.LatLng(address.latitude, address.longitude),
								map:map,
								icon:icon_src
							};
							var marker = new google.maps.Marker(markerOptions);
							markers.push(marker);

							if(type != "Origin")
							{
								var circle = new google.maps.Circle
								(
									{
										map:map,
										radius:200,// metres
										fillColor:fillColor
									}
								);
								circle.bindTo('center', marker, 'position');
							}

							
							//Fenêtre qui s'affiche au clic sur un point d'intérêt
							var infowindow;
							google.maps.event.addListener
							(
								marker,
								'click',
								function()
								{
									if(infowindow != null){infowindow.close();}
									infowindow = new google.maps.InfoWindow
									(
										{
											content:content,
											size:new google.maps.Size(150,50)
										}
									);
									infowindow.open(map, marker);
									map.setCenter(markerOptions.position);
								}
							);					
						} 
						
						//Centrage de la map, de sorte qu'elle englobe tous les points à afficher
						var bounds = new google.maps.LatLngBounds();
						for (var i = 0; i < markers.length; i++)
						{
							bounds.extend(markers[i].getPosition());
						}
						map.fitBounds(bounds);
						
					}
					
				}
		};
	}
   
);


