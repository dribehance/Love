// by dribehance <dribehance.kksdapp.com>
angular.module("Love").factory("loveServices", function($http, apiServices, localStorageService, config) {
	return {
		// 首页约爱列表
		query_loves: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url"
		})),
		// 约爱详情
		query_love_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url"
		})),
		// 条件搜索
		search: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url"
		})),
	}
});