# Vimeo_Select

This plugin will probably be most used in an admin-environment. Simply apply it to an input-field that'll save an vimeo-video-id and supply it with your vimeo-user-id (shortcut URL or ID).  

```javascript
$('input[name=vimeo-video-id]').vimeo_select('jpunt');
$('input[name=vimeo-video-id]').vimeo_select(2650748);
```

You can also add some additional settings:  

```javascript
$('input[name=vimeo-video-id]').vimeo_select(2650748, {
	thumbnail_size: 'large',
	remote_thumbnail_input: $('#remote_image')
});
```

- hide_on_blur: This will automatically hide the select-box when the input field is out of focus.
- thumbnail_size: Setup the size of thumbnails (large/medium/small)
- remote_thumbnail_input: Assign an (hidden) input-field that will be populated with the remote url of the video's thumbnail. I use this to download this thumbnail when saving the record.

Styling is really basic, but easily overridden with classes vs-container, vs-close, vs-header, vs-videos, etc