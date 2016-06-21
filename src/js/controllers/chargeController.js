angular.module("Love").controller("chargeController", function($scope, errorServices, toastServices, localStorageService, config) {
    console.log("dd")

    $scope.step = 1;
    $scope.show_step = function(step) {
        $scope.step = step;
    }

    $scope.vips = [{
        name: [
            "1个月VIP",
            "3个月VIP",
            "4个月VIP",
            "12个月VIP",
        ]
        money: "X元",
        month: [
            "1",
            "3",
            "4",
            "12"
        ]
    }, {
        name: "3个月VIP",
        money: "X元",
        month: "3"
    }, {
        name: "4个月VIP",
        money: "X元",
        month: "4"

    }, {
        name: "12个月VIP",
        money: "X元",
        month: "12"
    }];
    $scope.select = function(vip) {
        vips.month = vip.month;
    }

    $scope.number = "2400";
    $scope.wechat_pays = [{
        select: false
    }];
    $scope.select = function(wechat_pay) {
        wechat_pay.select = !wechat_pay.select;
    }
    $scope.pays = [{
        select: false
    }];
    $scope.select = function(pay) {
        pay.select = !pay.select;
    }
})