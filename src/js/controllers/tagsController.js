angular.module("Love").controller("tagsController", function($scope, $rootScope, $routeParams, $timeout, loveServices, errorServices, toastServices, localStorageService, config) {
	$scope.input={};
	$scope.select = function(tag) {
		tag.select = !tag.select;
	}
	if (!$routeParams.type) {
		$rootScope.back()
	}
	
	toastServices.show();
	loveServices.query_tags({
		type: $routeParams.type
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.tags = data.Result.InterestTalentInfos;
			$scope.tags.map(function(t) {
				var temp = {};
				t.name = t.field_name;
				t.select = false;
				return t;
			})
		} else {
			errorServices.autoHide(data.message);
		}
	});


	$scope.save = function() {
		toastServices.show()
		userServices.save({
			
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$timeout(function() {
					$rootScope.back();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})