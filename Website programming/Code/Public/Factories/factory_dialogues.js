angular.module("app").factory
(
	"factoryDialogues",
	function($http, $q, factoryMessages, miscServices)
	{	
		var factoryDialogues = {};
		var all_dialogues = {data:{dialogues:[], success:true, message:"Deformat dialogues OK"}};
		
		factoryDialogues.getAllDialogues = function(matrix_reinit)
		{
			var deferred = $q.defer();

			if(all_dialogues.data.dialogues.length == 0 || (matrix_reinit && matrix_reinit['dialogues']))
			{	
				console.log("dialogues");
				all_dialogues.data.dialogues = [];

				$q.all([
					$http.get('/api/getAllDialogues'),
		            factoryMessages.getAllMessages()
	       		]).then(function(res){	
	       				for (var i=0; i < res[0].data.dialogues.length; i++)
						{
							var dialogue_i = {
								dialogue:res[0].data.dialogues[i],
								message:res[0].data.message,
								success:res[0].data.success
							};
							if(!miscServices.isObjectInArray(all_dialogues.data.dialogues, dialogue_i.dialogue, "_id").result)
							{
								var deformatted_message_i = deformatDialogue(dialogue_i, res[1].data);
								if(deformatted_message_i.success)
								{
									all_dialogues.data.dialogues.push(deformatted_message_i.dialogue);
								}
								else
								{
									all_dialogues.data.success = false;
									all_dialogues.data.message = "Error when loading and deformatting all dialogues"
									deferred.resolve(all_dialogues);
								}
							}
						}
						deferred.resolve(all_dialogues);
					});
			}
			else
			{
				deferred.resolve(all_dialogues);		
			}
			
			return deferred.promise;
		};

		function deformatDialogue(data_0, data_1)
		{
			var dialogue = data_0.dialogue;
		    var messages =data_1.messages;
	
		    dialogue.messages = miscServices.deformatArray(dialogue.messages, messages, "message");

		    var messages = [data_0.message, data_1.message];
		    var results = {};
		    results.messages = messages;
		    results.dialogue = dialogue;
		    if(data_0.success && data_1.success){results.success = true;}
		    else{results.success = false;}

		    return results;
		}


		factoryDialogues.getDialogue = function(id_dialogue)
		{
			var deferred = $q.defer();

			$q.all([
	            factoryDialogues.getAllDialogues(false)
       		]).then(function(res){
					var data = {};
		       		data.success = res[0].data.success;
		       		data.message = res[0].data.message;
					data.dialogue = miscServices.filterArrayByCriterias(res[0].data.dialogues, id_dialogue, null, "id_dialogue", null, 1)
					deferred.resolve(data);
				});

	       	return deferred.promise;
		};

		function formatDialogue(dialogue)
		{
			dialogue.messages = miscServices.formatArray(dialogue.messages, "message");
		    return dialogue;
		};


		factoryDialogues.updateDialogue = function(dialogue)
		{
			var deferred = $q.defer();

			$http.post('/api/updateDialogue', formatDialogue(dialogue))
				.then(function(res){
					deferred.resolve(res);
				});
			return deferred.promise;	
		};


		return factoryDialogues;	
	}
);





