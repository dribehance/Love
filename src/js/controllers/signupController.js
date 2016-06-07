// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("signupController", function($scope, errorServices, toastServices, localStorageService, config) {
	console.log("dd")
	$scope.step=1;
	$scope.show_step=function(step){
		$scope.step=step;
	}
	$scope.modal = {
		status:0
	};
	$scope.open_modal = function() {
		$scope.modal.status =1;
	}
	$scope.cancel_modal = function() {
        $scope.modal.status =0;
	}

})