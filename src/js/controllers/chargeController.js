angular.module("Love").controller("chargeController", function($scope, errorServices, toastServices, localStorageService, config) {
    console.log("dd")
    $scope.step = 1;
    $scope.show_step = function(step) {
        $scope.step = step;
    }

    $scope.charges = [{
        name: "1个月VIP",
        money: "X元",
        select: false
    }, {
        name: "3个月VIP",
        money: "X元",
        select: false
    }, {
        name: "4个月VIP",
        money: "X元",
        select: false
    }, {
        name: "12个月VIP",
        money: "X元",
        select: false
    }];
    $scope.select = function(charge) {
        charge.select = !charge.select;
    }
    $scope.number = "2400";
    
})