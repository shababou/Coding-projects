angular.module("app").factory
(
	"factoryFiles",
	function($http, $q)
	{
		var factoryFiles = {};

		factoryFiles.uploadFile = function(file, object, type)
		{
			var fd = new FormData();
        	fd.append('file', file);
        	fd.append('id_object', object._id);

        	var deferred = $q.defer();

        	if(file && (type == "Photo_user"))
        	{
        		fd.append('username', object.username);
				$http.post("/uploadPhotoUser", fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).then(function(res){
					deferred.resolve(res);
				});	
			}
			else if(file && (type == "Photo_team"))
        	{
        		fd.append('name', object.name);
				$http.post("/uploadPhotoTeam", fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).then(function(res){
					deferred.resolve(res);
				});	
			}

			return deferred.promise;
		};


		return factoryFiles;				
	}
);