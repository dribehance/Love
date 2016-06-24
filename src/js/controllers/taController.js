// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("taController", function($scope,loveServices, errorServices, toastServices, localStorageService, config) {
    $scope.modal = {
        status: 0
    };
    $scope.open_modal = function() {
        $scope.modal.status = 1;
    }
    $scope.cancel_modal = function() {
        $scope.modal.status = 0;
    }
    //获取标签
    $scope.get_tag = function(tag) {
		return tag.split("#");
	}
   	$scope.loves = [];
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
		loveServices.query_loves($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				console.log(data);
				$scope.loves = $scope.loves.concat(data.Result.Users.list);
				$scope.no_more = $scope.loves.length == data.Result.Users.totalRow ? true : false;
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
})