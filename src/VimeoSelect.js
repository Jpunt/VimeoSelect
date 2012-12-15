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
			self.$container = $('<div class="vs-container '+self.options.thumbnail_size+'" />');
			self.$input.after(self.$container);

			self.$close = $('<a href="#" class="vs-close">x</a>');
			self.$container.append(self.$close);
			self.$close.click(function(e) {
				e.preventDefault();
				self.hide();
			});

			self.$videos = $('<div class="vs-videos" />');
			self.$container.append(self.$videos);

			self.$input.focus(self.show);
			if(self.options.hide_on_blur === true) {
				self.$input.blur(self.hide);
			}

			$('.vs-container .vs-videos .vs-video').live('click', function(e) {
				self.select($(e.currentTarget));
			});

			self.load();
		};

		self.load = function() {
			$.ajax({
				url: self.options.api_url + self.user_id + '/videos.json',
				dataType: 'jsonp',
				success: self.setVideos,
				complete: function(req, status) {
					if(req.status !== 200) {
						self.showError();
					}
				}
			});
		};

		self.setVideos = function(videos) {
			var html = '';
			$.each(videos, function(i, video) {
				// Container
				html += '<div class="vs-video ' + (i === videos.length ? 'last':'') + '"';
				html += ' data-id="' + video.id + '" data-thumbnail="' + video.thumbnail_large + '">';
				// Thumbnail
				html += '<img class="vs-thumbnail" src="' + video['thumbnail_'+self.options.thumbnail_size] + '" alt="thumbnail" />';
				// Title
				html += '<p class="vs-video-title">' + video.title + '</p>';
				// Close up
				html += '</div>';
			});
			self.$videos.html(html);
		};

		self.showError = function() {
			window.alert('could not load videos');
		};

		self.select = function($video) {
			self.$videos.find('.vs-video').removeClass('selected');
			$video.addClass('selected');
			self.$input.val($video.data('id'));
			if(self.options.remote_thumbnail_input !== false) {
				self.options.remote_thumbnail_input.val($video.data('thumbnail'));
			}
			self.hide();
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