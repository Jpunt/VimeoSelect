/**
* @author Jasper Haggenburg
* @url http://jpunt.nl/
*/

(function($) {
	$.fn.vimeo_select = function(user_id, options) {

		if(!user_id) {
			alert('No user_id given');
			return false;
		}
			
		var defaults = {
			api_url:'http://vimeo.com/api/v2/',
			thumbnail_size: 'medium',
			auto_hide: false,
			hide_on_blur: true,
			remote_thumbnail_input: false,
			show: function() {}
		};

		var self = this;
				self.settings = $.extend(defaults, options);
				self.user_id	= user_id;
				self.$input		= $(this);
		
		self.init = function() {
			self.$container = $('<div></div>').addClass('vs-container').addClass(self.settings.thumbnail_size).hide();
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
			if(self.settings.hide_on_blur === true) {
				self.$input.blur(self.hide);
			}

			self.load();
		};

		self.load = function() {
			$.ajax({
				url: self.settings.api_url + self.user_id + '/videos.json',
				dataType: 'jsonp',
				success: function(data) {
					$.each(data, function(i, video) {
						var $video = $('<div></div>').addClass('vs-video').click(function(e) {
							self.select($(e.currentTarget), video);
						});
						self.$videos.append($video);
						$('<img alt="thumbnail" />').attr('src', video['thumbnail_'+self.settings.thumbnail_size]).addClass('vs-thumbnail').appendTo($video);
						$('<p>'+video.title+'</p>').addClass('vs-title').appendTo($video);
					});
					self.$videos.find('.vs-video:last').addClass('last');
				},
				complete: function(req, status) {
					if(req.status!=200) {
						$help.text("Error "+req.status+" while fetching video's");
						$videos.hide();
					}
				}
			});
		};

		self.select = function($video, video) {
			console.log('vimeo.select ', $video, video);
			self.$videos.find('.vs-video').removeClass('selected');
			$video.addClass('selected');
			self.$input.val(video.id);
			if(self.settings.remote_thumbnail_input !== false) {
				self.settings.remote_thumbnail_input.val(video.thumbnail_large);
			}
			if(self.settings.auto_hide) {
				self.hide();
			}
		};

		self.show = function() {
			var height = self.$container.show().height();
			self.$container.height(0).animate({'height':height}, 200, function() {
				self.$container.height('auto');
			});
			self.settings.show();
		};

		self.hide = function() {
			self.$container.animate({'height':0}, 200, function() {
				self.$container.height('auto').hide();
			});
		};

		self.init();
		return self;
	};
})(jQuery);