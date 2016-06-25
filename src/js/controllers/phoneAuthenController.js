// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("phoneAuthenController", function($scope, $timeout, $rootScope, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    $scope.ajaxForm = function() {
        toastServices.show();
        userServices.phone_authen({
            telephone: $scope.input.telephone,
            tel_code: $scope.input.smscode,
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                errorServices.autoHide(data.message);
                $timeout(function() {
                    $rootScope.back();
                }, 2000)
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    // 验证码
    $scope.countdown = {
        // count: "5",
        message: "获取验证码",
    }
    $scope.countdown.callback = function() {
        toastServices.show();
        userServices.get_smscode({
            telephone: $scope.input.telephone
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                errorServices.autoHide(data.message)
            } else {
                $scope.countdown.reset = true;
                // $scope.modal.status = 3;
                errorServices.autoHide(data.message);
            }
        })
    }

    $scope.modal = {
        status: 0
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