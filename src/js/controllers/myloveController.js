// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("myloveController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
    $scope.mylove = [];
	$scope.page = {
		pn: 1,
		page_size: 5,
		message: "点击加载更多",
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.mylove($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				console.log(data);
				$scope.mylove = $scope.mylove.concat(data.Result.Users.list);
				$scope.no_more = $scope.mylove.length == data.Result.Users.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "加载完成，共加载" + $scope.mylove.length + "条记录";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
})