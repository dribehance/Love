// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("authenController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	userServices.query_userinfo({
		type: '1'
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.user = data.Result.UserInfo;
		} else {
			errorServices.autoHide(data.message);
		}
	});
})