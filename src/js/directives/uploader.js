angular.module("Love").directive('uploader', function($timeout) {
	return {
		link: function(scope, element, attrs) {
			var rate = parseFloat(scope.$eval($(element).parent().attr("data-rate")));
			$(element).css({
				"visibility": "hidden"
			});
			// parent
			var bg_image = "../images/default.png",
				window_width = $(window).width(),
				parent_width = $(element).parent().width() || window_width,
				parent_height = parent_width / rate;
			var style = {
				display: "block",
				width: parent_width,
				overflow: "hidden",
				"text-align": "center",
				"background-image": "url(" + bg_image + ")",
				// "background-size": "100%",
				"background-position": "center center",
				"background-repeat": "no-repeat",
				// "line-height": parent_height + "px",
				"height": parent_height
			};
			$(element).parent().css(style);
			element.bind('load', function(e) {
				calculate_image_size_on_loaded(e);
				$timeout(function() {
					calculate_image_size_on_loaded(e);
				}, 100)
			});

			function calculate_image_size_on_loaded(e) {
				var image_loaded = $(e.target),
					image_loaded_width = image_loaded.width(),
					image_loaded_height = image_loaded.height(),
					actural_rate = parseFloat(image_loaded_width) / parseFloat(image_loaded_height);
				if (actural_rate < rate) {
					image_loaded.css({
						"display": "inline-block",
						"height": "auto",
						"width": "100%"
					})
				} else {
					image_loaded.css({
						"display": "inline-block",
						"height": "100%",
						"width": "auto"
					})
				}
				image_loaded.parent().css({
					"background": "none"
				})
				image_loaded.css({
					"visibility": "visible"
				})
			}
		}
	}
});