
/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-css');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:VimeoSelect.jquery.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/js/jquery.vimeo_select.js>'],
        dest: 'dist/jquery.vimeo_select.js'
      },
      css: {
        src: ['<banner:meta.banner>', 'src/css/jquery.vimeo_select.css'],
        dest: 'dist/jquery.vimeo_select.css'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/jquery.vimeo_select.min.js'
      }
    },
    cssmin: {
      css: {
        src: '<config:concat.css.dest>',
        dest: 'dist/jquery.vimeo_select.min.css'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');

};
