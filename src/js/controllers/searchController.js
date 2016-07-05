// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("searchController", function($scope, $routeParams, loveServices, errorServices, toastServices, localStorageService, config) {
    $scope.loves = [];
    $scope.page = {
        pn: 1,
        page_size: 5,
        intelligent_type: "1",
        message: "点击加载更多",
        heights: $routeParams.heights,
        ages: $routeParams.ages,
        incomes: $routeParams.incomes,
        edus: $routeParams.edus,
        merrys: $routeParams.merrys,
        ages_start: $routeParams.age_from,
        ages_end: $routeParams.age_to,
        height_start: $routeParams.height_from,
        height_end: $routeParams.height_from,
    }
    $scope.get_tag = function(tag) {
        if (tag == "") {
            return [];
        }
        return tag.split("#");
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "正在加载...";
        loveServices.query_loves($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.loves = $scope.loves.concat(data.Result.Users.list);
                $scope.no_more = $scope.loves.length == data.Result.Users.totalRow ? true : false;
            } else {
                errorServices.autoHide("服务器错误");
            }
            if ($scope.no_more) {
                $scope.page.message = "加载完成，共加载" + $scope.loves.length + "条记录";
            }
            $scope.page.pn++;
        })

    }
    $scope.loadMore();
    $scope.smart_search = function() {
        $scope.loves = [];
        $scope.page.intelligent_type == "1" ? $scope.page.intelligent_type = "2" : $scope.page.intelligent_type = "1";
        var type = $scope.page.intelligent_type
        $scope.page = {
            pn: 1,
            page_size: 5,
            intelligent_type: type,
            message: "点击加载更多",
            heights: $routeParams.heights,
            ages: $routeParams.ages,
            incomes: $routeParams.incomes,
            edus: $routeParams.edus,
            merrys: $routeParams.merrys,
            height_intelligent: "",
            ages_start: $routeParams.age_from,
            ages_end: $routeParams.age_to,
            height_start: $routeParams.height_from,
            height_end: $routeParams.height_from,
        }
        $scope.no_more = false;
        $scope.loadMore();
    }
})