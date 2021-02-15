angular.module("app").factory
(
	"factoryReports",
	function($http, $q, factoryUsers, factoryOffers, factoryRequests, factoryTopics, factoryMarks, factorySchedules, factoryComments, miscServices)
	{
		var factoryReports = {};
		var all_reports = {data:{reports:[], success:true, message:"OK when loading and deformatting my reports"}};
			
		factoryReports.getAllReports = function(matrix_reinit)
		{
			var deferred = $q.defer();
			if(all_reports.data.reports.length == 0 || (matrix_reinit && matrix_reinit['reports']))
			{
				if(!matrix_reinit){matrix_reinit = {'requests':false, 'offers':false, 'marks':false, 'schedules':false, 'comments':false};}

				console.log("reports");
				all_reports.data.reports = [];

				$q.all([
					$http.get('/api/getAllReports'),
		            factoryUsers.getAllUsers(),
		            factoryOffers.getAllOffers(matrix_reinit),
		            factoryRequests.getAllRequests(matrix_reinit),
					factoryTopics.getAllTopics(),
					factoryMarks.getAllMarks(matrix_reinit),
					factorySchedules.getAllSchedules(matrix_reinit),
					factoryComments.getAllComments(matrix_reinit)
	       		]).then(function(res){
	       				for (var i=0; i < res[0].data.reports.length; i++)
						{
							var report_i = {
								report:res[0].data.reports[i],
								message:res[0].data.message,
								success:res[0].data.success
							};
							if(!miscServices.isObjectInArray(all_reports.data.reports, report_i.report, "_id").result)
							{
								var deformatted_report_i = deformatReport(report_i, res[1].data, res[2].data, res[3].data, res[4].data, res[5].data, res[6].data, res[7].data);
								if(deformatted_report_i.success)
									all_reports.data.reports.push(deformatted_report_i.report);
								else
								{
									all_reports.data.success = false;
									all_reports.data.message = "Error when loading and deformatting my reports"
									deferred.resolve(all_reports);
								}
							}
						}
						deferred.resolve(angular.copy(all_reports));
					});
			}
			else
			{
				deferred.resolve(angular.copy(all_reports));
			}
			return deferred.promise;
		};

		function deformatReport(data_0, data_1, data_2, data_3, data_4, data_5, data_6, data_7)
		{
			var report = data_0.report;
		    var users = data_1.users;
		    var offers = data_2.offers;
		    var requests = data_3.requests;
		    var topics = data_4.topics;
		    var marks = data_5.marks;
		    var schedules = data_6.schedules;
		    var comments = data_7.comments;
		    report = miscServices.deformatData(report, offers, "offer");
		    report.request = miscServices.objectByCriteriaFromArray(requests, report.offer.id_request, "_id");
		    report = miscServices.deformatData(report, users, "teacher");
			report.participants = miscServices.deformatArray(report.participants, users, "user");

			var marks_report = miscServices.filterArrayByCriterias(marks, report._id, null, "id_context", null, 1);
			var comments_report = miscServices.filterArrayByCriterias(comments, report._id, null, "id_report", null, 1);
			var participants = miscServices.filterArrayByDataname(angular.copy(report.participants), "user");	
			report.marks_from_teacher = miscServices.addDeformattedDatasToAWithBForArray(participants, marks_report, "assessed", "marks", "marks");	
			report.marks_from_teacher = miscServices.filterArrayByDataname(report.marks_from_teacher, "marks");
			report.marks_from_teacher = miscServices.merge2NestedArraysInArrays(report.marks_from_teacher);
			report.marks_to_teacher = miscServices.addDeformattedDatasToAWithBForArray(participants, marks_report, "assessor", "marks", "marks");
			report.marks_to_teacher = miscServices.filterArrayByDataname(report.marks_to_teacher, "marks");
			report.marks_to_teacher = miscServices.merge2NestedArraysInArrays(report.marks_to_teacher);
			report.comments_from_teacher = miscServices.addDeformattedDatasToAWithBForArray(participants, comments_report, "assessed", "comment");
			report.comments_from_teacher = miscServices.filterArrayByDataname(report.comments_from_teacher, "comment");
			report.comments_from_teacher = miscServices.merge2NestedArraysInArrays(report.comments_from_teacher);
			report.comments_to_teacher = miscServices.addDeformattedDatasToAWithBForArray(participants, comments_report, "assessor", "comment");
			report.comments_to_teacher = miscServices.filterArrayByDataname(report.comments_to_teacher, "comment");
			report.comments_to_teacher = miscServices.merge2NestedArraysInArrays(report.comments_to_teacher);

			report.schedules_datas = miscServices.filterArrayByCriterias(schedules, report._id, "", "id_report")[0];

		    var messages = [data_0.message, data_1.message, data_2.message, data_3.message, data_4.message, data_5.message, data_6.message];
		    report.start_time = new Date(report.start_time);
		    report.end_time = new Date(report.end_time);
		    var results = {};
		    results.messages = messages;
		    results.report = report;
		    if(data_0.success && data_1.success && data_2.success && data_3.success && data_4.success && data_5.success && data_6.success){results.success = true;}
		    else{results.success = false;}

		    return results;
		};

		factoryReports.getReport = function(report)
		{
			var deferred = $q.defer();

			$q.all([
	            factoryReports.getAllReports()
       		]).then(function(res){
        		var data = {};
      			data.success = res[0].data.success;
        		data.message = res[0].data.message;
	       		for (var i=0; i < res[0].data.reports.length; i++)
				{
					if(res[0].data.reports[i]._id == report._id)
					{       		
						data.report = res[0].data.reports[i];
						deferred.resolve(data);
					}
				}
			});

       		return deferred.promise;
		}

		factoryReports.getReportByOffer = function(id_offer, matrix_reinit)
		{
			var deferred = $q.defer();

			$q.all([
	            factoryReports.getAllReports(matrix_reinit)
       		]).then(function(res){
					var data = {};
	      			data.success = res[0].data.success;
	        		data.message = res[0].data.message;
		       		for (var i=0; i < res[0].data.reports.length; i++)
					{
						if(res[0].data.reports[i].offer._id == id_offer)
						{       		
							data.report = res[0].data.reports[i];
							deferred.resolve(data);
						}
					}
					deferred.resolve(data);
				});

	       	return deferred.promise;
		};

		function formatReport(report)
		{
			delete report['request'];
			delete report['marks_from_teacher'];
			delete report['marks_to_teacher'];
			delete report['comments_from_teacher'];
			delete report['comments_to_teacher'];
			delete report['schedules'];
			report = miscServices.formatData(report, "offer");
			report = miscServices.formatData(report, "teacher");
			report.participants = miscServices.formatArray(report.participants, "user");
			if(report.status != "New"){report.schedules_datas = miscServices.formatArray(report.schedules_datas, "topic");}

		    return report;
		};

		factoryReports.updateReport = function(report)
		{	
			var report = formatReport(report);
			return $http.post('/api/updateReport', report)
				.success(function(res){
					return res;
				});		
		};

		return factoryReports;
	}

);