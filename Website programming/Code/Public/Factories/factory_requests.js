angular.module("app").factory
(
	"factoryRequests",
	function($http, $q, factoryUsers, factoryCategories, factoryLevels,  factoryFormats, factoryTopics, factorySubjects, factoryOffers, factoryTeams, miscServices)
	{	
		var factoryRequests = {};
		var all_requests = {data:{requests:[], success:true, message:"OK when loading and deformatting all requests"}};

		factoryRequests.getAllRequests = function(matrix_reinit)
		{
			var deferred = $q.defer();
			if(all_requests.data.requests.length == 0 || (matrix_reinit && matrix_reinit['requests']))
			{
				if(!matrix_reinit){matrix_reinit = {'offers':false};}

				console.log("requests");
				all_requests.data.requests = [];

				$q.all([
		            $http.get('/api/getAllRequests'),
		            factoryUsers.getAllUsers(),
		            factoryCategories.getAllCategories(),
		            factoryLevels.getAllLevels(),
		            factoryFormats.getAllFormats(),
		            factoryTopics.getAllTopics(),
		            factorySubjects.getAllSubjects(),
		            factoryOffers.getAllOffers(matrix_reinit),
		            factoryTeams.getAllTeams()
	       		]).then(function(res){
	       				for (var i=0; i < res[0].data.requests.length; i++)
						{
							var request_i = {
								request:res[0].data.requests[i],
								message:res[0].data.message,
								success:res[0].data.success
							};
							if(!miscServices.isObjectInArray(all_requests.data.requests, request_i.request, "_id").result)
							{
								var deformatted_request_i = deformatRequest(request_i, res[0].data, res[1].data, res[2].data, res[3].data, res[4].data, res[5].data, res[6].data, res[7].data, res[8].data);
								if(deformatted_request_i.success)
								{
									all_requests.data.requests.push(deformatted_request_i.request);
								}
								else
								{
									all_requests.data.success = false;
									all_requests.data.message = "Error when loading and deformatting all requests"
									deferred.resolve(all_requests);
								}
							}
						}
						deferred.resolve(all_requests);
					});
			}
			else
			{
				deferred.resolve(all_requests);
			}

			return deferred.promise;
		};

		function deformatRequest(data_0, data_1, data_2, data_3, data_4, data_5, data_6, data_7, data_8, data_9)
		{
			var request = data_0.request;
		    var requests = data_1.requests;
		    var users = data_2.users;
		    var categories = data_3.categories;
		    var levels = data_4.levels;
		    var formats = data_5.formats;
		    var topics = data_6.topics;
		    var subjects = data_7.subjects;
		    var offers = data_8.offers;
		    var teams = data_9.teams;
		    request.offers = [];
		    request = miscServices.addDeformattedDatasToAWithB(request, offers, "request", "offers");
		    if(request.linked_teams){miscServices.deformatArray(request.linked_teams, teams, "team");}
		    request.resume_offers = resumeOffersForRequest(request.offers);
		    if(request.linked_teams.length > 0){request.src_img = "Images/team.png";}
			else{request.src_img = "Images/" + request.nb_participants + ".png";}
		    request = miscServices.deformatData(request, users, "student");
		    request.target_date = new Date(request.target_date);
		    request.emission_date = new Date(request.emission_date);
		    for (var i=0; i < request.contents.length; i++)
			{
				request.contents[i] = miscServices.deformatData(request.contents[i], categories, "category");
				for (var j=0; j < request.contents[i].datas.length; j++)
				{
					request.contents[i].datas[j] = miscServices.deformatData(request.contents[i].datas[j], levels, "level");
					request.contents[i].datas[j] = miscServices.deformatData(request.contents[i].datas[j], formats, "format");
					request.contents[i].datas[j] = miscServices.deformatData(request.contents[i].datas[j], topics, "topic");
					request.contents[i].datas[j].subjects = miscServices.deformatArray(request.contents[i].datas[j].subjects, subjects, "subject");
				}
			}	
		    var messages = [data_0.message, data_1.message, data_2.message, data_3.message, data_4.message, data_5.message, data_6.message, data_7.message, data_8.message, data_9.message];
		    var results = {};
		    results.messages = messages;
		    results.request = request;
		    if(data_0.success && data_1.success && data_2.success && data_3.success && data_4.success && data_5.success && data_6.success && data_7.success && data_8.success && data_9.success){results.success = true;}
		    else{results.success = false;}

		    return results;
		}

		function resumeOffersForRequest(offers)
		{
			var resume_offers = {};
			var chat_offers = [];
			var RDV_offers = [];
			var combined_offers = [];
			chat_offers = miscServices.filterArrayByCriterias(offers, "Chat", "", "type");
			RDV_offers = miscServices.filterArrayByCriterias(offers, "RDV", "", "type");
			combined_offers = miscServices.filterArrayByCriterias(offers, "Combined", "", "type");
			resume_offers.nb_chats_offers = chat_offers.length + combined_offers.length;
			resume_offers.nb_RDV_offers = RDV_offers.length + combined_offers.length;
			resume_offers.last_chat_offer = chat_offers[chat_offers.length - 1];
			resume_offers.last_RDV_offer = RDV_offers[RDV_offers.length - 1];
			if(combined_offers.length > 0)
			{
				if(chat_offers.length > 0 && (combined_offers[combined_offers.length - 1].emission_date <= chat_offers[chat_offers.length - 1].emission_date)){}
				else{resume_offers.last_chat_offer = combined_offers[combined_offers.length - 1];}
				if(RDV_offers.length > 0 && (combined_offers[combined_offers.length - 1].emission_date <= RDV_offers[RDV_offers.length - 1].emission_date)){}
				else{resume_offers.last_RDV_offer = combined_offers[combined_offers.length - 1];}
			}
			return resume_offers;
		}
	

		function formatRequest(request)
		{
			if(request.linked_teams){request.linked_teams = miscServices.formatArray(request.linked_teams, "team");}
			request = miscServices.formatData(request, "student");
			delete request["offers"];
			console.log(request);
			for (var i=0; i < request.contents.length; i++)
			{
				request.contents[i] = miscServices.formatData(request.contents[i], "category");
				for (var j=0; j < request.contents[i].datas.length; j++)
				{	
					request.contents[i].datas[j] = miscServices.formatData(request.contents[i].datas[j], "level");
					request.contents[i].datas[j] = miscServices.formatData(request.contents[i].datas[j], "format");
					request.contents[i].datas[j] = miscServices.formatData(request.contents[i].datas[j], "topic");
					request.contents[i].datas[j].subjects = miscServices.formatArray(request.contents[i].datas[j].subjects, "subject");
				}
			}	
		    return request;
		}


		factoryRequests.allRequestsSync = function()
		{
			return angular.copy(all_requests.data.requests);
		}

	
		factoryRequests.saveRequest = function(request)
		{	
			var request = formatRequest(request);
			return $http.post('/api/saveRequest', request)
				.success(function(res){
					return res;
				});		
		};

		factoryRequests.getRequest = function(id_request, matrix_reinit)
		{
			var deferred = $q.defer();

			$q.all([
	            factoryRequests.getAllRequests(matrix_reinit)
       		]).then(function(res){
					var data = {};
	      			data.success = res[0].data.success;
	        		data.message = res[0].data.message;
		       		for (var i=0; i < res[0].data.requests.length; i++)
					{
						if(res[0].data.requests[i]._id == id_request)
						{       		
							data.request = res[0].data.requests[i];
							deferred.resolve(data);
						}
					}
				});

	       	return deferred.promise;
		};

		factoryRequests.getRequestSync = function(id_request)
		{
			var request = miscServices.objectByCriteriaFromArray(angular.copy(all_requests.data.requests), id_request, "_id", null, 1);
			return request;
		}


		return factoryRequests;
	}
);


