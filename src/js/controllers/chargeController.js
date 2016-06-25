angular.module("Love").controller("chargeController", function($scope, $routeParams, userServices, loveServices, errorServices, toastServices, localStorageService, config) {

    toastServices.show();
    loveServices.query_vips().then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.vips = data.Result.VipPrices;
            $scope.vips.vip = $scope.vips[0].vip_price_id;
        } else {
            errorServices.autoHide(data.message);
        }
    })



    $scope.step = 1;
    $scope.show_step = function(step) {
        $scope.step = step;
    }

    $scope.change_vips = function(vip) {
        $scope.vips.vip = vip;
    }
    $scope.change_pays = function(pay) {
        $scope.pays.pay = pay;
    }
    $scope.pays = {
        pay: '微信支付'
    };



})