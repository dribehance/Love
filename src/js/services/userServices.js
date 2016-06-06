// by dribehance <dribehance.kksdapp.com>
angular.module("Love").factory("userServices", function($rootScope, $http, apiServices, localStorageService, config) {
	return {
		// rsa encrypt
		rsa_key: apiServices._get(angular.extend({}, config.common_params, {
			url: "key/private_key.pem",
		})),
		// signin
		signin: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
		})),
		// signup
		signup: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
		})),
		// forget password
		forget: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
		})),
		// reset password
		reset: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
		})),
		get_smscode: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
		})),
		// query user basic information
		query_basicinfo: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
			token: localStorageService.get("token")
		})),
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