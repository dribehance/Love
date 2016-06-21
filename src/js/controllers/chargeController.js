angular.module("Love").controller("chargeController", function($scope, $routeParams, errorServices, toastServices, localStorageService, config) {
    console.log("dd")

    $scope.step = 1;
    $scope.show_step = function(step) {
        $scope.step = step;
    }

    $scope.change_vips = function(vip){
        $scope.vips.vip=vip;
    }    
    $scope.vips = {
        vip:'1个月VIP'
    };

    $scope.change_pays = function(pay){
        $scope.pays.pay=pay;
    }    
    $scope.pays = {
        pay:'微信支付'
    };




    
})