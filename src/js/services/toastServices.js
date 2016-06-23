// by dribehance <dribehance.kksdapp.com>
angular.module("Love").factory("toastServices", function() {
	return {
		show: function() {
			$(".toast").show();
		},
		hide: function() {
			$(".toast").hide();
		},
		start: function() {
			NProgress.start();
		},
		done: function() {
			NProgress.done();
		}
	}
});