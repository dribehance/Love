angular.module("Love").controller("appointment2SureController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.meettings = [];
    $scope.page = {
        pn: 1,
        page_size: 5,
        message: "点击加载更多",
        yuehui_type: "2"
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "正在加载...";
        userServices.query_meetting($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.meettings = $scope.meettings.concat(data.Result.Trysts.list);
                $scope.no_more = $scope.meettings.length == data.Result.Trysts.totalRow ? true : false;
            } else {
                errorServices.autoHide("服务器错误");
            }
            if ($scope.no_more) {
                $scope.page.message = "加载完成，共加载" + $scope.meettings.length + "条记录";
            }
            $scope.page.pn++;
        })

    }
    $scope.loadMore();

    // 投诉信息
    toastServices.show();
    userServices.query_report_info().then(function(data) {
        toastServices.hide()
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.report_info = data.Result.Constant;
        } else {
            errorServices.autoHide(data.message);
        }
    })

    $scope.modal = {
        status: 0
    };
    $scope.complaint = "请联系官方客服，进行投诉维权";
    $scope.open_modal = function(report_meetting, type) {
        $scope.report_meetting = report_meetting;
        $scope.report_meetting_type = type;
        $scope.modal.status = 1;
        if ($scope.report_meetting_type == "agree") {
            $scope.meetting_title = "同意约会";
        }
        if ($scope.report_meetting_type == "reject") {
            $scope.meetting_title = "拒绝约会";
        }
    }
    $scope.reject = function() {
        toastServices.show();
        userServices.reject_meetting({
            tryst_id: $scope.report_meetting.tryst_id,
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.modal.status = 0;
                $scope.report_meetting = "";
                errorServices.autoHide(data.message);
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.agree = function() {
        toastServices.show();
        userServices.agree_meetting({
            tryst_id: $scope.report_meetting.tryst_id,
            complainted_user_id: $scope.report_meetting.trysted_user_id
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.modal.status = 0;
                $scope.report_meetting = "";
                errorServices.autoHide(data.message);
            } else {
                errorServices.autoHide(data.message);
            }
        })
    }
    $scope.cancel_modal = function() {
        $scope.modal.status = 0;
    }
    $scope.confirm_modal = function() {
        if ($scope.report_meetting_type == "agree") {
            $scope.meetting_title = "同意约会";
            $scope.agree();
        }
        if ($scope.report_meetting_type == "reject") {
            $scope.meetting_title = "拒绝约会";
            $scope.reject();
        }
    }
})