// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("signinController", function($scope, $routeParams, $timeout, $location, weixinServices, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.uid = $routeParams.uid;
    $scope.input = {
        telephone: "",
        password: ""
    };
    $scope.clear = function() {
        $scope.input.password = "";
    }
    $scope.ajaxForm = function() {
        toastServices.show();
        userServices.rsa_key().then(function(data) {
            var crypt = new JSEncrypt(),
                private_key = data;
            crypt.setPrivateKey(private_key);
            var crypted_str = crypt.encrypt($scope.input.password);
            $scope.input.password = crypted_str;
        }).then(function(data) {
            userServices.signin({
                telephone: $scope.input.telephone,
                password: $scope.input.password,
                uid: $routeParams.uid
            }).then(function(data) {
                toastServices.hide();
                if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                    errorServices.autoHide(data.message);
                    $scope.input.password = "";
                    localStorageService.set("token", data.token);
                    $timeout(function() {
                        $location.path('ta').search("uid", null).replace()
                    }, 2000)
                } else {
                    $scope.input.password = "";
                    errorServices.autoHide(data.message)
                }
            })
        })
    }
    $scope.weixinLogin = function() {
        weixinServices.login();
    };
})