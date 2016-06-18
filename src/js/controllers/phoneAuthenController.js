// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("phoneAuthenController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.modal = {
		status:0
	};
	$scope.open_modal = function() {
        $scope.modal.status = 3;
    }
    $scope.cancel_modal = function() {
        $scope.modal.status = 0;
    }
    $scope.confirm_modal = function() {
        $scope.modal.status = 0;
    }
})