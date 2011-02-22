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
			
		var defaults 	= {
			api_url:'http://vimeo.com/api/v2/',
			thumbnail_size: 'medium',
			text_help: 'Select video:',
			text_close: 'X',
			auto_hide: false
		};

		var settings = $.extend(defaults, options);
		
		var $input 			= $(this);
		var $container	= $('<div></div>').addClass('vs_container').addClass(settings.thumbnail_size).hide();
		$input.after($container);

		var $header = $('<div></div>').addClass('vs_header');
		$container.append($header);

		var $videos 		= $('<div></div>').addClass('vs_videos');
		$container.append($videos);

		//Add close-button
		var $close = $('<a>'+settings.text_close+'</a>').addClass('vs_close').click(function() {
			$container.hide();
		});
		$header.append($close);
		//Add help-title
		var $help = $('<h1>'+settings.text_help+'</h1>').addClass('vs_help');
		$header.append($help);
		
		$.ajax({
			url: settings.api_url + user_id + '/videos.json', 
			dataType: 'jsonp',	
			success: function(data) {
				$.each(data, function(i, video) {
					$video = $('<div></div>').addClass('vs_video').click(function() {
						$videos.find('.vs_video').removeClass('selected');
						$(this).addClass('selected');
						$input.val(video.id);
						if(settings.auto_hide) $container.hide();
					});
					$videos.append($video);				
					$('<p>'+video.title+'</p>').addClass('vs_title').appendTo($video);
					$('<img alt="thumbnail" />').attr('src', video['thumbnail_'+settings.thumbnail_size]).addClass('vs_thumbnail').appendTo($video);					
				});
			},
			complete: function(req, status) {
				if(req.status!=200) {
					$help.text("Error "+req.status+" while fetching video's");
					$videos.hide();
				}
			}
		});
		
		$(this).focus(function() {
			$container.show();
		});
		
	};
})(jQuery);