angular.module("app").factory
(
	"factoryOffers",
	function($http, $q, factoryUsers, miscServices)
	{	
		var factoryOffers = {};
		var all_offers = {data:{offers:[], success:true, message:"OK when loading and deformatting all offers"}};

		factoryOffers.getAllOffers = function(matrix_reinit)
		{
			var deferred = $q.defer();
			if(all_offers.data.offers.length == 0 || (matrix_reinit && matrix_reinit['offers']))
			{
				if(!matrix_reinit){matrix_reinit = {'users':false};}

				console.log("offers");
				all_offers.data.offers = [];
				
				$q.all([
		            $http.get('/api/getAllOffers'),
		            factoryUsers.getAllUsers(matrix_reinit['users'])
	       		]).then(function(res){	
	       				for (var i=0; i < res[0].data.offers.length; i++)
						{
							var offer_i = {
								offer:res[0].data.offers[i],
								message:res[0].data.message,
								success:res[0].data.success
							};
							if(!miscServices.isObjectInArray(all_offers.data.offers, offer_i.offer, "_id").result)
							{
								var deformatted_offer_i = deformatOffer(offer_i, res[1].data);
								if(deformatted_offer_i.success)
								{
									all_offers.data.offers.push(deformatted_offer_i.offer);
								}
								else
								{
									all_offers.data.success = false;
									all_offers.data.message = "Error when loading and deformatting all offers"
									deferred.resolve(all_offers);
								}
							}
						}
						deferred.resolve(all_offers);
					});
			}
			else
			{
				deferred.resolve(all_offers);
			}
			return deferred.promise;
		};

		function deformatOffer(data_0, data_1, data_2)
		{
			var offer = data_0.offer;
		    var users = data_1.users;

		    offer = miscServices.deformatData(offer, users, "teacher");
		    offer.emission_date = new Date(offer.emission_date);

		    if(offer.RDV_datas.open)
		    {
				offer.RDV_datas.participants = miscServices.deformatArray(offer.RDV_datas.participants, users, "user");
				if(offer.RDV_datas.nb_participants > 3){offer.src_img = "Images/team.png";}
				else{offer.RDV_datas.src_img = "Images/" + offer.RDV_datas.nb_participants + ".png";}

				for (var i=0; i < offer.RDV_datas.time_slots.length; i++)
				{
					offer.RDV_datas.time_slots[i].date_slot = new Date(offer.RDV_datas.time_slots[i].date_slot);
				}
				offer.RDV_datas.price_net_theo = factoryOffers.computePriceNet(offer.RDV_datas.nb_participants, offer.RDV_datas.price);
				offer.RDV_datas.price_net_real = factoryOffers.computePriceNet(offer.RDV_datas.participants.length, offer.RDV_datas.price);
			}

			if(offer.RDV_datas.open && offer.Chat_datas.open){offer.type = "Combined";}
			else if(offer.RDV_datas.open && !offer.Chat_datas.open){offer.type = "RDV";}
			else{offer.type = "Chat";}

		    var messages = [data_0.message, data_1.message];
		    var results = {};
		    results.messages = messages;
		    results.offer = offer;
		    if(data_0.success && data_1.success){results.success = true;}
		    else{results.success = false;}

		    return results;
		}

		factoryOffers.computePriceNet = function(nb, price)
		{
			if(nb == 1){return price;}
			else if(nb == 2){return Math.ceil((80.0/100)*price);}
			else if(nb == 3){return Math.ceil((70.0/100)*price);}
			else{return Math.ceil((50./100)*price);}
		}

		factoryOffers.allOffersSync = function()
		{
			return angular.copy(all_offers.data.offers);
		}


		function formatOffer(offer)
		{
			delete offer['type'];
			offer = miscServices.formatData(offer, "teacher");
			if(offer.RDV_datas.open)
			{
				delete offer.RDV_datas['src_img'];
				offer.RDV_datas.participants = miscServices.formatArray(offer.RDV_datas.participants, "user");
			}
		    return offer;
		}

	
		factoryOffers.saveOffer = function(offer)
		{
			var offer = formatOffer(offer);
			return $http.post('/api/saveOffer', offer)
				.success(function(res){
					return res;
				});		
		};


		return factoryOffers;
	}
);


