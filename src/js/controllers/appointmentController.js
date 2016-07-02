// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("appointmentController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	userServices.query_basicinfo().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.user = data.Result.BaseInfo;
		} else {
			errorServices.autoHide(data.message);
		}
	});
})