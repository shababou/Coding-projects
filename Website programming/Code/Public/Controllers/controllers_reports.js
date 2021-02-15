angular.module("app").controller
(
	"ctrlReport",
	function($rootScope, $scope, $timeout, factoryReports, miscServices)
	{
		$scope.setReport = function(report)
		{
			$scope.report_OK = false;
			$scope.report = report;

			factoryReports.getReport(report)
				.then(function(promise){
					if(promise.success)
					{
						$scope.report = promise.report;
						$scope.offer = $scope.report.offer;
						$scope.request = $scope.report.request;
						$scope.request.contents.push({
							category:{_id:""},
							datas:[{
								format:{_id:""},
								topic:{_id:"", name:"Autre"},
								subjects:""
							}]
						});

						$scope.report_OK = true;				
					}
					else{console.log(promise.message);}
				});
		}


		$rootScope.$on
		(
			'broadcastReportUpdated',
			function()
			{
           		$scope.setReport($scope.report);		
			}
		);
	}

);

angular.module("app").controller
(
	"ctrlReportPopup",
	function($rootScope, $scope, $timeout)
	{		
		$scope.show_report = false;

		$scope.$on
		(
			'hideReportPopup',
			function(event, nb_popups_open)
			{
				$scope.$apply(function () {
            		$scope.show_report = false;
        		});
				$rootScope.$emit('closingPopup'); //On informe le controller parent de la page appellante qu'il y a eu un changement d'état au niveau des popups
			}
		);
	
		//Ouverture de la directive -> update des inputs		
		$scope.openReportPopup = function()
		{			
			$scope.show_report = true;
		};
		
		$rootScope.$emit('openingPopup'); //La directive signale au controller qui l'encadre (celui-ci) qu'elle a été ouverte		
	}
);




//ROLE: Gérer le formulaire de création d'un rapport
angular.module("app").controller
(
	"setupReport",
	function($rootScope, $scope, $q, factoryReports, factoryNotifications, factoryMarks, factorySchedules, factoryComments, usersServices, miscServices, notifsServices)
	{
		$scope.options_presence = miscServices.options_presence;
		$scope.schedule_positions = [];

		$scope.setTotalDuration = function()
		{
			$scope.total_duration = miscServices.dateDiff($scope.report.start_time, $scope.report.end_time);
			if($scope.report.end_time > $scope.report.start_time){$scope.date_OK = true;}
			else{$scope.date_OK = false;}
		};


		$scope.setSchedulesPositions = function()
		{
			if($scope.report.status == "New")
			{
				for (var i = 0; i < $scope.report.schedules_datas.schedules.length; i++)
				{
					$scope.schedule_positions[i] = 100 / $scope.report.schedules_datas.schedules.length;
				}
			}
			else
			{
				for (var i = 0; i < $scope.report.schedules_datas.schedules.length; i++)
				{
					$scope.schedule_positions[i] = ($scope.report.schedules_datas.schedules[i].schedule * 100) / $scope.total_duration;
				}
			}
		};

		if($scope.report.status == "New")
		{
			$scope.report.marks_from_teacher = [];
			$scope.report.comments_from_teacher = [];
			$scope.report.participants = angular.copy($scope.offer.RDV_datas.participants);
			for (var i = 0; i < $scope.report.participants.length; i++)
			{
				$scope.report.participants[i].presence = $scope.options_presence[0].logical_name;
				$scope.report.participants[i].paiement = $scope.offer.RDV_datas.price_net_real;
				var basis_marks_comments_datas = 
				{
					presence:true,
					id_context:$scope.report._id,
					id_assessor:$scope.report.teacher._id,
					id_assessed:$scope.report.participants[i].user._id,
					type_context:"RDV"
				};
				$scope.report.marks_from_teacher[i] = angular.copy(basis_marks_comments_datas);
				$scope.report.marks_from_teacher[i].marks = [];
				$scope.report.comments_from_teacher[i] = angular.copy(basis_marks_comments_datas);
				$scope.report.comments_from_teacher[i].comment = "";
			}

			$scope.report.schedules_datas = 
				{
					id_report:$scope.report._id,
					schedules:[]
				};
			var k = 0;
			for (var i = 0; i < $scope.request.contents.length; i++)
			{
				for (var j = 0; j < $scope.request.contents[i].datas.length; j++)
				{
					$scope.report.schedules_datas.schedules[k] = 
						{
							id_format:$scope.request.contents[i].datas[j].format._id,
							id_topic:$scope.request.contents[i].datas[j].topic._id
						}
					k++;
				}
			}
			$scope.report.start_time = angular.copy($scope.offer.RDV_datas.time_slots[$scope.offer.RDV_datas.selected_time_slot].date_slot);
			$scope.report.end_time = miscServices.addHoursToDate(angular.copy($scope.report.start_time), $scope.offer.RDV_datas.time_slots[$scope.offer.RDV_datas.selected_time_slot].duration);

			$scope.report.selected_address = $scope.offer.RDV_datas.selected_address;	
		}
		else
		{
			for (var i = 0; i < $scope.report.participants.length; i++)
			{
				if($scope.report.participants[i].complementary_datas.status == "New")
				{
					var basis_marks_comments_datas = 
					{
						id_context:$scope.report._id,
						id_assessed:$scope.report.teacher._id,
						id_assessor:$scope.report.participants[i].user._id,
						type_context:"RDV"
					};
					var marks_to_teacher = angular.copy(basis_marks_comments_datas);
					marks_to_teacher.marks = [];
					$scope.report.marks_to_teacher.push(marks_to_teacher);
					var comments_to_teacher = angular.copy(basis_marks_comments_datas);
					comments_to_teacher.comment = "";
					$scope.report.comments_to_teacher.push(comments_to_teacher);
				}
			}
		}

		$scope.setTotalDuration();
		$scope.setSchedulesPositions();
		
		var participants = angular.copy(miscServices.filterArrayByDataname($scope.report.participants, "user"));
		$scope.participating = miscServices.isObjectInArray(participants, $rootScope.ME, "user").result;
		$scope.whole_users = participants;
		$scope.whole_users.splice(0, 0, $scope.offer.teacher);

					
		$scope.createReport = function(type)
		{	
			var report = angular.copy($scope.report);
			report.marks_from_teacher = miscServices.filterArrayByCriterias(report.marks_from_teacher, true, null, "presence", null, 1);
			report.comments_from_teacher = miscServices.filterArrayByCriterias(report.comments_from_teacher, true, null, "presence", null, 1);
			report.status = "Diffused";

			var notifications = notifsServices.prepareNotifsReport($rootScope.ME, report, type);

			var deferred = $q.defer();
			$q.all([
				factoryMarks.updateMarks(report.marks_from_teacher),
				factorySchedules.addSchedules(report.schedules_datas),
				factoryComments.addComments(report.comments_from_teacher),
	            factoryReports.updateReport(report),
	            factoryNotifications.updateNotifications(notifications.notifs)
       		]).then(function (res){
       				if(res[0].data.success && res[1].data.success)
					{	
						$rootScope.$emit('emitActionRT', {group:"Notification", content:notifications.RT});	
					}
					else{console.log(res[0].data.message + " " + res[1].data.message);}	
				});	
		};
		
	}
);

