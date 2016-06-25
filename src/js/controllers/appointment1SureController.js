angular.module("Love").controller("appointment1SureController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.mettings = [];
    $scope.page = {
        pn: 1,
        page_size: 1,
        message: "点击加载更多",
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "正在加载...";
        userServices.query_metting($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.mettings = $scope.mettings.concat(data.result.list);
                $scope.no_more = $scope.mettings.length == data.result.total_result.totalRow ? true : false;
            } else {
                errorServices.autoHide("服务器错误");
            }
            if ($scope.no_more) {
                $scope.page.message = "没有了";
            }
            $scope.page.pn++;
        })

    }
    $scope.loadMore();


    $scope.modal = {
        status: 0
    };

    $scope.info = "双方确认赴约后，保证金将退回";
    $scope.complaint = "请联系官方客服，进行投诉维权";

    $scope.open_overlay = function() {
        $scope.modal.status = 1;
    }
    $scope.open_show = function() {
        $scope.modal.status = 2;
    }
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