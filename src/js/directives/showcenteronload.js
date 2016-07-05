// angular.module("Love").directive('showCenterOnLoaded', function() {
// 	return {
// 		link: function(scope, element, attrs) {
// 			var rate = parseFloat(scope.$eval($(element).parent().attr("data-rate")));
// 			$(element).css({
// 				"visibility": "hidden"
// 			});
// 			// parent
// 			var bg_image = "../images/default.png",
// 				window_width = $(window).width(),
// 				parent_width = $(element).parent().width() || window_width,
// 				parent_height = parent_width / rate;
// 			var style = {
// 				display: "block",
// 				width: parent_width,
// 				overflow: "hidden",
// 				"text-align": "center",
// 				"background-image": "url(" + bg_image + ")",
// 				// "background-size": "100%",
// 				"background-position": "center center",
// 				"background-repeat": "no-repeat",
// 				// "line-height": parent_height + "px",
// 				"height": parent_height
// 			};
// 			$(element).parent().css(style);
// 			element.bind('load', function() {
// 				console.log("loaded")
// 				if (!rate) {
// 					console.log("unexpect rate")
// 					return;
// 				}
// 				// self
// 				var self_width = $(element).width(),
// 					self_height = $(element).height(),
// 					actural_rate = parseFloat(self_width) / parseFloat(self_height);
// 				if (actural_rate < rate) {
// 					self_width = parent_width;
// 					self_height = parent_width / actural_rate
// 					$(element).css({
// 						"display": "inline-block",
// 						"height": self_height,
// 						"width": self_width,
// 						// "margin-top": -(self_height - parent_height) / 2
// 					})
// 				} else {
// 					self_height = parent_height
// 					self_width = self_height * actural_rate;
// 					$(element).css({
// 						"display": "inline-block",
// 						"height": self_height,
// 						"width": self_width,
// 						"margin-left": -(self_width - parent_width) / 2
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