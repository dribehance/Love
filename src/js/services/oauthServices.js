// by dribehance <dribehance.kksdapp.com>
angular.module("Love").factory("oauthServices", function($http, config) {
    return {
        initWeixin: function(url) {
            return $http({
                // by dribehance <dribehance.kksdapp.com>
                url: config.url + "/app/WeixinCommon/getSignature",
                method: "GET",
                params: angular.extend({}, config.common_params, {
                    current_url: url
                })
            }).then(function(data) {
                return data.data;
            });
        }
    }
});