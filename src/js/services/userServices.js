// by dribehance <dribehance.kksdapp.com>
angular.module("Love").factory("userServices", function($rootScope, $http, apiServices, localStorageService, config) {
    return {
        // rsa encrypt
        rsa_key: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: "key/private_key.pem",
                method: "GET",
                params: angular.extend({}, config.common_params, input)
            }).then(function(data) {
                return data.data;
            });
        },
        // signin
        signin: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/Login",
                method: "GET",
                params: angular.extend({}, config.common_params, input)
            }).then(function(data) {
                return data.data;
            });
        },
        // signup
        signup: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/RegistTel",
                method: "GET",
                params: angular.extend({}, config.common_params, input)
            }).then(function(data) {
                return data.data;
            });
        },
        // forget password
        forget: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
        })),
        // 获取验证码
        get_smscode: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/getRegisterCode",
                method: "GET",
                params: angular.extend({}, config.common_params, input)
            }).then(function(data) {
                return data.data;
            });
        },
        // reset password
        reset: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
        })),
        // query basic information
        query_basicinfo: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/baseInfo",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    token: localStorageService.get("token")
                }, input)
            }).then(function(data) {
                return data.data;
            });
        },
        // query user information
        query_userinfo: function(input) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/UserCenter/userInfo",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    token: localStorageService.get("token")
                }, input)
            }).then(function(data) {
                return data.data;
            });
        },
        realname_authen: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
        phone_authen: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
        // favourite 收藏
        like: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
        // 取消收藏
        unlike: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
        // 消息列表
        query_messages: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
        // 消息详情
        query_message_by_id: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
        // 屏蔽消息
        block: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
        // 充值
        charge: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
        // 谁看过我
        query_visitors: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
        // 谁喜欢我
        query_lovers: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
        // 我的约会
        query_mydate: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
        // 我的喜欢
        query_mylovers: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
        // 确认赴约
        confirm_adate: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
        // 约会投诉
        report: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "api_url",
            token: localStorageService.get("token")
        })),
    }
});