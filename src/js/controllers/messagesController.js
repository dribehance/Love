angular.module("Love").controller("messagesController", function($scope, $location, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.news = [];
    
    $scope.page = {
        pn: 1,
        page_size: 5,
        message: "点击加载更多"
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "正在加载...";
        userServices.query_messages($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.news = $scope.news.concat(data.Result.CollectUsers.list);
                $scope.no_more = $scope.news.length == data.Result.CollectUsers.totalRow ? true : false;
            } else {
                errorServices.autoHide("服务器错误");
            }
            if ($scope.no_more) {
                $scope.page.message = "加载完成，共加载" + $scope.news.length + "条记录";
            }
            $scope.page.pn++;
        })

    }
    $scope.loadMore();

    userServices.query_basicinfo().then(function(data) {

        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.user = data.Result.BaseInfo;
        } else {
            errorServices.autoHide(data.message);
        }
    });

    //收件箱    
    $scope.modal = {}
    
    $scope.go = function(id) {
        if ($scope.user.is_vip == '1') {
            $location.path("chat").search({
                id: id
            })
        } else {

            $scope.modal.status = 1

        }

    };

    $scope.confirm_modal = function() {
        $location.path("charge").search({

        })
    }
    $scope.cancel_modal = function() {
        $scope.modal.status = 0
    }
})