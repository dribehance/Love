// angular.module("Love").directive('showOnLoaded', function() {
// 	return {
// 		restrict: "A",
// 		require: "^imageview",
// 		link: function(scope, element, attrs) {
// 			var rate = parseFloat(scope.$eval($(element).parent().attr("data-rate")));
// 			$(element).css({
// 				"visibility": "hidden"
// 			});
// 			// parent
// 			var bg_image = "../images/default.png";
// 			var style = {
// 				display: "block",
// 				width: $(element).parent().width() || $(element).parent().parent().width(),
// 				overflow: "hidden",
// 				"text-align": "center",
// 				"background-image": "url(" + bg_image + ")",
// 				// "background-size": "100%",
// 				"background-position": "center center",
// 				"background-repeat": "no-repeat",
// 				"line-height": ($(element).parent().width() || $(element).parent().parent().width()) / rate + "px",
// 				"height": ($(element).parent().width() || $(element).parent().parent().width()) / rate
// 			};
// 			$(element).parent().css(style);
// 			element.bind('load', function() {
// 				console.log("loaded")
// 				if (!rate) {
// 					console.log("unexpect rate")
// 					return;
// 				}
// 				// self
// 				var actural_rate = $(element).width() / $(element).height();
// 				if (actural_rate < rate) {
// 					$(element).css({
// 						"display": "inline-block",
// 						"height": "100%",
// 						"width": "auto"
// 					})
// 				} else {
// 					$(element).css({
// 						"display": "inline-block",
// 						"height": "auto",
// 						"width": "100%"
// 					})
// 				}
// 				$(element).parent().css({
// 					"background": "none"
// 				})
// 				$(element).css({
// 					"visibility": "visible"
// 				})
// 			});
// 		}
// 	}
// });