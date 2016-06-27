// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("manualAuthenController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	// 投诉信息
	toastServices.show();
	userServices.query_report_info().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.report_info = data.Result.Constant;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})