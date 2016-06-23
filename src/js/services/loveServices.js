// by dribehance <dribehance.kksdapp.com>
angular.module("Love").factory("loveServices", function($http, apiServices, localStorageService, config) {
	return {
		// 首页约爱列表
		query_loves:function(input){
			return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/Home/taList",
                method: "GET",
                params: angular.extend({}, config.common_params, input)
            }).then(function(data) {
                return data.data;
            });
		},
		// 约爱详情
		query_love_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url"
		})),
		// 条件搜索
		search: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url"
		})),
		// 城市列表-省份
		query_province:function(input){
			return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: "city/province.json",
                method: "GET",
                params: angular.extend({}, config.common_params, input)
            }).then(function(data) {
                return data.data;
            });
		},
		// 城市列表-城市
		query_city:function(input){
			return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: "city/city.json",
                method: "GET",
                params: angular.extend({}, config.common_params, input)
            }).then(function(data) {
                return data.data;
            });
		}
	}
});