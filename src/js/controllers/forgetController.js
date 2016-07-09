// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("forgetController", function($scope, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	// 验证码
	$scope.countdown = {
		// count: "5",
		message: "获取验证码",
	}
	$scope.countdown.callback = function() {
		toastServices.show();
		userServices.get_smscode({
			telephone: $scope.input.telephone
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message)
			} else {
				$scope.countdown.reset = true;
				// $scope.modal.status = 3;
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.rsa_key().then(function(data) {
			var crypt = new JSEncrypt(),
				private_key = data;
			crypt.setPrivateKey(private_key);
			var crypted_str = crypt.encrypt($scope.input.password);
			$scope.input.password = crypted_str;
		}).then(function(data) {
			userServices.forget({
				telephone: $scope.input.telephone,
				password: $scope.input.password,
				tel_code: $scope.input.sms_code,
			}).then(function(data) {
				toastServices.hide();
				if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
					errorServices.autoHide(data.message);
					$scope.input.password = "";
					localStorageService.set("token", data.token);
					$timeout(function() {
						$location.path('signin').search("uid", null).replace()
					}, 2000)
				} else {
					errorServices.autoHide(data.message)
				}
			})
		})
	}
})