// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("paymentController", function($scope, $rootScope, $routeParams, $location, $timeout, weixinServices, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		money: $routeParams.money,
		pay_type: "1"
	};
	$scope.active = function(payment) {
		$scope.input.pay_type = payment;
	};
	$scope.pay = function() {
		var payment = {
			pay_type: $scope.input.pay_type,
			vip_price_id: JSON.parse($routeParams.state || "{}").id || $routeParams.id,
			trysted_user_id: JSON.parse($routeParams.state || "{}").id || $routeParams.id,
			code: $routeParams.code
		}
		$routeParams.type == "charge" && $scope.input.pay_type == '1' && $scope.charge_by_balance(payment);
		$routeParams.type == "charge" && $scope.input.pay_type == '2' && $scope.charge_by_weixin(payment);
		$routeParams.type != "charge" && $scope.input.pay_type == '1' && $scope.yue_by_balance(payment);
		$routeParams.type != "charge" && $scope.input.pay_type == '2' && $scope.yue_by_weixin(payment);
	};
	// 充值
	$scope.charge_by_weixin = function(payment) {
		toastServices.show();
		userServices.charge(payment).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				// errorServices.autoHide(data.message);
				weixinServices.pay(data);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.charge_by_balance = function(payment) {
		toastServices.show();
		userServices.charge(payment).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$location.path("ta").replace()
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	};
	// 约会
	$scope.yue_by_weixin = function(payment) {
		toastServices.show();
		userServices.yue_ta(payment).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				// errorServices.autoHide(data.message);
				weixinServices.pay(data);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.yue_by_balance = function(payment) {
		toastServices.show();
		userServices.yue_ta(payment).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$location.path("ta").replace()
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})