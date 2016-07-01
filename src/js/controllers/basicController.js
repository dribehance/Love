// by dribehance <dribehance.kksdapp.com>
angular.module("Love").controller("basicController", function($scope, $filter, $timeout, userServices, loveServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	toastServices.show();
	userServices.query_userinfo({
		type: '1'
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.user = data.Result.UserInfo;
			if (!$scope.user.birthday) {
				$scope.input.birthday = new Date();
			} else {
				$scope.input.birthday = new Date($scope.user.birthday);
			}
			$scope.input.covers = $scope.user.image_other.split("#").filter(function(i) {
				return i != "";
			});
			$scope.input.avatar = $scope.user.image_01;
			$scope.input.heart = $scope.user.heart;
			$scope.input.nickname = $scope.user.nickname;
			$scope.input.gender = $scope.genders[$scope.user.sex];
			$scope.input.height = $scope.user.height;
			$scope.input.income = $scope.user.income;
			$scope.input.province = $scope.user.province;
			$timeout(function() {
				$scope.input.city = $scope.user.city;
				$scope.input.city_1 = $scope.user.UserOther.choose_mate_city;
				$scope.input.city_2 = $scope.user.UserOther.dossier_hometown_city;
			}, 2000);
			$scope.input.degree = $scope.user.edu;
			$scope.input.marry = $scope.user.marry;
			$scope.input.child = $scope.user.is_has_child;
			$scope.input.is_buy_house = $scope.user.is_buy_house;
			$scope.input.house = $scope.user.buy_house;
			$scope.input.car = $scope.user.buy_car;
			$scope.input.is_buy_car = $scope.user.is_buy_car;
			$scope.input.job = $scope.user.job;
			$scope.input.age_1 = $scope.user.UserOther.choose_mate_age;
			$scope.input.height_1 = $scope.user.UserOther.choose_mate_heart;
			$scope.input.income_1 = $scope.user.UserOther.choose_mate_income;
			$scope.input.province_1 = $scope.user.UserOther.choose_mate_province;
			// $scope.input.city_1 = $scope.user.UserOther.choose_mate_city;
			$scope.input.degree_1 = $scope.user.UserOther.choose_mate_edu;
			$scope.input.marry_1 = $scope.user.UserOther.choose_mate_marry;
			$scope.input.child_1 = $scope.user.UserOther.choose_mate_has_child;
			$scope.input.house_1 = $scope.user.UserOther.choose_mate_has_house;
			$scope.input.car_1 = $scope.user.UserOther.choose_mate_has_car;
			$scope.input.province_2 = $scope.user.UserOther.dossier_hometown_province;
			// $scope.input.city_2 = $scope.user.UserOther.dossier_city;
			$scope.input.nation = $scope.user.UserOther.dossier_nation;
			$scope.input.shuxiang = $scope.user.UserOther.dossier_shuxiang;
			$scope.input.xinzuo = $scope.user.UserOther.dossier_xinzuo;
			$scope.input.blood = $scope.user.UserOther.dossier_xuexing;
			$scope.input.body = $scope.user.UserOther.dossier_tixing;
			$scope.input.weight = $scope.user.UserOther.dossier_tizhong;
			$scope.input.score = $scope.user.UserOther.dossier_xiangmao_zp;
			$scope.input.region = $scope.user.UserOther.dossier_xiangmao_religion;
			$scope.input.smoke = $scope.user.UserOther.dossier_smoke;
			$scope.input.drink = $scope.user.UserOther.dossier_drink;
			$scope.input.school = $scope.user.UserOther.edu_job_school;
			$scope.input.major = $scope.user.UserOther.edu_job_profession;
			$scope.input.position = $scope.user.UserOther.edu_job_zhiye_zhiwu;
			$scope.input.company_nature = $scope.user.UserOther.edu_job_nature_company;
			$scope.input.industry = $scope.user.UserOther.edu_job_company_hangye;
			$scope.input.work_status = $scope.user.UserOther.edu_job_work_status;
			$scope.input.language = $scope.user.UserOther.edu_job_master_language;
			$scope.input.about_money = $scope.user.UserOther.attitude_money;
			$scope.input.about_love = $scope.user.UserOther.attitude_shiye_love;
			$scope.input.about_sex = $scope.user.UserOther.attitude_sex;
			$scope.input.marry_plan = $scope.user.UserOther.love_marry_plan;
			$scope.input.housework = $scope.user.UserOther.love_home_work;
			$scope.input.baby = $scope.user.UserOther.love_want_child;
			$scope.input.live_with_parent = $scope.user.UserOther.love_want_fw_zhu;
			$scope.input.couple = $scope.user.UserOther.love_spouse_pattern;
			$scope.input.alone_with = $scope.user.UserOther.love_live_pattern;
			$scope.input.yearing = $scope.user.UserOther.life_xiangwang_thing;
			$scope.input.like_book = $scope.user.UserOther.life_love_book;
			$scope.input.like_film = $scope.user.UserOther.life_love_movie;
			$scope.input.like_music = $scope.user.UserOther.life_love_music;
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
	// 封面
	// mock {id:"",url:""}
	$scope.input.covers = [];
	$scope.$on("upload_cover_success", function(event, args) {
		toastServices.show();
		userServices.update_cover({
			image_index: "2",
			fileName: args.message
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				// errorServices.autoHide(data.message);
				$scope.input.covers.push(args.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	});
	// 移除封面
	$scope.remove_cover = function(cover) {
		toastServices.show();
		userServices.remove_cover({
			oleFileName: cover
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				// errorServices.autoHide(data.message);
				$scope.input.covers = $scope.input.covers.filter(function(c) {
					return cover != c;
				})
			} else {
				errorServices.autoHide(data.message);
			}
		})
	};
	$scope.$on("upload_avatar_success", function(event, args) {
		toastServices.show();
		userServices.update_cover({
			image_index: "1",
			fileName: args.message
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				// errorServices.autoHide(data.message);
				$scope.input.avatar = args.message
			} else {
				errorServices.autoHide(data.message);
			}
		})
	});
	$scope.get_images = function(images) {
		if (!images) {
			return [];
		}
		return images.split("#");
	}
	$scope.get_tags = function(tags) {
		if (!tags) {
			return [];
		}
		return tags.split("#")
	}
	$scope.genders = ["女", "男"];
	var height = 145,
		heights = [];
	for (var i = 0; i < 60; i++) {
		height++;
		heights.push(height + "cm")
	}
	$scope.heights = heights;
	$scope.incomes = ["5000元以下", "5000-8000元", "8000-10000元", "10000-20000元", "20000-30000元", "30000-40000元", "40000-50000元", "50000元以上"];
	// 获取省份列表
	loveServices.query_province().then(function(data) {
		$scope.provinces = data.province;
		$scope.input.province = $scope.provinces[0];
	});
	$scope.$watch('input.province', function(n, o) {
		if (n === undefined || n == "") {
			return;
		}
		$scope.query_city(n);
	});
	$scope.query_city = function(province) {
		loveServices.query_city().then(function(data) {
			$scope.cities = data[province];
			$scope.input.city = $scope.cities[0];
		});
	};
	$scope.$watch('input.province_1', function(n, o) {
		if (n === undefined || n == "") {
			return;
		}
		$scope.query_city_1(n);
	});
	$scope.query_city_1 = function(province) {
		loveServices.query_city().then(function(data) {
			$scope.cities_1 = data[province];
			$scope.input.city_1 = $scope.cities[0];
		});
	};
	$scope.$watch('input.province_2', function(n, o) {
		if (n === undefined || n == "") {
			return;
		}
		$scope.query_city_2(n);
	});
	$scope.query_city_2 = function(province) {
		loveServices.query_city().then(function(data) {
			$scope.cities_2 = data[province];
			$scope.input.city_2 = $scope.cities[0];
		});
	};
	// 学历
	$scope.degrees = ["初中以上", "高中以上", "中专以上", "大专以上", "本科以上", "硕士以上", "博士以上"];
	// 婚姻状况
	$scope.marrys = ["未婚", "已婚", "离异", "丧偶"];
	// 有无子女
	$scope.children = ["没有", "有，和我住一起", "有，不和我住一起", "有，有时和我住一起"];
	// 购房情况
	$scope.houses = ["以后再告诉你", "已购房(有房贷)", "与父母同住", "租房", "已购房(无房贷)", "住单位房", "住亲朋家", "需要时购置"];
	// 购车情况
	$scope.cars = ["已购车", "未购车", "单位用车", "需要时购置"];
	// ---------------------择偶
	// 年龄
	var age = 20,
		ages = [];
	ages.push("20岁以下");
	for (var i = 0; i < 60; i = i + 2) {
		var to = age + 2;
		ages.push(age + "-" + to + "岁")
		age = to;
	}
	ages.push("80岁以上");
	$scope.ages = ages;
	// 身高要求
	$scope.input.height_1 = "";
	// 收入要求
	$scope.input.income_1 = "";
	// 居住地-省份要求
	$scope.input.province_1 = "";
	// 居住地-城市要求
	$scope.input.city_1 = "";
	// 学历要求
	$scope.input.degree_1 = "";
	// 子女要求
	$scope.input.child_1 = "";
	// 购房要求
	$scope.input.house_1 = "";
	// ------------------小档案
	// 家乡-省份
	$scope.input.province_2 = "";
	// 家乡-城市
	$scope.input.city_2 = "";
	// 民族
	$scope.nations = ["汉", "满族", "藏族", "回族", "维吾尔族", "苗族", "壮族", "朝鲜族", "其他民族"];
	// 属相
	$scope.input.shuxing = "";
	// 星座
	$scope.input.xinzuo = "";
	// 血型
	$scope.bloods = ["A型", "B型", "AB型", "O型", "其他"];
	// 体型
	$scope.bodys = ["很瘦", "较瘦", "苗条", "匀称", "高挑", "丰满", "健壮", "较胖", "胖"];
	// 体重
	var weight = 40,
		weights = [];
	weights.push("40以下");
	for (var i = 0; i < 60; i = i + 2) {
		var to = weight + 2;
		weights.push(weight + "-" + to + "公斤")
		weight = to;
	}
	weights.push("100公斤以上");
	$scope.weights = weights;
	// 相貌自评
	$scope.scores = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
	// 宗教信仰
	$scope.regions = ["无神论", "佛教", "道教", "基督教", "天主教", "儒教", "犹太教", "回教", "伊斯兰教", "其他"];
	// 是否吸烟
	$scope.smokes = ["不吸，很反感", "不吸，但不反感", "社交时偶尔吸烟", "烟不离手"];
	// 是否饮酒
	$scope.drinks = ["不喝酒", "社交需要喝", "兴致时小酌", "酒不离口"];
	// ----------------教育及工作单位
	// 毕业院
	$scope.input.school = "";
	// 所学专业
	$scope.majors = ["计算机类", "电子信息类", "中文类", "经济学类", "金融学类", "管理类", "市场营销类", "法学类", "教育类", "社会学类", "历史类", "哲学类", "艺术类", "图书馆类", "情报档案类", "政治类", "数学类", "统计类", "物理类", "化学类", "生物类", "食品类", "医学类", "环境了类", "地理类", "建筑类", "测绘类", "电气类", "机械类", "其他"];
	// 职业职务
	$scope.positions = ["计算机/互联网", "电子电器/通讯技术", "机械/仪表仪器", "销售", "客服及技术支持", "财务/审计/税务", "证券/金融/投资/银行", "保险", "生产/营运", "质量/安全管理", "工程/能源", "贸易/采购", "物流/仓储/运输", "技工", "化工/环保", "生物/制药/医疗器械", "广告", "市场/公关", "人力资源", "行政/后勤", "律师/法务/合规", "科研", "商业零售服务", "其他"];
	// 公司性质
	$scope.company_natures = ["政府机关", "事业单位", "外企企业", "世界500强", "上市公司", "国有企业", "私营企业", "其他"];
	// 公司行业
	$scope.industries = ["计算机/网络", "科研/教育", "公关/广告", "传媒出版", "营销/市场/策划", "房地产/建筑业", "装饰/装潢", "其他"];
	// 工作状态
	$scope.work_statuses = ["轻松稳定", "朝九晚五", "偶尔加班", "经常加班", "偶尔出差", "经常出差", "常有应酬", "工作时间自由"];
	// 掌握语言
	$scope.languages = ["中文", "英语", "法语", "日语", "韩语", "德语", "意大利语", "西班牙语", "阿拉伯语", "其他"];
	// ---------我有态度
	// 金钱观
	$scope.input.about_money;
	// 性观念
	$scope.input.about_sex = "";
	// 事业与爱情
	$scope.input.about_love = "";
	// ---------爱情规划
	// 结婚计划
	$scope.input.marry_plan = "";
	// 家务分工
	$scope.houseworks = ["任劳任怨", "希望对方承担家务", "一起分工合作", "看各自闲忙，协商分担"];
	// 是否想要孩子
	$scope.babys = ["想", "不想", "还没想好", "视情况而定", "其他"]
		// 是否与父母同住
	$scope.live_with_parents = ["愿意", "不愿意", "视情况而定"];
	// 夫妻模式
	$scope.input.couple = "";
	// 相处模式
	$scope.input.alone_with = "";
	// --------生活印记
	// 最向往的事
	$scope.input.yearing = "";
	// 最喜欢的书
	$scope.input.like_book = "";
	// 最喜欢的电影
	$scope.input.like_film = "";
	// 最关注的话题
	$scope.input.focus_topic = "";
	// 最骄傲的事
	$scope.input.proud = "";
	// 厨艺状况
	$scope.cookings = ["色香味俱全", "能做几样可口的小菜", "不太会，但愿为心爱的的人学", "其他"];
	// 到过的地方
	$scope.input.had_been = "";
	// --------生活圈
	// 工作地点
	$scope.input.work_place = "";
	// 生活地点
	$scope.input.life_place = "";
	// 常出没地
	$scope.input.offen_go = "";
	// 工作单位
	$scope.input.company = "";
	// -------------------------------------------------------action
	// $scope.like = function() {
	// 	toastServices.show();
	// 	userServices.like().then(function(data) {
	// 		toastServices.hide()
	// 		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
	// 			errorServices.autoHide(data.message);
	// 		} else {
	// 			errorServices.autoHide(data.message);
	// 		}
	// 	})
	// }
	$scope.save = function() {
		toastServices.show();
		userServices.save_userinfo_1({
			"sex": $scope.input.gender == '男' ? '1' : '0',
			"birthday": $filter("date")($scope.input.birthday, "yyyy-MM-dd"),
			"province": $scope.input.province,
			"city": $scope.input.city,
			"height": $scope.input.height,
			// "income": $scope.input.income,
			"edu": $scope.input.degree,
			"marry": $scope.input.marry,
			"is_has_child": $scope.input.child,
			"buy_house": $scope.input.house,
			"buy_car": $scope.input.car,
			"job": $scope.input.job,
		}).then(function(data) {
			toastServices.hide();
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
		userServices.save_userinfo_2({
			"user_other_data_id": $scope.user.UserOther.user_other_data_id,
			"dossier_hometown_province": $scope.input.province_2,
			"dossier_hometown_city": $scope.input.city_2,
			"dossier_nation": $scope.input.nation,
			"dossier_shuxiang": $scope.input.shuxiang,
			"dossier_xingzuo": $scope.input.xinzuo,
			"dossier_xuexing": $scope.input.blood,
			"dossier_tixing": $scope.input.body,
			"dossier_tizhong": $scope.input.weight,
			"dossier_xiangmao_zp": $scope.input.score,
			"dossier_xiangmao_religion": $scope.input.region,
			"dossier_smoke": $scope.input.smoke,
			"dossier_drink": $scope.input.drink,
			"edu_job_school": $scope.input.school,
			"edu_job_profession": $scope.input.major,
			"edu_job_zhiye_zhiwu": $scope.input.position,
			"edu_job_nature_company": $scope.input.company_nature,
			"edu_job_company_hangye": $scope.input.industry,
			"edu_job_work_status": $scope.input.work_status,
			"edu_job_master_language": $scope.input.language,
			"attitude_money": $scope.input.about_money,
			"attitude_sex": $scope.input.about_sex,
			"attitude_shiye_love": $scope.input.about_love,
			"love_marry_plan": $scope.input.marry_plan,
			"love_home_work": $scope.input.housework,
			"love_want_child": $scope.input.baby,
			"love_want_fw_zhu": $scope.input.live_with_parent,
			"love_spouse_pattern": $scope.input.couple,
			"love_live_pattern": $scope.input.alone_with,
			"life_xiangwang_thing": $scope.input.yearing,
			"life_love_book": $scope.input.like_book,
			"life_love_movie": $scope.input.like_film,
			"life_love_music": $scope.input.like_music,
			"life_guanzhu_theme": $scope.input.focus_topic,
			"life_proud_thing": $scope.input.proud,
			"life_cooking": $scope.input.cooking,
			"life_go_space": $scope.input.had_been,
			"life_circle_work_place": $scope.input.work_place,
			"life_circle_life_place": $scope.input.life_place,
			// "family_ranking": "【家庭状况】家庭排行",
			// "family_fumu_condition": "【家庭状况】父母情况",
			// "family_father_work": "【家庭状况】父亲工作",
			// "family_mother_work": "【家庭状况】母亲工作",
			// "family_fumu_economy": "【家庭状况】父母经济",
			// "family_fumu_yibao": "【家庭状况】父母医保",
		}).then(function(data) {
			toastServices.hide();
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
		userServices.save_userinfo_3({
			"user_other_data_id": $scope.user.UserOther.user_other_data_id,
			"choose_mate_age": $scope.input.age_1,
			"choose_mate_heart": $scope.input.height_1,
			// "choose_mate_heart": $scope.input.heart,
			"choose_mate_province": $scope.input.province_1,
			"choose_mate_city": $scope.input.city_1,
			"choose_mate_marry": $scope.input.marry,
			"choose_mate_edu": $scope.input.degree_1,
			"choose_mate_income": $scope.input.income_1,
			"choose_mate_has_child": $scope.input.child_1,
			"choose_mate_has_house": $scope.input.house_1,
		}).then(function(data) {
			toastServices.hide();
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
});



// uploadCoversController
angular.module("Love").controller("uploadCoversController", function($scope, errorServices, toastServices, localStorageService, config) {
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
		$scope.$emit("upload_cover_success", {
			message: filename
		});
		toastServices.hide();
	});
});
// uploadCoversController
angular.module("Love").controller("uploadAvatarController", function($scope, errorServices, toastServices, localStorageService, config) {
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
		$scope.$emit("upload_avatar_success", {
			message: filename
		});
		toastServices.hide();
	});
})