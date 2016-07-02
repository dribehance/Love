// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("myloveController", function($scope, $location, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.loves = [];
	$scope.page = {
		pn: 1,
		page_size: 5,
		message: "点击加载更多",
		love_type: $routeParams.type
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_lovers($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.loves = $scope.loves.concat(data.Result.LoveEachOthers.list);
				$scope.no_more = $scope.loves.length == data.Result.LoveEachOthers.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "加载完成，共加载" + $scope.loves.length + "条记录";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
	$scope.local_go = function(love, e) {
		e.preventDefault();
		e.stopPropagation();
		$location.path("detail").search({
			id: love.loved_user_id
		})
	}
	$scope.unlike = function(love, e) {
		e.preventDefault();
		e.stopPropagation();
		toastServices.show();
		userServices.unlike({
			id: love.loved_user_id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})