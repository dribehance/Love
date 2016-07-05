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
    });
    //获取城市
    $scope.query_city = function(province) {
        loveServices.query_city().then(function(data) {
            $scope.cities = data[province];
            $scope.input.city = $scope.cities[0];
        });
    };
    // 年龄
    var age = 18,
        ages = [];
    for (var i = 0; i < 83; i++) {
        ages.push(age + "岁");
        age++;
    }
    $scope.ages = ages;
    $scope.input.age = $scope.ages[0];
    // 身高
    var height = 100,
        heights = [];
    for (var i = 0; i < 150; i++) {
        heights.push(height + "cm")
        height++
    }
    $scope.heights = heights;
    // 学历
    $scope.degrees = ["初中", "高中", "中专", "大专", "本科", "硕士", "博士"];
    $scope.input.degree = $scope.degrees[0];
    // 婚姻状况
    $scope.marrys = ["未婚", "已婚", "离异", "丧偶"];
    $scope.input.marry = $scope.marrys[0];
    // 收入
    $scope.incomes = ["5000元以下", "5000-10000元", "10000-20000元", "20000-30000元", "30000以上"];
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
            kw: $scope.input.user_id,
            province: $scope.input.province,
            city: $scope.input.city,
        }).replace();
    };

})