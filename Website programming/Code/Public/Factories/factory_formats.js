angular.module("app").factory
(
	"factoryFormats",
	function($http, $timeout, $q, miscServices)
	{	
		var factoryFormats = {};
		var all_formats = {data:{formats:[], success:true, message:"Deformat formats OK"}};
		
		factoryFormats.getAllFormats = function()
		{
			var deferred = $q.defer();

			if(all_formats.data.formats.length == 0)
			{
				console.log("formats");
				$http.get('/api/getAllFormats')
					.then(function(res){
						all_formats.data.formats = res.data.formats;
						deferred.resolve(res);
				});
			}
			else
			{
				deferred.resolve(all_formats);
			}

			return deferred.promise;
		};


		function formatFormat(format)
		{
			format = miscServices.formatData(format, "level");
		    return format;
		};

		factoryFormats.addFormats = function(new_formats)
		{
			var deferred = $q.defer();
			for (var i=0; i < new_formats.length; i++)
			{
				new_formats[i] = formatFormat(new_formats[i]);
			}
			$http.post('/api/addFormats', new_formats)
				.then(function(res){
					deferred.resolve(res);
				});
			return deferred.promise;	
		};

		factoryFormats.updateFormat = function(format)
		{
			return $http.post('/api/updateFormat', format)
				.success(function(res){
					return res;
				})
		};

		factoryFormats.deleteFormat = function(format)
		{
			return $http.post('/api/deleteFormat', format)
				.success(function(res){
					return res;
				})
		};

		return factoryFormats;	
	}
);





