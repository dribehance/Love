angular.module("Love").controller("detailController", function($scope, $routeParams, $timeout, $location, weixinServices, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	toastServices.show();
	userServices.query_userinfo({
		type: '2',
		ta_user_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.user = data.Result.UserInfo;
			$scope.input.covers = $scope.user.image_other.split("#").filter(function(i) {
				return i != "";
			});
			$scope.input.avatar = $scope.user.image_01;
			$scope.input.heart = $scope.user.heart;
			$scope.input.gender = $scope.genders[$scope.user.sex];
			$scope.input.height = $scope.user.height;
			$scope.input.income = $scope.user.income;
			$scope.input.province = $scope.user.province;
			$timeout(function() {
				$scope.input.city = $scope.user.city;
			}, 2000);
			$scope.input.degree = $scope.user.edu;
			$scope.input.marry = $scope.user.marry;
			$scope.input.child = $scope.user.child;
			$scope.input.is_buy_house = $scope.user.is_buy_house;
			$scope.input.house = $scope.user.buy_house;
			$scope.input.is_buy_car = $scope.user.is_buy_car;
			$scope.input.job = $scope.user.job;
			$scope.input.age_1 = $scope.user.UserOther.choose_mate_age;
			$scope.input.height_1 = $scope.user.UserOther.choose_mate_height;
			$scope.input.income_1 = $scope.user.UserOther.choose_mate_income;
			$scope.input.province_1 = $scope.user.UserOther.choose_mate_province;
			$scope.input.city_1 = $scope.user.UserOther.choose_mate_city;
			$scope.input.degree_1 = $scope.user.UserOther.choose_mate_edu;
			$scope.input.marry_1 = $scope.user.UserOther.choose_mate_marry;
			$scope.input.child_1 = $scope.user.UserOther.choose_mate_has_child;
			$scope.input.house_1 = $scope.user.UserOther.choose_mate_has_house;
			$scope.input.car_1 = $scope.user.UserOther.choose_mate_has_car;
			$scope.input.province_2 = $scope.user.UserOther.dossier_province;
			$scope.input.city_2 = $scope.user.UserOther.dossier_city;
			$scope.input.nation = $scope.user.UserOther.dossier_nation;
			$scope.input.shuxiang = $scope.user.UserOther.dossier_shuxiang;
			$scope.input.xinzuo = $scope.user.UserOther.dossier_xinzuo;
			$scope.input.blood = $scope.user.UserOther.dossier_xuexing;
			$scope.input.body = $scope.user.UserOther.dossier_tixing;
			$scope.input.weight = $scope.user.UserOther.dossier_tizhong;
			$scope.input.score = $scope.user.UserOther.dossier_xiangmao_zp;
			$scope.input.region = $scope.user.UserOther.dossier_region;
			$scope.input.smoke = $scope.user.UserOther.dossier_smoke;
			$scope.input.drink = $scope.user.UserOther.dossier_drink;
			$scope.input.school = $scope.user.UserOther.edu_job_school;
			$scope.input.major = $scope.user.UserOther.edu_job_profession;
			$scope.input.position = $scope.user.UserOther.edu_job_zhiwu;
			$scope.input.company_nature = $scope.user.UserOther.edu_job_nature_company;
			$scope.input.work_status = $scope.user.UserOther.edu_job_work_status;
			$scope.input.language = $scope.user.UserOther.edu_job_master_language;
			$scope.input.about_money = $scope.user.UserOther.attitude_money;
			$scope.input.about_love = $scope.user.UserOther.attitude_shiye_love;
			$scope.input.about_sex = $scope.user.UserOther.attitude_sex;
			$scope.input.marry_plan = $scope.user.UserOther.love_marry_plan;
			$scope.input.housework = $scope.user.UserOther.love_home_work;
			$scope.input.babys = $scope.user.UserOther.love_want_child;
			$scope.input.live_with_parent = $scope.user.UserOther.love_want_fw_zhu;
			$scope.input.couple = $scope.user.UserOther.love_spouse_pattern;
			$scope.input.alone_with = $scope.user.UserOther.love_live_pattern;
			$scope.input.yearing = $scope.user.UserOther.life_xiangwang_thing;
			$scope.input.like_book = $scope.user.UserOther.life_love_book;
			$scope.input.like_film = $scope.user.UserOther.life_love_movie;
			$scope.input.focus_topic = $scope.user.UserOther.life_guanzhu_theme;
			$scope.input.proud = $scope.user.UserOther.life_proud_thing;
			$scope.input.cooking = $scope.user.UserOther.life_cooking;
			$scope.input.had_been = $scope.user.UserOther.life_go_space;
			$scope.input.work_place = $scope.user.UserOther.life_circle_work_place;
			$scope.input.life_place = $scope.user.UserOther.life_circle_life_place;
		} else {
			errorServices.autoHide(data.message);
		}
	});
	// 投诉信息
	toastServices.show();
	userServices.query_report_info().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.report_info = data.Result.Constant;
		} else {
			errorServices.autoHide(data.message);
		}
	});
	$scope.preview_image = function() {
		$scope.preview = "preview"
	}
	$scope.close_preview = function() {
		$scope.preview = ""
	}
	$scope.get_images = function(images) {
		if (!images) {
			return [];
		}
		return images.split("#");
	}
	$scope.get_tags = function(tags) {
		if (!tags) {
			return;
		}
		return tags.split("#")
	}
	$scope.genders = ["女", "男"];
	// 收藏喜欢
	$scope.like = function() {
		toastServices.show();
		userServices.like({
			ta_user_id: $routeParams.id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.modal = {
		status: 0
	};
	$scope.open_modal = function() {
		if ($scope.user.is_chat == '1') {
			$location.path("chat").search(id, $scope.user.user_id);
			return;
		}
		if ($scope.user.is_chat != '1') {
			$scope.modal.status = 1;
		}
	}
	$scope.cancel_modal = function() {
		$scope.modal.status = 0;
	}
	$scope.confirm_modal = function() {
		$scope.modal.status = 0;
		// $location.path("payment").search({
		// 	id: $routeParams.id,
		// 	money: $scope.report_info.bond_money
		// })
		weixinServices.prepare_pay({
			id: $routeParams.id,
			money: $scope.report_info.bond_money
		});
	}
})