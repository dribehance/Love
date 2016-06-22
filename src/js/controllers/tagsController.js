angular.module("Love").controller("tagsController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.tags = [{
		name:"看电影",
		select:false
	},{
		name:"听歌",
		select:false
	},{
		name:"养花",
		select:false
	},{
		name:"跑步",
		select:false
	},{
		name:"网购",
		select:false
	},{
		name:"足球",
		select:false
	},{
		name:"篮球",
		select:false
	},{
		name:"爬山",
		select:false
	},{
		name:"摄影",
		select:false
	},{
		name:"瑜伽",
		select:false
	},{
		name:"游泳",
		select:false
	}];
	$scope.select = function(tag) {
		tag.select = !tag.select;
	}
})