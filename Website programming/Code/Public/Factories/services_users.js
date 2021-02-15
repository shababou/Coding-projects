angular.module("app").service
(
	'usersServices',
	function(factoryCategories, factoryCriterias, factoryLevels, factoryTopics, miscServices)
	{
		this.computeUserStatistics = function(marks_user_brut, schedules_reports_brut, all_offers, all_requests)
		{
			var statistics = {};

			// var global_synthesis = 
			// {
			// 	criterias_datas:{
			// 		RDV:[],
			// 		Chat:[]
			// 	},
			// 	topics_datas:{
			// 		RDV:[],
			// 		Chat:[]
			// 	}
			// };
			var global_synthesis = 
			{
				categories:[]
			};
			var reports_seen = [];

			for (var i = 0; i < marks_user_brut.length; i++)
			{
				marks_user_brut[i].marks = miscServices.deformatArray(marks_user_brut[i].marks, factoryCriterias.allCriteriasSync(), "criteria"); 
			}	

			for (var i = 0; i < marks_user_brut.length; i++)
			{
				test_mark_chat = miscServices.isObjectInArray(all_offers, {_id:marks_user_brut[i].id_context}, "_id");
				var type_offer;
				if(test_mark_chat.result)
				{
					type_offer = "Chat";
					var parent_request = miscServices.objectByCriteriaFromArray(angular.copy(all_requests), all_offers[test_mark_chat.index].id_request, "_id", null, 1);
					var contents_request = parent_request.contents;
					var offer_contents_datas = miscServices.filterArrayByDataname(contents_request, "datas");
					offer_contents_datas = miscServices.merge2NestedArraysInArrays(offer_contents_datas, "contents");
					var offer_topics = miscServices.filterArrayByDataname(offer_contents_datas, "topic");
				}
				else
				{
					type_offer = "RDV";
					var report_already_seen = false;
					if(miscServices.isObjectInArray(reports_seen, marks_user_brut[i].id_context).result){report_already_seen = true;}
					else{reports_seen.push(marks_user_brut[i].id_context);}
					var schedules_categories = [];
					var schedules_report_brut = angular.copy(miscServices.filterArrayByCriterias(schedules_reports_brut, marks_user_brut[i].id_context, null, "id_report", null, 1)[0].schedules);
					schedules_report_brut = schedules_report_brut.slice(0, -1); // To not consider the "Autre" datas from Shedules, in this computation
					for (var j = 0; j < schedules_report_brut.length; j++)
					{
						schedules_report_brut[j] = miscServices.deformatData(schedules_report_brut[j], factoryTopics.allTopicsSync(), "topic"); 
					}		
					//var schedules_categories = this.computeSchedulesCategoriesByReport(schedules_report_brut, report_already_seen);
				}
				
				var marks_categories = this.computeMarksCategoriesByOffer(marks_user_brut[i].marks, schedules_report_brut, type_offer, report_already_seen);	
				//var offer_synthesis = this.mergeMarksSchedulesCategoriesTopicsByOffer(marks_categories, type_offer, schedules_categories, offer_topics, marks_user_brut[i].id_context);
				global_synthesis = this.mergeSynthesisOffers(global_synthesis, marks_categories, type_offer, marks_user_brut[i].id_context, report_already_seen);
			}
			// global_synthesis.criterias_datas["RDV"] = miscServices.deformatArray(global_synthesis.criterias_datas["RDV"], factoryCriterias.allCriteriasSync(), "criteria");
			// global_synthesis.topics_datas["RDV"] = miscServices.deformatArray(global_synthesis.topics_datas["RDV"], factoryTopics.allTopicsSync(), "topic"); 
			// global_synthesis.criterias_datas["Chat"] = miscServices.deformatArray(global_synthesis.criterias_datas["Chat"], factoryCriterias.allCriteriasSync(), "criteria");
			// global_synthesis.topics_datas["Chat"] = miscServices.deformatArray(global_synthesis.topics_datas["Chat"], factoryTopics.allTopicsSync(), "topic");
			statistics.global_synthesis = global_synthesis;
			statistics.global_average = this.computeGlobalWeightedAverage(global_synthesis.categories);



//console.log(schedules_categories);
//console.log(offer_synthesis);
console.log(global_synthesis);
console.log(statistics.global_average);
			return statistics;
		}

		this.computeMarksCategoriesByOffer = function(marks_criterias_brut, schedules_topics_brut, type_offer, report_already_seen)
		{	
			var marks_categories = {categories:[]};

			for (var i = 0; i < marks_criterias_brut.length; i++)
			{
				if(marks_criterias_brut[i].mark != "NA")
				{
					var category = factoryCategories.getCategoryByCriteria(marks_criterias_brut[i].criteria._id);
					
					var id_category_test = miscServices.isObjectInArray(marks_categories.categories, {id_category:category._id}, "id_category");
					if(id_category_test.result)
					{
						marks_categories.categories[id_category_test.index].criterias.push(marks_criterias_brut[i]);
						if(type_offer == "RDV")
						{
							var average_mark = this.updateAverageMark(marks_categories.categories[id_category_test.index].average_mark, marks_categories.categories[id_category_test.index].criterias.length, marks_criterias_brut[i].mark);
							marks_categories.categories[id_category_test.index].average_mark = average_mark;
						}
						else
						{
							var resume_marks = this.countMarksChat(marks_categories.categories[id_category_test.index].resume_marks, marks_criterias_brut[i].mark);
							marks_categories.categories[id_category_test.index].resume_marks = resume_marks;
						}
					}
					else
					{
						marks_categories.categories.push
						(
							{
								id_category:category._id,
								name:category.name,
								criterias:[marks_criterias_brut[i]],
								levels:[]
							}
						);
						if(type_offer == "RDV"){marks_categories.categories.slice(-1)[0].average_mark = marks_criterias_brut[i].mark;}
						else{marks_categories.categories.slice(-1)[0].resume_marks = this.countMarksChat({one:{count:0}, two:{count:0}, three:{count:0}}, marks_criterias_brut[i].mark);}
					}

					if(!report_already_seen)
					{
						var total_schedule_category = 0;
						var levels = [];
						for (var j = 0; j < schedules_topics_brut.length; j++)
						{
							if(factoryCategories.getCategoryByTopic(schedules_topics_brut[j].topic._id)._id == category._id)
							{
								level = factoryLevels.getLevelByTopic(schedules_topics_brut[j].topic._id);
								var id_level_test = miscServices.isObjectInArray(levels, {id_level:level._id}, "id_level");
								if(!id_level_test.result)
								{	
									levels.push({
										id_level:level._id,
										name:level.name,
										topics:[]
									});
									id_level_test.index = 0;
								}
								var id_topic_test = miscServices.isObjectInArray(levels[id_level_test.index].topics, {id_topic:schedules_topics_brut[j].topic._id}, "id_topic");
								if(!id_topic_test.result)
								{
									levels[id_level_test.index].topics.push({
										id_topic:schedules_topics_brut[j].topic._id,
										name:schedules_topics_brut[j].topic.name
									});
									if(type_offer == "RDV")
									{
										levels[id_level_test.index].topics.slice(-1)[0].average_mark = marks_categories.categories.slice(-1)[0].average_mark;
										levels[id_level_test.index].topics.slice(-1)[0].schedule = schedules_topics_brut[j].schedule;
									}
									else{levels[id_level_test.index].topics.slice(-1)[0].resume_marks = marks_categories.categories.slice(-1)[0].resume_marks;}
									total_schedule_category = total_schedule_category + schedules_topics_brut[j].schedule;
								}
							}
						}
						if(type_offer == "RDV"){marks_categories.categories.slice(-1)[0].total_schedule_category = total_schedule_category;}
						marks_categories.categories.slice(-1)[0].levels = levels;
					}
				}
			}

			return marks_categories;
		};

		this.countMarksChat = function(resume_marks, mark)
		{
			if(mark == 1){resume_marks.one.count ++;}
			else if(mark == 2){resume_marks.two.count ++;}
			else{resume_marks.three.count ++;}

			return resume_marks;
		}

		this.computeSchedulesCategoriesByReport = function(schedules_topics_brut)
		{	
			var schedules_categories = [];

			for (var i = 0; i < schedules_topics_brut.length; i++)
			{
				category = factoryCategories.getCategoryByTopic(schedules_topics_brut[i].topic._id);
				level = factoryLevels.getLevelByTopic(schedules_topics_brut[i].topic._id);

				var id_category_test = miscServices.isObjectInArray(schedules_categories, {id_category:category._id}, "id_category");		

				var total_schedule;
				if(id_category_test.result)
				{
					total_schedule = schedules_categories[id_category_test.index].total_schedule + schedules_topics_brut[i].schedule;
					schedules_categories[id_category_test.index].total_schedule = total_schedule;
				}
				else
				{
					total_schedule = schedules_topics_brut[i].schedule;
					schedules_categories.push
					(
						{
							id_category:category._id,
							name:category.name,
							levels:[{
								id_level:level._id,
								name:level.name,
								topics:[{
									id_topic:schedules_topics_brut[i].topic._id,
									name:schedules_topics_brut[i].topic.name,
									schedule:schedules_topics_brut[i].schedule
								}],
							}],
							total_schedule:total_schedule
						}
					);
					id_category_test.index = 0;
				}

				var id_level_test = miscServices.isObjectInArray(schedules_categories[id_category_test.index].levels, {id_level:level._id}, "id_level");
				if(id_level_test.result)
				{	var id_topic_test = miscServices.isObjectInArray(schedules_categories[id_category_test.index].levels[id_level_test.index].topics, {id_topic:schedules_topics_brut[i].topic._id}, "id_topic");
					if(!id_topic_test.result)
					{
						schedules_categories[id_category_test.index].levels[id_level_test.index].topics.push({
							id_topic:schedules_topics_brut[i].topic._id,
							name:schedules_topics_brut[i].topic.name,
							schedule:schedules_topics_brut[i].schedule
						});
					}
				}
				else
				{
					schedules_categories[id_category_test.index].levels.push({
						id_level:level._id,
						name:level.name,
						topics:[{
							id_topic:schedules_topics_brut[i].topic._id,
							name:schedules_topics_brut[i].topic.name,
							schedule:schedules_topics_brut[i].schedule
						}]
					});
				}
			}
						
			return schedules_categories;
		};

		this.mergeMarksSchedulesCategoriesTopicsByOffer = function(marks_categories, type_offer, schedules_categories, offer_topics, id_report)
		{
			var offer_synthesis = 
			{
				categories:[]
			};

			for (var i = 0; i < marks_categories.length; i++)
			{
				offer_synthesis.categories.push
				(
					{
						id_category:marks_categories[i].id_category,
						name:marks_categories[i].name,
						criterias:marks_categories[i].criterias,
						levels:[]	
					}
				);
				if(type_offer == "RDV")
				{
					//offer_synthesis.categories[i].total_schedule = 0;
					offer_synthesis.categories[i].average_mark = marks_categories[i].average_mark;
					if(schedules_categories)
					{
						var id_category_test = miscServices.isObjectInArray(schedules_categories.categories, {id_category:marks_categories[i].id_category}, "id_category");
						offer_synthesis.categories.slice(-1)[0].levels = schedules_categories.categories[id_category_test.index].levels;
						for (var j = 0; j < offer_synthesis.categories.slice(-1)[0].levels.length; j++)
						{
							if(id_category_test.result)
							{
								offer_synthesis.categories[id_category_test.index].topics_datas = schedules_categories[i].datas;
								offer_synthesis.categories[id_category_test.index].total_schedule = schedules_categories[i].total_schedule;
							}					
						}
					}
				}
				else
				{
					offer_synthesis.categories[i].resume_marks = marks_categories[i].resume_marks;
					var topics_datas = [];
					for (var j = 0; j < offer_topics.length; j++)
					{
						if(miscServices.isObjectInArray(offer_synthesis.categories, offer_topics[j], "_id"))
							topics_datas.push
							(
								{
									id_topic:offer_topics[j]._id,
									name_topic:offer_topics[j].name,
									resume_marks:marks_categories[i].resume_marks
								}
							)
					}
					offer_synthesis.categories[i].topics_datas = topics_datas;
				}
			}

			return offer_synthesis;
		}

		this.mergeSynthesisOffers = function(global_synthesis, offer_synthesis, type_offer, id_context, report_already_seen)
		{
			for (var i = 0; i < offer_synthesis.categories.length; i++)
			{
				var category_offer = offer_synthesis.categories[i];
					
				var id_category_test = miscServices.isObjectInArray(global_synthesis.categories, {id_category:category_offer.id_category}, "id_category");
				
				if(!id_category_test.result)
				{
					global_synthesis.categories.push({
						id_category:category_offer.id_category,
						name:category_offer.name,
						criterias:{Chat:[], RDV:[]},
						levels:[]
					});
					id_category_test.index = global_synthesis.categories.length - 1;
				}

				for (var j = 0; j < offer_synthesis.categories[i].criterias.length; j++)
				{
					var criteria_category_offer = offer_synthesis.categories[i].criterias[j];
					var id_criteria_test = miscServices.isObjectInArray(global_synthesis.categories[id_category_test.index].criterias[type_offer], {id_criteria:criteria_category_offer.criteria._id}, "id_criteria");
					if(id_criteria_test.result)
					{
						global_synthesis.categories[id_category_test.index].criterias[type_offer][id_criteria_test.index].contexts.push(id_context);
						if(type_offer == "RDV")
						{
							var average_mark = this.updateAverageMark(global_synthesis.categories[id_category_test.index].criterias[type_offer][id_criteria_test.index].average_mark, global_synthesis.categories[id_category_test.index].criterias[type_offer][id_criteria_test.index].contexts.length, criteria_category_offer.mark);
							global_synthesis.categories[id_category_test.index].criterias[type_offer][id_criteria_test.index].average_mark = average_mark;
							if(!report_already_seen){global_synthesis.categories[id_category_test.index].criterias[type_offer][id_criteria_test.index].total_schedule = global_synthesis.categories[id_category_test.index].criterias[type_offer][id_criteria_test.index].total_schedule + category_offer.total_schedule_category;}
						}
						else
						{
							var resume_marks = this.countMarksChat(global_synthesis.categories[id_category_test.index].criterias[type_offer][id_criteria_test.index].resume_marks, offer_synthesis.categories[i].resume_marks);
							global_synthesis.categories[id_category_test.index].criterias[type_offer][id_criteria_test.index].resume_marks = resume_marks;
						}
					}
					else
					{
						global_synthesis.categories[id_category_test.index].criterias[type_offer].push({
							id_criteria:criteria_category_offer.criteria._id,
							name:criteria_category_offer.criteria.name,
							contexts:[id_context]
						});
						id_criteria_test.index = global_synthesis.categories[id_category_test.index].criterias[type_offer].length - 1;
						if(type_offer == "RDV")
						{
							global_synthesis.categories[id_category_test.index].criterias[type_offer][id_criteria_test.index].average_mark = criteria_category_offer.mark;
							global_synthesis.categories[id_category_test.index].criterias[type_offer][id_criteria_test.index].total_schedule = category_offer.total_schedule_category;
						}
						else{global_synthesis.categories[id_category_test.index].criterias[type_offer][id_criteria_test.index].resume_marks = offer_synthesis.categories[i].resume_marks;}
					}
				}
				for (var j = 0; j < offer_synthesis.categories[i].levels.length; j++)
				{
					var level_category_offer = offer_synthesis.categories[i].levels[j];
					var id_level_test = miscServices.isObjectInArray(global_synthesis.categories[id_category_test.index].levels, {id_level:level_category_offer.id_level}, "id_level");
					if(id_level_test.result)
					{
						for (var k = 0; k < offer_synthesis.categories[i].levels[j].topics.length; k++)
						{
							var topic_level_offer = offer_synthesis.categories[i].levels[j].topics[k];
							var id_topic_test = miscServices.isObjectInArray(global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer], {id_topic:topic_level_offer.id_topic}, "id_topic");
							if(id_topic_test.result)
							{
								global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer][id_topic_test.index].contexts.push(id_context);
								if(type_offer == "RDV")
								{
									var average_mark = this.updateAverageMark(global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer][id_topic_test.index].average_mark, global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer][id_topic_test.index].contexts.length, topic_level_offer.average_mark);
									global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer][id_topic_test.index].average_mark = average_mark;
									if(!report_already_seen){global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer][id_topic_test.index].total_schedule = global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer][id_topic_test.index].total_schedule + topic_level_offer.schedule;}
								}
								else
								{
									var resume_marks = this.countMarksChat(global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer][id_topic_test.index].resume_marks, topic_level_offer.resume_marks);
									global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer][id_topic_test.index].resume_marks = resume_marks;
								}
							}
							else
							{
								global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer].push({
									id_topic:topic_level_offer.id_topic,
									name:topic_level_offer.name,
									contexts:[id_context]
								});
								id_topic_test.index = global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer].length - 1;
								if(type_offer == "RDV")
								{
									global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer][id_topic_test.index].average_mark = topic_level_offer.average_mark;
									global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer][id_topic_test.index].total_schedule = topic_level_offer.schedule;
								}
								else{global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer][id_topic_test.index].resume_marks = topic_level_offer.resume_marks;}
							}
						}
					}
					else
					{
						var topics = [];
						for (var k = 0; k < offer_synthesis.categories[i].levels[j].topics.length; k++)
						{
							topics.push({
								id_topic:offer_synthesis.categories[i].levels[j].topics[k].id_topic,
								name:offer_synthesis.categories[i].levels[j].topics[k].name,
								contexts:[id_context]
							});
							if(type_offer == "RDV")
							{
								topics[k].average_mark = offer_synthesis.categories[i].levels[j].topics[k].average_mark;
								topics[k].total_schedule = offer_synthesis.categories[i].levels[j].topics[k].schedule;
							}
							else{topics[k].resume_marks = offer_synthesis.categories[i].levels[j].topics[k].resume_marks;}
						}
						global_synthesis.categories[id_category_test.index].levels.push({
							id_level:level_category_offer.id_level,
							name:level_category_offer.name,
							topics:{Chat:[], RDV:[]}
						});
						id_level_test.index = global_synthesis.categories[id_category_test.index].levels.length - 1;
						global_synthesis.categories[id_category_test.index].levels[id_level_test.index].topics[type_offer] = topics;
					}
				}	
			}
	

			// for (var i = 0; i < offer_synthesis.categories.length; i++)
			// {
			// 	var offer_category = offer_synthesis.categories[i];

			// 	var id_category_test;
			// 	id_category_test = miscServices.isObjectInArray(global_synthesis.categories, {id_category:offer_category.id_category}, "id_category");

			// 	if(!id_category_test.result)
			// 	{
			// 		global_synthesis.categories.push({
			// 			id_category:offer_category.id_category,
			// 			name:offer_category.name,
			// 			criterias:{RDV:[], Chat:[]},
			// 			levels:[]
			// 		});
			// 		id_category_test.index = global_synthesis.categories.length - 1;
			// 	}

			// 	var criterias_offer = miscServices.filterArrayByCriterias(offer_category.criterias, offer_category.id_category, null, "id_category", null, 1);
			// 	for (var j = 0; j < criterias_offer.length; j++)
			// 	{
			// 		var criteria_offer = criterias_offer[j];

			// 		var id_criteria_test = miscServices.isObjectInArray(global_synthesis.categories[id_category_test.index].criterias[type_offer], criteria_offer, "id_criteria");
			// 		if(id_criteria_test.result)
			// 		{
			// 			if((type_offer == "Chat")||((type_offer == "RDV") && !report_already_seen)){global_synthesis.categories[id_category_test.index].criterias[type_offer][id_criteria_test.index].contexts.push(offer_synthesis.id_context);}
			// 			if(type_offer == "RDV")
			// 			{
			// 				var average_mark = this.updateAverageMark(global_synthesis.categories[id_category_test.index].criterias_offer[type_offer][id_criteria_test.index].average_mark, global_synthesis.categories[id_category_test.index].criterias_datas[type_offer][id_criteria_test.index].nb, criteria_datas.mark);
			// 				var total_schedule =global_synthesis.categories[id_category_test.index].criterias_datas[type_offer][id_criteria_test.index].total_schedule + criteria_datas.schedule;
			// 				global_synthesis.categories[id_category_test.index].criterias_datas[type_offer][id_criteria_test.index].average_mark = average_mark;
			// 				global_synthesis.categories[id_category_test.index].criterias_datas[type_offer][id_criteria_test.index].total_schedule = total_schedule;
			// 			}
			// 			else
			// 			{
			// 				var resume_marks = this.countMarksChat(global_synthesis.categories[id_category_test.index].criterias_datas[type_offer][id_criteria_test.index].resume_marks, criteria_datas.mark);
			// 				global_synthesis.categories[id_category_test.index].criterias_datas[type_offer][id_criteria_test.index].resume_marks = resume_marks;
			// 			}
			// 			global_synthesis.categories[id_category_test.index].criterias_datas[type_offer][id_criteria_test.index].nb = global_synthesis.categories[id_category_test.index].criterias_datas[type_offer][id_criteria_test.index].nb + 1;
			// 		}
			// 		else
			// 		{
			// 			global_synthesis.categories[id_category_test.index].criterias_datas[type_offer].push
			// 			(
			// 				{
			// 					id_criteria:criteria_datas.id_criteria,
			// 					nb:1
			// 				}
			// 			);
			// 			if(type_offer == "RDV")
			// 			{
			// 				global_synthesis.categories[id_category_test.index].criterias_datas[type_offer].slice(-1)[0].average_mark = criteria_datas.mark;
			// 				global_synthesis.categories[id_category_test.index].criterias_datas[type_offer].slice(-1)[0].total_schedule = offer_category.total_schedule;
			// 				global_synthesis.categories[id_category_test.index].criterias_datas[type_offer].slice(-1)[0].reports = [offer_synthesis.id_report];
			// 			}
			// 			else
			// 			{
			// 				var resume_marks = this.countMarksChat({one:0, two:0, three:0}, criteria_datas.mark);
			// 				global_synthesis.categories[id_category_test.index].criterias_datas[type_offer].slice(-1)[0].resume_marks = resume_marks;
			// 			}
			// 		}
			// 	}


			// 	var topics_datas = miscServices.filterArrayByCriterias(offer_category.topics_datas, offer_category.id_category, null, "id_category", null, 1);
			// 	for (var j = 0; j < topics_datas.length; j++)
			// 	{
			// 		var topic_datas = topics_datas[j];
			// 		var level_topic = factoryLevels.getLevelByTopics(topic_datas.id_topic);

			// 		var id_level_topic_test;
			// 		console.log(level_topic);
			// 		id_level_topic_test = miscServices.isObjectInArray(global_synthesis.categories[id_category_test.index].levels, {id_level:level_topic._id}, "id_level");

			// 		if(!id_level_topic_test.result)
			// 		{
			// 			global_synthesis.categories[id_category_test.index].levels.push({
			// 				id_level:level_topic._id,
			// 				name_level:level_topic.name,
			// 				topics_datas:{RDV:[], Chat:[]}
			// 			});
			// 			id_level_topic_test.index = 0;
			// 		}

			// 		var id_topic_test = miscServices.isObjectInArray(global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer], topic_datas, "id_topic");
			// 		if(id_topic_test.result)
			// 		{
			// 			if((type_offer == "RDV") && !report_already_seen){global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer][id_topic_test.index].reports.push(offer_synthesis.id_report);}	
			// 			if(type_offer == "RDV")
			// 			{
			// 				var total_schedule = global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer][id_topic_test.index].total_schedule + topic_datas.schedule;	
			// 				var average_mark = this.updateAverageMark(global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer][id_topic_test.index].average_mark, global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer][id_topic_test.index].nb, offer_category.average_mark);
			// 				global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer][id_topic_test.index].average_mark = average_mark;
			// 				global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer][id_topic_test.index].total_schedule = total_schedule;
			// 			}
			// 			else
			// 			{
			// 				console.log(global_synthesis);
			// 				var resume_marks = this.countMarksChat(global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer][id_topic_test.index].resume_marks, offer_category.resume_marks);
			// 				global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer][id_topic_test.index].resume_marks = resume_marks;
			// 			}
			// 			global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer].nb = global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer][id_topic_test.index].nb + 1;
			// 		}
			// 		else
			// 		{
			// 			global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer].push
			// 			(
			// 				{
			// 					id_topic:topic_datas.id_topic,
			// 					name_topic:topic_datas.name_topic,
			// 					nb:1
			// 				}
			// 			);
			// 			if(type_offer == "RDV")
			// 			{
			// 				global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer].slice(-1)[0].average_mark = offer_category.average_mark;
			// 				global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer].slice(-1)[0].total_schedule = topic_datas.schedule;
			// 				global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer].slice(-1)[0].reports = [offer_synthesis.id_report];
			// 			}
			// 			else
			// 			{
			// 				global_synthesis.categories[id_category_test.index].levels[id_level_topic_test.index].topics_datas[type_offer].slice(-1)[0].resume_marks = topic_datas.resume_marks;
			// 			}
			// 		}
			// 	}
			// }


				// for (var j = 0; j < offer_category.criterias_datas.length; j++)
				// {
				// 	var criteria_datas = offer_category.criterias_datas[j];

				// 	var id_criteria_test = miscServices.isObjectInArray(global_synthesis.criterias_datas[type_offer], criteria_datas, "id_criteria");
				// 	console.log(global_synthesis.criterias_datas[type_offer]);
				// 	console.log(criteria_datas);
				// 	if(id_criteria_test.result)
				// 	{
				// 		if((type_offer == "RDV") && !report_already_seen){global_synthesis.criterias_datas[type_offer][id_criteria_test.index].reports.push(offer_synthesis.id_report);}
				// 		if(type_offer == "RDV")
				// 		{
				// 			var average_mark = this.updateAverageMark(global_synthesis.criterias_datas[type_offer][id_criteria_test.index].average_mark, global_synthesis.criterias_datas[type_offer][id_criteria_test.index].nb, criteria_datas.mark);
				// 			var total_schedule = global_synthesis.criterias_datas[type_offer][id_criteria_test.index].total_schedule + criteria_datas.schedule;
				// 			global_synthesis.criterias_datas[type_offer][id_criteria_test.index].average_mark = average_mark;
				// 			global_synthesis.criterias_datas[type_offer][id_criteria_test.index].total_schedule = total_schedule;
				// 		}
				// 		else
				// 		{
				// 			var resume_marks = this.countMarksChat(global_synthesis.criterias_datas[type_offer][id_criteria_test.index].resume_marks, criteria_datas.mark);
				// 			global_synthesis.criterias_datas[type_offer][id_criteria_test.index].resume_marks = resume_marks;
				// 		}
				// 		global_synthesis.criterias_datas[type_offer][id_criteria_test.index].nb = parseFloat(global_synthesis.criterias_datas[type_offer][id_criteria_test.index].nb) + 1;
				// 	}
				// 	else
				// 	{
				// 		global_synthesis.criterias_datas[type_offer].push
				// 		(
				// 			{
				// 				id_criteria:criteria_datas.id_criteria,
				// 				nb:1
				// 			}
				// 		);
				// 		if(type_offer == "RDV")
				// 		{
				// 			global_synthesis.criterias_datas[type_offer].slice(-1)[0].average_mark = criteria_datas.mark;
				// 			global_synthesis.criterias_datas[type_offer].slice(-1)[0].total_schedule = offer_category.total_schedule;
				// 			global_synthesis.criterias_datas[type_offer].slice(-1)[0].reports = [offer_synthesis.id_report];
				// 		}
				// 		else
				// 		{
				// 			var resume_marks = this.countMarksChat({one:0, two:0, three:0}, criteria_datas.mark);
				// 			global_synthesis.criterias_datas[type_offer].slice(-1)[0].resume_marks = resume_marks;
				// 		}
				// 	}
				// }

				// for (var j = 0; j < offer_category.topics_datas.length; j++)
				// {
				// 	var topics_datas = offer_category.topics_datas[j];

				// 	var id_topic_test = miscServices.isObjectInArray(global_synthesis.topics_datas[type_offer], topics_datas, "id_topic");
				// 	if(id_topic_test.result)
				// 	{
				// 		if((type_offer == "RDV") && !report_already_seen){global_synthesis.topics_datas[type_offer][id_topic_test.index].reports.push(offer_synthesis.id_report);}	
				// 		if(type_offer == "RDV")
				// 		{
				// 			var total_schedule = global_synthesis.topics_datas[type_offer][id_topic_test.index].total_schedule + topics_datas.schedule;	
				// 			var average_mark = this.updateAverageMark(global_synthesis.topics_datas[type_offer][id_topic_test.index].average_mark, global_synthesis.topics_datas[type_offer][id_topic_test.index].nb, offer_category.average_mark);
				// 			global_synthesis.topics_datas[type_offer][id_topic_test.index].average_mark = average_mark;
				// 			global_synthesis.topics_datas[type_offer][id_topic_test.index].total_schedule = total_schedule;
				// 		}
				// 		else
				// 		{
				// 			var resume_marks = this.countMarksChat(global_synthesis.topics_datas[type_offer][id_topic_test.index].resume_marks, offer_category.resume_marks);
				// 			global_synthesis.topics_datas[type_offer][id_topic_test.index].resume_marks = resume_marks;
				// 		}
				// 		global_synthesis.topics_datas[type_offer][id_topic_test.index].nb = global_synthesis.topics_datas[type_offer][id_topic_test.index].nb + 1;
				// 	}
				// 	else
				// 	{
				// 		global_synthesis.topics_datas[type_offer].push
				// 		(
				// 			{
				// 				id_topic:topics_datas.id_topic,
				// 				nb:1
				// 			}
				// 		);
				// 		if(type_offer == "RDV")
				// 		{
				// 			global_synthesis.topics_datas[type_offer].slice(-1)[0].average_mark = offer_category.average_mark;
				// 			global_synthesis.topics_datas[type_offer].slice(-1)[0].total_schedule = topics_datas.schedule;
				// 			global_synthesis.topics_datas[type_offer].slice(-1)[0].reports = [offer_synthesis.id_report];
				// 		}
				// 		else
				// 		{
				// 			global_synthesis.topics_datas[type_offer].slice(-1)[0].resume_marks = topics_datas.resume_marks;
				// 		}
				// 	}
				// }
			

			return global_synthesis;	
		}





		this.updateAverageMark = function(previous_average, nb, new_data)
		{
			previous_average = parseFloat(previous_average);
			nb = parseFloat(nb);
			new_data = parseFloat(new_data);
			var new_average = ((previous_average * nb) + new_data) / (nb + 1);

			return new_average;
		}


		this.computeGlobalWeightedAverage = function(categories)
		{
			var global_weighted_average = 0;
			var num = 0;
			var den = 0;
			for (var i = 0; i < categories.length; i++)
			{											
				for (var j = 0; j < categories[i].levels.length; j++)
				{
					for (var k = 0; k < categories[i].levels[j].topics["RDV"].length; k++)
					{
						num = num + categories[i].levels[j].topics["RDV"][k].average_mark * categories[i].levels[j].topics["RDV"][k].contexts.length * categories[i].levels[j].topics["RDV"][k].total_schedule;
						den = den + categories[i].levels[j].topics["RDV"][k].contexts.length * categories[i].levels[j].topics["RDV"][k].total_schedule;
					}
				}
			}
			
			global_weighted_average = num / den;

			return global_weighted_average;
		}

		
	}
);