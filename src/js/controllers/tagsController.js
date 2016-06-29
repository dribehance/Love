angular.module("Love").controller("tagsController", function($scope, $rootScope, $routeParams, $timeout, userServices, loveServices, errorServices, toastServices, localStorageService, config) {

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
		var info = {},
			params = $scope.tags.filter(function(t) {
				return t.select
			}).map(function(tag) {
				return tag.name
			}).join("#")
		if ($routeParams.type == '1') {
			info.taste = params;
		}
		if ($routeParams.type == '2') {
			info.talent_skill = params;
		}
		toastServices.show();
		userServices.save_userinfo_1(info).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$rootScope.back();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})