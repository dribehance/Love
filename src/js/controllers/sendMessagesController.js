angular.module("Love").controller("sendMessagesController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.messages = [];
	$scope.page = {
		pn: 1,
		page_size: 5,
		message: "点击加载更多"
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_send_messages($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.messages = $scope.messages.concat(data.Result.ChatUsers.list);
				$scope.no_more = $scope.messages.length == data.Result.ChatUsers.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "加载完成，共加载" + $scope.messages.length + "条记录";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
})