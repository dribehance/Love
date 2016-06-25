// by dribehance <dribehance.kksdapp.com>
angular.module("Love").factory("loveServices", function($http, apiServices, localStorageService, config) {
    return {
        // 首页约爱列表 条件搜索 智能搜索
        query_loves: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/app/Home/taList"
        })),
        // 约爱详情
        query_love_by_id: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/api_url"
        })),
        // 城市列表-省份
        query_province: apiServices._get(angular.extend({}, config.common_params, {
            url: "city/province.json"
        })),
        query_city: apiServices._get(angular.extend({}, config.common_params, {
            url: "city/city.json"
        })),
        // 标签列表
        query_tags: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/app/UserCenter/interestTalentInfo"
        })),
        // 保存标签
        query_tags: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/app/UserCenter/interestTalentInfo"
        })),
        // 查询vip
        query_vips: apiServices._get(angular.extend({}, config.common_params, {
            url: config.url + "/app/Pays/vipPrices"
        })),
    }
});