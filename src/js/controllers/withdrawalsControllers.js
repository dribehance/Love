angular.module("Love").controller("withdrawalsController", function($scope, $rootScope, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {}
    $scope.ajaxForm = function() {
        toastServices.show()
        userServices.withdraw({
            draw_money: $scope.input.draw_money
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

        });
    }

    toastServices.show();
    userServices.query_basicinfo().then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.user = data.Result.BaseInfo;
        } else {
            errorServices.autoHide(data.message);
        }
    });
})