// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("showController", function($scope, $rootScope, $timeout, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	toastServices.show();
	userServices.query_userinfo().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.input.user_show = data.Result.UserInfo.heart;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.save_userinfo_1({
			heart: $scope.input.user_show
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