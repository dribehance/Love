angular.module("Love").controller("chargeController", function($scope, $routeParams, userServices, $location, loveServices, errorServices, toastServices, localStorageService, config) {
    $scope.is_vip = $routeParams.vip;
    var price_type = 2;
    if ($scope.is_vip != undefined) {
        price_type = 1;
    }
    toastServices.show();
    loveServices.query_vips({
        type: price_type
    }).then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.vips = data.Result.VipPrices;
            $scope.input.vip = $scope.vips[0];
        } else {
            errorServices.autoHide(data.message);
        }
    })

    $scope.confirm = function() {
        var type = 'charge';
        if ($routeParams.vip == "1") {
            errorServices.autoHide("您已经是VIP，无需再充值");
            return;
        }
        if ($routeParams.vip == "0") {
            type = 'vip';
        }
        $location.path("payment").search({
            id: $scope.input.vip.vip_price_id,
            money: $scope.input.vip.price,
            type: type
        })
    }

    $scope.step = 1;
    $scope.input = {};
    $scope.show_step = function(step) {
        $scope.step = step;
    }
    $scope.change_vips = function(vip) {
        $scope.input.vip = vip;
    }
})