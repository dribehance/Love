// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("paymentController", function($scope, $rootScope, $routeParams, $location, $timeout, weixinServices, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		money: $routeParams.money,
		pay_type: "2",
		type: $routeParams.type || ""
	};
	$scope.active = function(payment) {
		$scope.input.pay_type = payment;
	};
	$scope.pay = function() {
		var payment = {
			pay_type: $scope.input.pay_type,
			vip_price_id: $routeParams.id,
			trysted_user_id: $routeParams.id,
		}
		if (!localStorageService.get("token")) {
			$location.path("signin").replace();
			return;
		}
		$routeParams.type == "vip" && $scope.purchurse_vip(payment);
		$routeParams.type == "charge" && $scope.charge(payment);
		$routeParams.type == "meeting" && $scope.input.pay_type == '1' && $scope.yue_by_balance(payment);
		$routeParams.type == "meeting" && $scope.input.pay_type == '2' && $scope.yue_by_weixin(payment);
	};
	// 购买vip
	$scope.purchurse_vip = function(payment) {
		weixinServices.prepare_pay({
			redirect_uri: config.url + "/app/WeixinPayController/comfiyPayVip",
			token: localStorageService.get("token"),
			vip_price_id: $routeParams.id
		});
	};
	// 充值
	$scope.charge = function(payment) {
		weixinServices.prepare_pay({
			redirect_uri: config.url + "/app/WeixinPayController/chargeDeposit",
			token: localStorageService.get("token"),
			vip_price_id: $routeParams.id
		});
	};
	// 约会
	$scope.yue_by_weixin = function(payment) {
		weixinServices.prepare_pay({
			redirect_uri: config.url + "/app/WeixinPayController/payAddTryst",
			token: localStorageService.get("token"),
			trysted_user_id: $routeParams.id
		});
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