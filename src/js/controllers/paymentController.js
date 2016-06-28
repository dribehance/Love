// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("paymentController", function($scope, $rootScope, $routeParams, $timeout, weixinServices, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		money: $routeParams.money,
		pay_type: "1"
	};
	$scope.active = function(payment) {
		$scope.input.pay_type = payment;
	};
	// 充值
	$scope.charge = function() {
		toastServices.show();
		userServices.charge({
			pay_type: $scope.input.pay_type,
			vip_price_id: $routeParams.id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				// errorServices.autoHide(data.message);
				if ($scope.input.pay_type == '2') {
					$scope.payment = data;
					weixinServices.pay($scope.payment);
				} else {
					$timeout(function() {
						$rootScope.back();
					}, 2000)
				}
			} else {
				errorServices.autoHide(data.message);
			}
		})
	};
	// 约会
	$scope.yue_ta = function() {
		toastServices.show();
		userServices.yue_ta({
			pay_type: $scope.input.pay_type,
			trysted_user_id: $routeParams.id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				// errorServices.autoHide(data.message);
				if ($scope.input.pay_type == '2') {
					$scope.payment = data;
					weixinServices.pay($scope.payment);
				} else {
					$timeout(function() {
						$rootScope.back();
					}, 2000)
				}
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.pay = function() {
		if ($routeParams.type == 'charge') {
			$scope.charge();
			return;
		}
		$scope.yue_ta();
	}
})