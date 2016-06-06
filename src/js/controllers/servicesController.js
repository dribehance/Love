// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("servicesController", function($scope, errorServices, toastServices, localStorageService, config) {
    console.log("dd")
    $scope.step = 1;
    $scope.show_step = function(step) {
        $scope.step = step;
    }
})