//ROLE: GESTIONNAIRE DES USERS
//Fait l'interface entre la base (table "USERS") et le reste du site concernant le traitement des utilisateurs
angular.module("app").factory
(
	"factoryUsers",
	function($rootScope, $http, $q, $timeout, factoryMarks, factorySchedules, factoryCategories, networkServices, membershipServices, miscServices, usersServices)
	{	
		var factoryUsers = {};
		var all_users = {data:{users:[], success:true, message:"OK when loading and deformatting all users"}};

		factoryUsers.getAllUsers = function(reinit)
		{
			var deferred = $q.defer();
			if(all_users.data.users.length == 0 || reinit)
			{
				console.log("users");
				all_users.data.users = [];

				$q.all([
		            $http.get('/api/getAllUsers'),
		            factoryMarks.getAllMarks(),
		            factorySchedules.getAllSchedules(),
		            factoryCategories.getAllCategories()
	       		]).then(function(res){	
	       				for (var i=0; i < res[0].data.users.length; i++)
						{
							var user_i = {
								user:res[0].data.users[i],
								message:res[0].data.message,
								success:res[0].data.success
							};
							if(!miscServices.isObjectInArray(all_users.data.users, user_i.user, "_id").result)
							{
								var deformatted_user_i = deformatUser(user_i, res[0].data, res[1].data, res[2].data, res[3].data);
								if(deformatted_user_i.success)
								{
									all_users.data.users.push(deformatted_user_i.user);
								}
								else
								{
									all_users.data.success = false;
									all_users.data.message = "Error when loading and deformatting all users"
									deferred.resolve(all_users);
								}
							}
						}
						deferred.resolve(all_users);
					});
			}
			else
			{	
				deferred.resolve(all_users);
			}

			return deferred.promise;
		};

		factoryUsers.getMe = function(reinit)
		{
			var deferred = $q.defer();

			$q.all([
	            $http.get('/api/me'),
	            factoryUsers.getAllUsers(reinit)
       		]).then(function(res){
       				var data = {};
       				data.success = res[1].data.success;
       				data.message = res[1].data.message;
	       			for (var i=0; i < all_users.data.users.length; i++)
					{
						if(all_users.data.users[i]._id == res[0].data.user._id)
						{
							data.user = all_users.data.users[i];
							data.user.password = res[0].data.user.password;
							deferred.resolve(data);
						}
					}
				});

       		return deferred.promise;
		}
	
		factoryUsers.getUser = function(user)
		{
			var deferred = $q.defer();

			$q.all([
	            factoryUsers.getAllUsers(false)
       		]).then(function(res){
					var data = {};
		       		data.success = all_users.data.success;
		       		data.message = all_users.data.message;
					for (var i = 0; i < all_users.data.users.length; i++)
					{
						if(all_users.data.users[i]._id == user._id)
						{
							data.user = all_users.data.users[i];
							deferred.resolve(data);			
						}
					}
				});

	       	return deferred.promise;
		};

		factoryUsers.allUsersSync = function()
		{
			return angular.copy(all_users.data.users);
		}

		factoryUsers.setAllUsersSync = function(users)
		{
			all_users.data.users = users;
		}

		factoryUsers.allUsernames = function()
		{
			return angular.copy(miscServices.filterArrayByDataname(factoryUsers.allUsersSync(), 'username'));
		}

		function deformatUser(data_0, data_1, data_2, data_3, data_4)
		{
			var user = data_0.user;
		    var users =data_1.users;
		    var marks = data_2.marks;
		    var schedules = data_3.schedules;
		    user.birthdate = new Date(user.birthdate);
		    var actual_date = new Date();
		    user.age = actual_date.getFullYear() - user.birthdate.getFullYear();
		    user.inscription_date = new Date(user.inscription_date);

		    if(user.linked_users){user.linked_users = miscServices.deformatArray(user.linked_users, users, "user");}

		    var messages = [data_0.message, data_1.message, data_2.message, data_3.message, data_4.message];
		    var results = {};
		    results.messages = messages;
		    results.user = user;
		    if(data_0.success && data_1.success && data_2.success && data_3.success && data_4.success){results.success = true;}
		    else{results.success = false;}

		    return results;
		}


		factoryUsers.updateNetworkStatus = function(user_A, user_B, next_status_A, next_status_B)
		{
			var prepa_OK = false;
			user_A.linked_users = networkServices.updateLinkedUsers(user_A, user_B, next_status_A);
			user_B.linked_users = networkServices.updateLinkedUsers(user_B, user_A, next_status_B);
			prepa_OK = true;
			var deferred = $q.defer();
			if(prepa_OK)
			{
				var user_A_formatted = factoryUsers.formatUser(user_A);
				var user_B_formatted = factoryUsers.formatUser(user_B);
				$q.all([
		            $http.post('/api/updateUsers', [user_A_formatted]),
		            $http.post('/api/updateUsers', [user_B_formatted])
	       		]).then(function(res){
			       		var messages = [res[0].data.message, res[1].data.message];
			       		var results = {};
			       		results.messages = messages;
			       		if(res[0].data.success && res[1].data.success){results.success = true;}
			       		else{results.success = false;}
			       		deferred.resolve(results);
					});
	       	}

       		return deferred.promise;	
		};

		


		factoryUsers.formatUser = function(user)
		{
			delete user['age'];
			delete user['global_synthesis'];
			delete user['global_average'];
			user.linked_users = miscServices.formatArray(user.linked_users, "user");
			user.linked_teams = miscServices.formatArray(user.linked_teams, "team");
		    return user;
		}

	

		factoryUsers.updateUsers = function(users)
		{	
			for (var i = 0; i < users.length; i++)
			{
				users[i] = factoryUsers.formatUser(users[i]);
			}
			return $http.post('/api/updateUsers', users)
				.success(function(res){
					return res;
			});		
		};
		
		factoryUsers.updateME = function(ME)
		{	
			return $http.post('/api/updateME', factoryUsers.formatUser(ME))
				.success(function(res){
					return res;
			});		
		};

		
		return factoryUsers;
	}
);


