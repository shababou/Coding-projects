angular.module("app").factory
(
	"factoryTopics",
	function($http, $timeout, $q, miscServices)
	{	
		var factoryTopics = {};
		var all_topics = {data:{topics:[], success:true, message:"Deformat topics OK"}};
		
		factoryTopics.getAllTopics = function()
		{
			var deferred = $q.defer();

			if(all_topics.data.topics.length == 0)
			{
				console.log("topics");
				$http.get('/api/getAllTopics')
					.then(function(res){
						all_topics.data.topics = res.data.topics;
						deferred.resolve(res);
				});
			}
			else
			{
				deferred.resolve(all_topics);
			}

			return deferred.promise;
		};

		factoryTopics.allTopicsSync = function()
		{
			return angular.copy(all_topics.data.topics);
		}

		factoryTopics.getTopicById = function(id_topic)
		{
			return miscServices.objectByCriteriaFromArray(factoryTopics.allTopicsSync(), id_topic, "_id");
		}


		factoryTopics.getAllUniquesTopicsNames = function(levels_topics)
		{
			var uniques_topics = [];
			var topics_names = [];
			for (var i=0; i < levels_topics.length; i++)
			{
				if(!miscServices.isObjectInArray(uniques_topics, levels_topics[i], "name").result)
				{
					uniques_topics.push(levels_topics[i]);
					topics_names.push(levels_topics[i].name);
				}
			};
			return topics_names;
		};
		

		function formatTopic(topic)
		{
			topic = miscServices.formatData(topic, "level");
		    return topic;
		};

		factoryTopics.addTopics = function(new_topics)
		{
			var deferred = $q.defer();
			for (var i=0; i < new_topics.length; i++)
			{
				new_topics[i] = formatTopic(new_topics[i]);
			}
			$http.post('/api/addTopics', new_topics)
				.then(function(res){
					deferred.resolve(res);
				});
			return deferred.promise;	
		};

		factoryTopics.updateTopic = function(topic)
		{
			return $http.post('/api/updateTopic', topic)
				.success(function(res){
					return res;
				})
		};

		factoryTopics.deleteTopic = function(topic)
		{
			return $http.post('/api/deleteTopic', topic)
				.success(function(res){
					return res;
				})
		};

		return factoryTopics;	
	}
);





