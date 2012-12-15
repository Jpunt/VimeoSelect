/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('jQuery#vimeo_select', {
    setup: function() {
      this.$vimeo_id    = $('#qunit-fixture').find('#vimeo-id');
      this.$vimeo_thumb = $('#qunit-fixture').find('#vimeo-thumb');
    }
  });

  // jQuery-stuff
  test('is chainable', function() {
    strictEqual(this.$vimeo_id.vimeo_select('jpunt'), this.$vimeo_id, 'should be chainable');
  });

  // Markup
  test('markup is added', function() {
    var $field = this.$vimeo_id.vimeo_select('jpunt');
    var $vs = $field.next();
    ok($vs.hasClass('vs-container'), 'vs-container should be added');
    ok($vs.find('.vs-close').length > 0, 'vs-close should be added');
    ok($vs.find('.vs-videos').length > 0, 'vs-videos should be added');
  });

  // Showing and hiding selector
  test('selector is shown on focus', function() {
    var $field = this.$vimeo_id.vimeo_select('jpunt');
    
    $field.focus();
    stop();
    
    setTimeout(function() {
      ok($('.vs-container').is(':visible'), 'should be open');
      start();
    }, 200);
  });

  test('selector is closed on blur', function() {
    var $field = this.$vimeo_id.vimeo_select('jpunt');
    var $vs = this.$vimeo_id.next();

    $field.focus();
    stop();

    setTimeout(function() {
      $field.blur();
    }, 200);

    setTimeout(function() {
      ok(!$vs.is(':visible'), 'should be closed');
      start();
    }, 400);
  });

  test('selector is open on blur with option', function() {
    var $field = this.$vimeo_id.vimeo_select('jpunt', { hide_on_blur:false });
    var $vs = this.$vimeo_id.next();

    $field.focus();
    stop();

    setTimeout(function() {
      $field.blur();
    }, 200);

    setTimeout(function() {
      ok($vs.is(':visible'), 'should still be open');
      start();
    }, 400);
  });

  test('selector is closed after clicking close-btn', function() {
    var $field = this.$vimeo_id.vimeo_select('jpunt', { hide_on_blur:false });
    var $vs = this.$vimeo_id.next();

    $field.focus();
    stop();

    setTimeout(function() {
      $vs.find('.vs-close').click();
    }, 200);

    setTimeout(function() {
      ok(!$vs.is(':visible'), 'should be closed');
      start();
    }, 400);
  });

  // Video's
  test('videos are added', function() {
    this.$vimeo_id.vimeo_select('jpunt');
    var $vs = this.$vimeo_id.next();

    this.$vimeo_id.data('vimeo_select').setVideos([
      { id:0, title:'Title 0', thumbnail_medium:'medium 0', thumbnail_large:'large 0' },
      { id:1, title:'Title 1', thumbnail_medium:'medium 1', thumbnail_large:'large 1' },
      { id:2, title:'Title 2', thumbnail_medium:'medium 2', thumbnail_large:'large 2' },
      { id:3, title:'Title 3', thumbnail_medium:'medium 3', thumbnail_large:'large 3' }
    ]);

    ok($vs.find('.vs-video').length === 4, 'should be 4 videos');

    $vs.find('.vs-video').each(function(i, video) {
      ok($(video).data('id')        === i,          'should have vimeo-id');
      ok($(video).data('thumbnail') === 'large '+i, 'should have vimeo-thumbnail');
      ok($(video).find('.vs-video-title').text()    === 'Title '+i, 'should have title');
      ok($(video).find('.vs-thumbnail').attr('src') === 'medium '+i, 'should have thumbnail');
    });
  });

  test('video can be selected', function() {
    var $field = this.$vimeo_id.vimeo_select('jpunt');
    var $vs = this.$vimeo_id.next();

    $field.data('vimeo_select').setVideos([
      { id:5, title:'Title 0', thumbnail_medium:'medium 0', thumbnail_large:'large 0' }
    ]);

    $field.focus();
    stop();

    setTimeout(function() {
      $vs.find('.vs-video:first').click();
    }, 200);

    setTimeout(function() {
      ok(!$vs.is(':visible'), 'should be closed');
      ok($field.val() === '5', 'should have added vimeo-id');
      start();
    }, 400);
  });

  test('thumbnail-url is added', function() {
    var $thumb_field  = this.$vimeo_thumb;
    var $field        = this.$vimeo_id.vimeo_select('jpunt', { remote_thumbnail_input:$thumb_field });
    var $vs           = this.$vimeo_id.next();

    $field.data('vimeo_select').setVideos([
      { id:5, title:'Title', thumbnail_medium:'medium', thumbnail_large:'large' }
    ]);

    $field.focus();
    stop();

    setTimeout(function() {
      $vs.find('.vs-video:first').click();
    }, 200);

    setTimeout(function() {
      ok(!$vs.is(':visible'), 'should be closed');
      ok($thumb_field.val() === 'large', 'should have added thumbnail-url');
      start();
    }, 400);
  });

}(jQuery));
