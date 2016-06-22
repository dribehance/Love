// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("signinController", function($scope,userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		signin_telephone:"",
		signin_password:"",
		signin_code:"",
		signup_telephone:"",
		signup_password:"",
		signup_code:"",
		signup_referee:"",
	};
	userServices.signin({
		telephone:$scope.input.signin_telephone,
		password:$scope.input.signin_password,
		code:$scope.input.signin_code
	}).then(function(data){
		console.log(data);
	})
})