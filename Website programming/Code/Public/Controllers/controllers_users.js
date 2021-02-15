angular.module("app").controller
(
	"ctrlProfile",
	function($rootScope, $scope, $timeout, $routeParams, factoryUsers, factoryLevels, factoryTopics, networkServices, miscServices)
	{	
		$scope.controller_on = true;

		$scope.Math = window.Math;
		$scope.options_people = miscServices.options_people;
		$scope.types_offer = miscServices.types_offer;
		$scope.is_ME = false;

		if($rootScope.is_logged)
		{
			$scope.setProfile = function()
			{
				factoryUsers.getUser({_id:$routeParams._id})
					.then(function(promise){
						if(promise.success)
						{
							if($routeParams._id == $rootScope.ME._id)
							{
								$scope.profile_Ctrl = $rootScope.ME;
								$scope.is_ME = true;								
							}
							else{$scope.profile_Ctrl = promise.user;}

							$scope.selection_network = $scope.options_people[0];

							$scope.profile_OK = true;
						}
						else{console.log(promise.message);}					
					});
			}
		};


		$scope.setMatrixSkills = function(selected_category)
		{
			$scope.levels_names = factoryLevels.getAllUniquesLevelsNamesByCategory(selected_category.levels);
			var levels_topics = miscServices.merge2NestedArraysInArrays(miscServices.filterArrayByDataname(selected_category.levels, "topics"));
			$scope.topics_names = factoryTopics.getAllUniquesTopicsNames(levels_topics);
		};


		$rootScope.$on
		(
			'diffuseNotifRT',
			function(event, RT_content)
			{
				if($scope.controller_on)
				{
					console.log("pulse users");
					//$rootScope.setME(true);
					$timeout(function(){
						$scope.setProfile();
						$rootScope.$broadcast('broadcastNetworkUpdated');
					}, 1000);
				}
			}
		);	

		$scope.$on('$routeChangeStart', function(event){
			$scope.controller_on = false;
		});
	}
);

//ROLE: 
angular.module("app").controller
(
	"setupUser",
	function($rootScope, $scope, $timeout, factoryAuthUser, factoryUsers, factoryFiles)
	{	
		$scope.password_changed = false;

		$scope.updatePhoto = function()
		{
			$scope.loading_photo = true;
			factoryFiles.uploadFile(event.target.files[0], $scope.profile_Ctrl, "Photo_user")
				.then(function(promise){
					if(promise.data.success)
					{
						var actual_date = (new Date()).toString();
						$scope.profile_Ctrl.src_photo = promise.data.src_photo + "?cb=" + actual_date;
						//$rootScope.ME.src_photo = $scope.profile_Ctrl.src_photo;
						$scope.loading_photo = false;		
					}
				});
		}

		$scope.updateProfile = function()
		{
			var skills = [];
			$(".skill:checked").each
			(
				function(index)
				{
					skills.push({id_skill:$(this).val()});
				}
			);
			$scope.profile_Ctrl.skills = skills;

			factoryUsers.updateME($scope.profile_Ctrl)
				.then(function(promise){
					if(promise.data.success)
					{
						if($scope.password_changed){factoryAuthUser.logout(); window.location.reload();}
						else{window.location.reload();}
					}
					else{console.log(promise.data.message);}
				});
		}		
	}
);


angular.module("app").controller
(
	"ctrlSkillI",
	function($scope, $timeout, miscServices)
	{	
		$scope.initSkillI = function(skill_i, skills)
		{
			if(miscServices.isObjectInArray(skills, {id_skill:skill_i}, "id_skill").result){$scope.skill_OK = true;}
			else{$scope.skill_OK;}
		};

		$scope.updateSkillI = function()
		{
			$scope.skill_OK = !$scope.skill_OK;						
		};
	}
);


