// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("signinController", function($scope,userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	userServices.signin({
		telephone:$scope.input.telephone,
		password:$scope.input.password
	}).then(function(data){
		console.log(data);
	})
})