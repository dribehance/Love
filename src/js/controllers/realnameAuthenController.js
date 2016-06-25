// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("realnameAuthenController", function($scope, $rootScope, userServices, $timeout, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.realname_authen({
			realname: $scope.input.realname,
			ID_num: $scope.input.id,
			ID_front_image: $scope.input.front,
			ID_back_image: $scope.input.back
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timout(function() {
					$rootScope.back();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.$on("upload_front_success", function(event, args) {
		$scope.input.front = args.message;
	});
	$scope.$on("upload_back_success", function(event, args) {
		$scope.input.back = args.message;
	});
});
// uploadFrontController
angular.module("Love").controller("uploadFrontController", function($scope, errorServices, toastServices, localStorageService, config) {
	var filename, extension;
	$scope.$on("flow::filesSubmitted", function(event, flow) {
		flow.files[0].name.replace(/.png|.jpg|.jpeg|.gif/g, function(ext) {
			extension = ext;
			return ext;
		})
		filename = new Date().getTime() + extension;
		flow.opts.target = config.url + "/app/UserCenter/updatePic";
		flow.opts.testChunks = false;
		flow.opts.fileParameterName = "image_01";
		flow.opts.query = {
			"invoke": "h5",
			"token": localStorageService.get("token"),
			"filename": filename
		};
		toastServices.show();
		flow.upload();
	});
	$scope.$on('flow::fileAdded', function(file, message, chunk) {
		// $scope.cover.url = "";
	});
	$scope.$on('flow::fileSuccess', function(file, message, chunk) {
		$scope.$flow.files = [];
		$scope.$emit("upload_front_success", {
			message: filename
		});
		toastServices.hide();
	});
});
// uploadBackController
angular.module("Love").controller("uploadBackController", function($scope, errorServices, toastServices, localStorageService, config) {
	var filename, extension;
	$scope.$on("flow::filesSubmitted", function(event, flow) {
		flow.files[0].name.replace(/.png|.jpg|.jpeg|.gif/g, function(ext) {
			extension = ext;
			return ext;
		})
		filename = new Date().getTime() + extension;
		flow.opts.target = config.url + "/app/UserCenter/updatePic";
		flow.opts.testChunks = false;
		flow.opts.fileParameterName = "image_01";
		flow.opts.query = {
			"invoke": "h5",
			"token": localStorageService.get("token"),
			"filename": filename
		};
		toastServices.show();
		flow.upload();
	});
	$scope.$on('flow::fileAdded', function(file, message, chunk) {
		// $scope.cover.url = "";
	});
	$scope.$on('flow::fileSuccess', function(file, message, chunk) {
		$scope.$flow.files = [];
		$scope.$emit("upload_back_success", {
			message: filename
		});
		toastServices.hide();
	});
})