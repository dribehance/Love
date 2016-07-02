// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("chatController", function($scope, $routeParams, $timeout, $rootScope, $location, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.input = {
        block_status: $routeParams.status
    };
    $scope.chats = [];
    $scope.page = {
        pn: 1,
        page_size: 500,
        message: "点击加载更多",
        receive_user_id: $routeParams.id
    }
    $scope.loadMore = function() {
        if ($scope.no_more) {
            return;
        }
        toastServices.show();
        $scope.page.message = "正在加载...";
        userServices.query_message_by_id($scope.page).then(function(data) {
            toastServices.hide();
            $scope.page.message = "点击加载更多";
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.chats = $scope.chats.concat(data.Result.ChatMessages.list);
                $scope.no_more = $scope.chats.length == data.Result.ChatMessages.totalRow ? true : false;
                $timeout(function() {
                    $("html, body").animate({
                        scrollTop: $(document).height()
                    }, 100);
                }, 500)
            } else {
                errorServices.autoHide("服务器错误");
            }
            if ($scope.no_more) {
                $scope.page.message = "没有了";
            }
            $scope.page.pn++;
        })
    }
    $scope.loadMore();
    userServices.query_basicinfo().then(function(data) {
        if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
            $scope.user = data.Result.BaseInfo;
        } else {
            errorServices.autoHide(data.message);
        }
    });
    //消息
    $scope.send = function() {
        toastServices.show();
        userServices.send({
            receive_user_id: $routeParams.id,
            content: $scope.input.content,
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                $scope.chats.push({
                    "is_read": "",
                    "receive_nickname": "",
                    "current_image_01": $scope.user.image_01,
                    "receive_image_01": "4131734_110157044032_22.jpg",
                    "user_id": $scope.user.user_id,
                    "send_receive_time": "2016-02-29 13:51:00.0",
                    "chat_message_id": $scope.user.user_id,
                    "receive_user_id": $routeParams.id,
                    "content": $scope.input.content,
                    "post_time": "2016-02-29 13:51:00",
                    "current_nickname": "小明",
                    "is_me_send": "1"
                })
                $scope.input.content = "";
                $("html, body").animate({
                    scrollTop: $(document).height()
                }, 100);
                $("input").blur()
            } else {
                errorServices.autoHide(data.message);
            }
        })
    };
    $scope.block = {};
    $scope.show_model = function() {
        $scope.block.status = 1
    };
    $scope.close_model = function() {
        $scope.block.status = "";
    };
    $scope.block_model = function(t) {
        toastServices.show();
        userServices.block({
            ta_user_id: $routeParams.id,
            black_type: t,
        }).then(function(data) {
            toastServices.hide()
            if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
                errorServices.autoHide(data.message);
                $rootScope.back();

            } else {
                errorServices.autoHide(data.message);
                $location.path("chat").search();
            }
        })
    }
    $("input").focus(function() {
        var self = $(this);
        $("html, body").animate({
            scrollTop: $(document).height()
        }, 100);
        $timeout(function() {
            self.parents(".respond-wrap").css({
                position: "absolute",
                top: $(document).height() - 53,
                bottom: "auto"
            })
        }, 100)
    })
    $("input").blur(function() {
        var self = $(this);
        $("html, body").animate({
            scrollTop: $(document).height()
        }, 100);
        $timeout(function() {
            self.parents(".respond-wrap").css({
                position: "fixed",
                top: "auto",
                bottom: "0"
            })
        }, 100)
    })
})