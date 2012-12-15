/*
 * VimeoSelect
 * https://github.com/Jpunt/VimeoSelect
 *
 * Copyright (c) 2012 Jasper Haggenburg
 * Licensed under the MIT license.
 */

(function($) {

	"use strict";

	$.vimeo_select = function(input, user_id, options) {
		var self = this;

		self.$input = $(input);
		self.$input.data("vimeo_select", self);
		self.options = $.extend({}, $.vimeo_select.defaultOptions, options);
		self.user_id = user_id;

		if(!user_id) {
			window.console.log('No user_id given');
			return false;
		}

		self.init = function() {
			self.$container = $('<div></div>').addClass('vs-container').addClass(self.options.thumbnail_size).hide();
			self.$input.after(self.$container);

			self.$close = $('<a href="#">x</a>').addClass('vs-close');
			self.$container.append(self.$close);
			self.$container.find('.vs-close').click(function(e) {
				e.preventDefault();
				self.hide();
			});

			self.$header = $('<div></div>').addClass('vs-header');
			self.$container.append(self.$header);

			self.$videos = $('<div></div>').addClass('vs-videos');
			self.$container.append(self.$videos);

			self.$input.focus(self.show);
			if(self.options.hide_on_blur === true) {
				self.$input.blur(self.hide);
			}

			self.load();
		};

		self.load = function() {
			$.ajax({
				url: self.options.api_url + self.user_id + '/videos.json',
				dataType: 'jsonp',
				success: function(data) {
					$.each(data, function(i, video) {
						var $video = $('<div></div>').addClass('vs-video').click(function(e) {
							self.select($(e.currentTarget), video);
						});
						self.$videos.append($video);
						$('<img alt="thumbnail" />').attr('src', video['thumbnail_'+self.options.thumbnail_size]).addClass('vs-thumbnail').appendTo($video);
						$('<p>'+video.title+'</p>').addClass('vs-video-title').appendTo($video);
					});
					self.$videos.find('.vs-video:last').addClass('last');
				},
				complete: function(req, status) {
					if(req.status !== 200) {
						self.$videos.hide();
					}
				}
			});
		};

		self.select = function($video, video) {
			self.$videos.find('.vs-video').removeClass('selected');
			$video.addClass('selected');
			self.$input.val(video.id);
			if(self.options.remote_thumbnail_input !== false) {
				self.options.remote_thumbnail_input.val(video.thumbnail_large);
			}
		};

		self.show = function() {
			self.$container.slideDown(150);
		};

		self.hide = function() {
			self.$container.slideUp(100);
		};

		self.init();
	};

	$.vimeo_select.defaultOptions = {
		api_url:'http://vimeo.com/api/v2/',
		thumbnail_size: 'medium',
		hide_on_blur: true,
		remote_thumbnail_input: false
	};

	$.fn.vimeo_select = function(user_id, options){
		return this.each(function(){
			(new $.vimeo_select(this, user_id, options));
		});
	};

})(jQuery);