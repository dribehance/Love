// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("searchConditionalController", function($scope, $rootScope, $location, $timeout, userServices, loveServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    // 获取省份列表
    loveServices.query_province().then(function(data) {
        $scope.provinces = data.province;
        $scope.input.province = $scope.provinces[0];
    });
    $scope.$watch('input.province', function(n, o) {
            if (n === undefined) {
                return;
            }
            $scope.query_city(n);
        })
        //获取城市
    $scope.query_city = function(province) {
        loveServices.query_city().then(function(data) {
            $scope.cities = data[province];
            $scope.input.city = $scope.cities[0];
        });
    };
    // 身高
    var height = 155,
        heights = ["155CM以下"];
    for (var i = 0; i < 9; i++) {
        to = height + 5;
        heights.push(height + "CM" + "-" + to + "CM")
        height = to;
    }
    $scope.heights = heights;
    $scope.heights.push("200CM以上")
    $scope.input.height = $scope.heights[0];
    // 学历
    $scope.input.age = "20-22岁";
    $scope.input.degree = "初中以上";
    $scope.input.marry = "未婚";
    $scope.input.income = "5000元以下";

    $scope.search = function() {
        // toastServices.show();
        // loveServices.query_loves({
        //     heights: $scope.input.height,
        //     ages: $scope.input.ages,
        //     incomes: $scope.input.income,
        //     marry: $scope.input.marry,
        //     edus: $scope.input.degree,
        // }).then(function(data) {
        //     toastServices.hide();
        //     if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
        //         errorServices.autoHide(data.message);

        //     } else {
        //         errorServices.autoHide(data.message)
        //     }
        // })
        $location.path("search").search({
            heights: $scope.input.height,
            ages: $scope.input.age,
            incomes: $scope.input.income,
            marrys: $scope.input.marry,
            edus: $scope.input.degree,
        }).replace();
    };

})