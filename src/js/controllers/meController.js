// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("meController", function($scope, $location, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.modal = {
        status: 0
    };
    $scope.open_modal = function() {
        $scope.modal.status = 1;
    }
    $scope.cancel_modal = function() {
        $scope.modal.status = 0;
    }
    $scope.confirm_modal = function() {
        $scope.modal.status = 0;
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
    $scope.preview_image = function(images) {
        $scope.preview_images = images;
        $scope.preview = "preview"
    }
    $scope.close_preview = function() {
        $scope.preview = ""
    }
    $scope.get_images = function(images) {
        if (!images) {
            return [];
        }
        return images.split("#");
    }
})