//ROLE: Gérer la répartition du temps dans le rapport.
angular.module("app").controller
(
	"ctrlSchedule",
	function($scope)
	{
		$scope.setSchedules = function()
		{
			var sum_positions = 0;
			for (var i = 0; i < $scope.schedule_positions.length; i++)
			{
				$scope.schedule_positions[i] = parseInt($scope.schedule_positions[i]);
				sum_positions = sum_positions + $scope.schedule_positions[i];
			}
			for (var i = 0; i < $scope.schedule_positions.length; i++)
			{	
				if((sum_positions == 0) || ($scope.date_OK == false)){$scope.report.schedules_datas.schedules[i].schedule = 0;}
				else {$scope.report.schedules_datas.schedules[i].schedule = Math.round(($scope.schedule_positions[i]/sum_positions)*$scope.total_duration);}
			}
		};
		

		$scope.$watch
		(
			'total_duration',
			function()
			{
				$scope.setSchedules();
			}
			,true
		);
	
	}
);




//ROLE: Gérer la création d'un commentaire faite par un élève à un professeur
angular.module("app").controller
(
	'setupComment',
	function($rootScope, $scope, $q, factoryReports, factoryMarks, factoryComments, factoryNotifications, miscServices, notifsServices)
	{
		$scope.initComment = function(report, index)
		{
			$scope.report = report;
			$scope.index = index;
			$scope.marks_from_participant_I_to_teacher = miscServices.filterArrayByCriterias($scope.report.marks_to_teacher, $scope.report.participants[$scope.index].user._id, null, "id_assessor", null, 1);
			$scope.comment_from_participant_I_to_teacher = miscServices.filterArrayByCriterias($scope.report.comments_to_teacher, $scope.report.participants[$scope.index].user._id, null, "id_assessor", null, 1);
		}


		$scope.createComment = function(type)
		{		
			var report = angular.copy($scope.report);
			var marks_from_participant_I_to_teacher = angular.copy($scope.marks_from_participant_I_to_teacher);
			var comment_from_participant_I_to_teacher = angular.copy($scope.comment_from_participant_I_to_teacher);

			report.status = "Commented";	
			report.participants[$scope.index].complementary_datas.status = "Diffused";

			var teacher = angular.copy(report.teacher);		
			var notifications = notifsServices.prepareNotifsReport($rootScope.ME, report, type);
			var notification_to_delete = {
				emitter:teacher,
				receiver:teacher,
				action:report,
				cat:"Report",
				type:"",
				emission_date:new Date()
			}

 			var deferred = $q.defer();
 			$q.all([
 				factoryMarks.updateMarks(marks_from_participant_I_to_teacher),
 				factoryComments.addComments(comment_from_participant_I_to_teacher),
 	            factoryReports.updateReport(report),
 	            factoryNotifications.updateNotifications(notifications.notifs),
	            factoryNotifications.deleteNotification([notification_to_delete])
       		]).then(function(res){
       				if(res[0].data.success && res[1].data.success && res[2].data.success)
					{	
						$rootScope.$emit('emitActionRT', {group:"Notification", content:notifications.RT});	
					}
					else{console.log(res[0].data.message + " " + res[1].data.message + " " + res[2].data.message);}	
				});	
		}
	}
						
	
);









