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
			thumbnail_size: 'medium',
			text_help: 'Select video:'
		};

		var settings = $.extend(defaults, options);
		console.log('settings:');
		console.log(settings);
		
		var $input 			= $(this);
		var $container	= $input.wrap('<div></div>').parent('div').addClass('vs_container');
		var $videos 		= $('<div></div>').addClass('vs_videos').addClass(settings.thumbnail_size).hide();
		$container.append($videos);

		//Add close-button
		var $close = $('<a>x</a>').addClass('vs_close').click(function() {
			$videos.hide();
		});
		$videos.append($close);
		
		//Add help-title
		var $help = $('<h1>'+settings.text_help+'</h1>').addClass('vs_help');
		$videos.append($help);
		
		//Get video's
		var status;
		$.ajax({
			url: settings.api_url + settings.user_id + '/videos.json', 
			dataType: 'json',			
			success: setupVideos,
			complete: function(req, status) {
				status = req.status;
				if(status!=200) $help.text("Something went wrong while fetching video's");
			}
		});
		
		function setupVideos(videos) {
			$.each(videos, function(i, video) {
				$video = $('<div></div>').addClass('vs_video').click(function() {
					$input.val(video.id);
					$videos.hide();
				});
				$videos.append($video);				
				$('<p>'+video.title+'</p>').addClass('vs_title').appendTo($video);
				$('<img alt="thumbnail" />').attr('src', video['thumbnail_'+settings.thumbnail_size]).addClass('vs_thumbnail').appendTo($video);					
			});
		};		
		
		//Show video's
		$(this).focus(function() {
			$videos.show();
		});

		//tmp
		$videos.show();
	};
})(jQuery);