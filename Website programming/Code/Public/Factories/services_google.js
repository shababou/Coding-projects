angular.module("app").service
(
	'googleServices',
	function($q)
	{
		this.completePOIArrayWithDest = function(origin, POI_array, type_POI)
		{
			var promises = [];
			var deferred = $q.defer();

			var i = 0;
			function loopOnPOIArray(i, googleServices)
			{
				if(i < POI_array.length)
				{	
					var POI_distances = [];
					if(type_POI == "Request"){POI_distances.push(googleServices.completePOIAddressWithDest(origin.address, POI_array[i].address))}
					else
					{
						if(POI_array[i].RDV_datas.open){POI_distances.push(googleServices.completePOIAddressWithDest(origin.address, POI_array[i].RDV_datas.address))}
					}
					$q.all(POI_distances).then(function(res){
						console.log(res);
						if(type_POI == "Request"){POI_array[i].distance = res[0].distance;}
						else
						{
							if(POI_array[i].RDV_datas.open){POI_array[i].RDV_datas.distance = res[0].distance;}
						}
						promises.push(POI_array[i]);
						loopOnPOIArray(i+1, googleServices);
					});
				}
				if((i == POI_array.length) || (POI_array.length == 0))
				{
					$q.all(promises).then(function(res){
							deferred.resolve(res);
						});
				}
			}

			loopOnPOIArray(i, this);

			
			return deferred.promise;
		};

		this.completePOIAddressWithDest = function(origin, POI_address)
		{
			var deferred = $q.defer();
			var service = new google.maps.DistanceMatrixService();
			var origin = new google.maps.LatLng(origin.latitude, origin.longitude);
			var destination = new google.maps.LatLng(POI_address.latitude, POI_address.longitude);
console.log(POI_address);
			service.getDistanceMatrix
			(
				{
					origins:[origin],
					destinations: [destination],
					travelMode: google.maps.TravelMode.WALKING ,
					unitSystem: google.maps.UnitSystem.METRIC,
					avoidHighways: false,
					avoidTolls: false
				},
				function(response, status)
				{	
					var result = {};
					if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS")
					{			
						var distance = response.rows[0].elements[0].distance.text;
						var duration = response.rows[0].elements[0].duration.text;
						var dvDistance = document.getElementById("dvDistance");
						result.success = true;
						result.message = "OK computing distance";
						result.distance = distance.split(" ")[0];
						deferred.resolve(result);
					}
					else
					{
						result.success = false;
						result.message = "KO computing distance";
						result.distance = "";
						deferred.resolve(result);
					}
				}
			);
			return deferred.promise;
		}
		
	}
);