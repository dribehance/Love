angular.module("Love").controller("appointment1SureController", function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.modal = {
        status: 0
    };
    $scope.info = "双方确认赴约后，保证金将退回";
    $scope.open_modal = function() {
        $scope.modal.status = 1;
    }
    $scope.cancel_modal = function() {
        $scope.modal.status = 0;
    }
    $scope.confirm_modal = function() {
        $scope.modal.status = 0;
    }
})