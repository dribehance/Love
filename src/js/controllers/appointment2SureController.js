angular.module("Love").controller("appointment2SureController", function($scope, errorServices, toastServices, localStorageService, config) {
    $scope.modal = {
        status: 0
    };
    $scope.info="缴纳约会保证金，同意和咚起大起共同约会";
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