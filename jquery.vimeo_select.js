/**
* @author Jasper Haggenburg
* @url http://jpunt.nl/
*/

(function($) {
	$.fn.vimeo_select = function(options) {

		if(!options.user_id) {
			alert('No user_id given');
			return false;
		}
			
		var defaults 	= {
			api_url:'http://vimeo.com/api/v2/',
			class_container: 'vs_container',
			class_videos: 'vs_videos',
			class_video: 'vs_video',
			class_title: 'vs_title',
			class_close: 'vs_close',
			thumbnail_size: 'medium'
		};

		var settings 	= $.extend(defaults, options);
		console.log('settings:');
		console.log(settings);
		
		var $input 			= $(this);
		var $container	= $input.wrap('<div></div>').parent('div').addClass(settings.class_container);
		var $videos 		= $('<div></div>').addClass(settings.class_videos).hide();
		$container.append($videos);
		
		//Get video's
		$.getJSON(settings.api_url + settings.user_id + '/videos.json', function(data) {				
			$.each(data, function(i, video) {
				$video = $('<div></div>').addClass(settings.class_video).click(function() {
					$input.val(video.id);
					$videos.hide();
				});
				$videos.append($video);				
				$('<p>'+video.title+'</p>').addClass(settings.class_title).appendTo($video);
				$('<img alt="thumbnail" />').attr('src', video['thumbnail_'+settings.thumbnail_size]).addClass(settings.class_thumbnail).appendTo($video);					
			});			
		});
		
		//Show video's
		$(this).focus(function() {
			$videos.show();
		});
		
		//Add close-button
		$close = $('<a>x</a>').addClass(settings.class_close).click(function() {
			$videos.hide();
		});
		$videos.append($close);
		
	};
})(jQuery);