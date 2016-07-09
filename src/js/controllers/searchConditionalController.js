// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("searchConditionalController", function($scope, $rootScope, $location, $timeout, userServices, loveServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {};
    // 获取省份列表
    loveServices.query_province().then(function(data) {
        $scope.provinces = data.province;
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
    $scope.degrees = ["不限", "初中", "高中", "中专", "大专", "本科", "硕士", "博士"];
    $scope.input.degree = $scope.degrees[0];
    // 婚姻状况
    $scope.marrys = ["不限", "未婚", "已婚", "离异", "丧偶"];
    $scope.input.marry = $scope.marrys[0];
    // 收入
    $scope.incomes = ["不限", "5000元以下", "5000-10000元", "10000-20000元", "20000-30000元", "30000以上"];
    $scope.input.income = "不限";
    // 会员
    $scope.members = ["不限", "VIP会员"];
    $scope.input.member = "不限";
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
            age_from: $scope.input.age_from,
            age_to: $scope.input.age_to,
            height_from: $scope.input.height_from,
            height_to: $scope.input.height_to,
            member: $scope.input.member
        }).replace();
    };

})