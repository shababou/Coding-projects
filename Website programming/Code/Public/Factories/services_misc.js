angular.module("app").service
(
	'miscServices',
	function($rootScope)
	{
		this.isObjectInArray = function(A, object, dataname_1, dataname_2)
		{		
			var existance = {};	
			for (var i=0; i < A.length; i++)
			{
				if(dataname_1 && !dataname_2)
				{
					if(A[i][dataname_1] == object[dataname_1])
					{
						existance.result = true;
						existance.index = i;
						return existance;
					}
				}
				else if(dataname_1 && dataname_2)
				{
					if(A[i][dataname_1][dataname_2] == object[dataname_1][dataname_2])
					{
						existance.result = true;
						existance.index = i;
						return existance;
					}
				}
				else
				{
					if(A[i] == object)
					{
						existance.result = true;
						existance.index = i;
						return existance;
					}
				}
			};
			existance.result = false;
			return existance;
		};

		this.areObjectsFromArrayAInArrayB = function(A, B, dataname)
		{
			for (var i=0; i < A.length; i++)
			{
				for (var j=0; j < B.length; j++)
				{
					if(B[j][dataname] == A[i][dataname]){return true;}
				};
			}
			return false;
		};

		this.interectionArrayAArrayB = function(A, B, dataname_A, dataname_B)
		{
			var inter_array = [];
			for (var i=0; i < A.length; i++)
			{
				for (var j=0; j < B.length; j++)
				{
					if(B[j][dataname_B] == A[i][dataname_A])
					{
						inter_array.push(B[j]);
					}
				};
			}
			return inter_array;
		};

		this.removeObjectsInArray = function(A, objects, dataname)
		{
			for(j = 0; j < objects.length; j++)
			{
				for (var i=0; i < A.length; i++)
				{
					if(A[i][dataname] == objects[j][dataname]){delete A.splice(i, 1);}
				};
			}
			return A;
		};

		this.objectByCriteriaFromArray = function(A, criteria, dataname_1, dataname_2, deg_object)
		{	
			for (var i=0; i < A.length; i++)
			{
				if(!dataname_2 && A[i][dataname_1] == criteria){return A[i];}
				if(dataname_2 && A[i][dataname_1][dataname_2] == criteria)
				{
					if(deg_object == 1){return A[i];}
					else{return A[i][dataname_1];}
				}
			};
		};

		this.filterArrayByCriterias = function(A, criteria_1, criteria_2, dataname_1, dataname_2, deg_object)
		{	
			var arrayFiltered = [];
			for (var i=0; i < A.length; i++)
			{
				if(!dataname_2 && ( (A[i][dataname_1] == criteria_1) || (A[i][dataname_1] == criteria_2) ))
				{
					arrayFiltered.push(A[i]);
				}
				if(dataname_2 && ( (A[i][dataname_1][dataname_2] == criteria_1) || (A[i][dataname_1][dataname_2] == criteria_2) ))
				{
					if(deg_object && (deg_object == 1)){arrayFiltered.push(A[i]);}
					else{arrayFiltered.push(A[i][dataname_1]);}					
				}
			};
			return arrayFiltered;
		};

		this.filterArrayByDataname = function(A, dataname_1, dataname_2)
		{	
			var arrayFiltered = [];
			for (var i=0; i < A.length; i++)
			{
				arrayFiltered.push(this.filterByDataname(A[i], dataname_1, dataname_2));
			}
			return arrayFiltered;
		};

		this.filterByDataname = function(A, dataname_1, dataname_2)
		{	
			if(!dataname_2){return A[dataname_1];}
			else{return A[dataname_1][dataname_2];}
		};


		this.merge2NestedArraysInArrays = function(A, dataname)
		{	
			var mergedNestedArrays = [];
			for (var i=0; i < A.length; i++)
			{
				for (var j=0; j < A[i].length; j++)
				{
					if(!this.isObjectInArray(mergedNestedArrays, A[i][j], dataname).result){mergedNestedArrays.push(A[i][j]);}
				};
			};
			return mergedNestedArrays;
		};

		this.mergeArrays = function(A, B, dataname)
		{	
			var mergedArray = A;
			for (var i=0; i < B.length; i++)
			{
				if(dataname)
				{
					if(!this.isObjectInArray(A, B[i], dataname).result){mergedArray.push(B[i]);}
				}
				else
				{
					if(!this.isObjectInArray(A, B[i]).result){mergedArray.push(B[i]);}
				}				
			};
			return mergedArray;
		};

		this.removeDuplicatesInArray = function(A)
		{	
			var array_without_duplicates = [];
			for (var i=0; i < A.length; i++)
			{
				if(!this.isObjectInArray(array_without_duplicates, A[i]).result){array_without_duplicates.push(A[i]);}			
			};
			return array_without_duplicates;
		};


		this.getKeyByValue = function(object, value)
		{
			for (var i=0; i < Object.keys(object).length; i++)
			{
				if(object[Object.keys(object)[i]] == value){return Object.keys(object)[i]}
			}
		};

		this.objectToString = function(object)
		{
			var string_data;
			string_data = '\"' + Object.keys(object)[0] + '\":\"' + object[Object.keys(object)[0]] + '\"';
			for (var i=1; i < Object.keys(object).length; i++)
			{
				string_data = string_data + ', ' + '"' + Object.keys(object)[i] + '\":\"' + object[Object.keys(object)[i]] + '\"';
			}
			string_data = "{" + string_data + "}";
			return string_data;
		};




		this.getNextDate = function()
		{
			var today_date = new Date();
			var next_date = new Date(today_date.getTime() + (24*60*60*1000));
			next_date = new Date(next_date.getFullYear(), next_date.getMonth(), next_date.getDate(), 20, 00);
			return next_date;
		};

		this.addHoursToDate = function(date_start, hours)
		{
			return new Date(date_start.setMinutes(date_start.getMinutes() + hours*60));
		};

		this.dateDiff = function(date1, date2)
		{
		    var diff = {}                           // Initialisation du retour
		    var tmp = date2 - date1;

		    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
		    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
		 
		    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
		    diff.min = tmp % 60;                    // Extraction du nombre de minutes
		 
		    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
		    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
		     
		    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
		    diff.day = tmp;
		    
			var minutes = 60*diff.hour + diff.min;
		    return minutes;
		}

		this.minutesToHours = function(minutes)
		{
			var hours = $rootScope.Math.trunc(minutes / 60);
  			var minutes = minutes % 60;
  			var time = hours + "h"+ minutes;
			return time;
		}

		this.roundNumber = function(number, precision)
		{
			var rounded_number = number * precision;        
			rounded_number = Math.round(rounded_number); 
			rounded_number = rounded_number / precision;  
			return rounded_number;
		}



		this.addDatanameAndParameterToAForArray = function(A, dataname, parameter)
		{
			for (var i=0; i < A.length; i++)
			{
				A[i] = this.addDatanameAndParameterToA(A[i], dataname, parameter);
			}
			return A;
		};

		this.addDatanameAndParameterToA = function(A, dataname, parameter)
		{
			A[dataname] = parameter;
			return A;
		}


		this.addDeformattedDatasToAWithBForArray = function(A, B, name_A, name_B, dataname)
		{
			for (var i=0; i < A.length; i++)
			{
				A[i] = this.addDeformattedDatasToAWithB(A[i], B, name_A, name_B);
			}
			return A;
		};

		this.addDeformattedDatasToAWithB = function(A, B, name_A, name_B, dataname)
		{
			var id_name_A = "id_"+name_A; 
			A[name_B] = [];
			var j = 0;

			for (var i=0; i < B.length; i++)
			{
				if(!dataname)
				{
					if(B[i][id_name_A] == A._id)
					{
						A[name_B][j] = B[i];
						j++;
					}
				}
				else
				{
					for (var Bi=0; Bi < B[i][dataname].length; Bi++)
					{
						if(B[i][dataname][Bi] == A._id)
						{
							A[name_B][j] = B[i][dataname][Bi];
							j++;
						}
					}
				}
			}

			return A;
		};


		this.addParameterForDatanameToAWithBForArray = function(A, B, dataname, parameter)
		{
			for (var i=0; i < A.length; i++)
			{
				A[i] = this.addParameterForDatanameToAWithB(A[i], B, dataname, parameter);
			}
			return A;
		};

		this.addParameterForDatanameToAWithB = function(A, B, dataname, parameter)
		{
			for (var i=0; i < B.length; i++)
			{
				if(B[i][dataname] == A[dataname])
				{
				    A[parameter] = B[i][parameter];
				}
			}
			return A;
		};





		this.deformatArray = function(A, B, dataname)
		{ 
			for (var i=0; i < A.length; i++)
			{
				A[i] = this.deformatData(A[i], B, dataname);
			}

			return A;
		};

		this.deformatData = function(A, B, dataname)
		{			    													
			var id_dataname = "id_"+dataname;

			for (var j=0; j < B.length; j++)
			{
				if(A[id_dataname] == B[j]._id)
				{
					A[dataname] = B[j];
					delete A[id_dataname];
					break;
				}
				else{A[dataname] = {_id:""};}
			}
			return A;
		};

// 



		
		this.formatArray = function(A, dataname)
		{
			for (var i=0; i < A.length; i++)
			{
				A[i] = this.formatData(A[i], dataname);
			};
			return A;
		};

		this.formatData = function(A, dataname)
		{
			var id_dataname = "id_"+ dataname;
			A[id_dataname] = A[dataname]._id;
			delete A[dataname];
			return A;
		};



		this.options_presence = [
			{
				visual_name:"OUI",
				logical_name:true
			},
			{
				visual_name:"NON",
				logical_name:false
			},
		];	

		this.options_people = [
			{
				visual_name:"Participant",
				logical_name:"Participant"
			},
			{
				visual_name:"Professeur",
				logical_name:"Teacher"
			},
		];

		this.types_offer = [
			{
				visual_name:"RDV",
				logical_name:"RDV"
			},
			{
				visual_name:"Chat",
				logical_name:"Chat"
			},
		];		
					
	}
);