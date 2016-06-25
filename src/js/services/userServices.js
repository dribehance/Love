// by dribehance <dribehance.kksdapp.com>
angular.module("Love").factory("userServices", function($rootScope, $http, apiServices, localStorageService, config) {
    return {
        // rsa encrypt 密码加密
        rsa_key: apiServices._get(angular.extend({}, config.common_params, {
            url: "key/private_key.pem",
        })),
        // signin 登录
        signin: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/app/UserCenter/Login",
        })),
        // signup 注册
        signup: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/app/UserCenter/RegistTel",
        })),
        // forget password 忘记密码
        forget: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
        })),
        // reset password 重置密码
        reset: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
        })),
        // 获取验证码
        get_smscode: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/app/UserCenter/getRegisterCode",
        })),
        // query basic information 基本信息
        query_basicinfo: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/app/UserCenter/baseInfo",
            token: localStorageService.get("token")
        })),
        // query user information 全部信息
        query_userinfo: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/app/UserCenter/userInfo",
            token: localStorageService.get("token")
        })),
        // 保存独白
        save_inner_word: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/app/UserCenter/userInfo",
            token: localStorageService.get("token")
        })),
        // 实名认证
        realname_authen: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
            token: localStorageService.get("token")
        })),
        // 手机认证
        phone_authen: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
            token: localStorageService.get("token")
        })),
        // favourite 收藏
        like: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
            token: localStorageService.get("token")
        })),
        // 取消收藏
        unlike: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
            token: localStorageService.get("token")
        })),
        // 我的喜欢
        mylove: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/app/LoveManage/loveEachOtherList",
        })),
        // 消息列表
        query_messages: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
            token: localStorageService.get("token")
        })),
        // 消息详情
        query_message_by_id: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
            token: localStorageService.get("token")
        })),
        // 屏蔽消息
        block: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
            token: localStorageService.get("token")
        })),
        // 充值
        charge: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
            token: localStorageService.get("token")
        })),
        // 谁看过我
        query_visitors: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
            token: localStorageService.get("token")
        })),
        // 谁喜欢我
        query_lovers: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
            token: localStorageService.get("token")
        })),
        // 我的约会
        query_mydate: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
            token: localStorageService.get("token")
        })),
        // 确认赴约
        confirm_adate: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
            token: localStorageService.get("token")
        })),
        // 约会投诉
        report: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url",
            token: localStorageService.get("token")
        })),
    }
});