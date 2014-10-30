'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable variables
  var config = {
    in: 'app/Resources',
    out: 'web'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: [
          '<%= config.in %>/scripts/{,*/}*.js',
          '<%= config.in %>/scripts/concat.json'
        ],
        tasks: ['jshint', 'concat']
      },
      compass: {
        files: ['<%= config.in %>/style/{,*/}*.{scss,sass}'],
        tasks: ['compass:dev', 'autoprefixer']
      }
    },

    // Empties folders to start fresh
    clean: {
      out: {
        files: [{
          dot: true,
          src: ['<%= config.out %>/css', '<%= config.out %>/js']
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.in %>/scripts/{,*/}*.js',
        '!<%= config.in %>/scripts/vendor/*'
      ]
    },

    // Concatinate js files according to concat.json file
    concat: {
      out: {
        files: (function (options) {
          var reformatted = {},
              reformatter = function (value) {
                return '<%= config.in %>/scripts/'+value;
              };

          for (var prop in options) {
            reformatted['<%= config.out %>/js/'+prop] = options[prop].map(reformatter);
          }

          return reformatted;
        })(grunt.file.readJSON(config.in+'/scripts/concat.json'))
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        importPath: 'bower_components',
        fontsDir: '<%= config.out %>/fonts',
        httpFontsPath: '/fonts',
        spriteLoadPath: '<%= config.in %>/sprites',
        generatedImagesDir: '<%= config.out %>/img',
        httpGeneratedImagesPath: '/img',
        sassDir: '<%= config.in %>/style',
        cssDir: '<%= config.out %>/css'
      },
      dev: {
        options: {
          sourcemap: true
        }
      },
      out: {
        options: {
          environment: 'production'
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      out: {
        files: [{
          expand: true,
          cwd: '<%= config.out %>/css/',
          src: '{,*/}*.css',
          dest: '<%= config.out %>/css/'
        }]
      }
    },

    // The following *-min tasks produce minified files in the out folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.in %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.out %>/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.in %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.out %>/img'
        }]
      }
    },

    uglify: {
      out: {
        files: [{
          expand: true,
          cwd: '<%= config.out %>/js',
          src: '*.js',
          dest: '<%= config.out %>/js'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      out: {
        expand: true,
        dot: true,
        cwd: '.',
        src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
        dest: '<%= config.out %>/fonts/bootstrap',
        flatten: true
      }
    }

  });

  grunt.registerTask('build', [
    'clean',
    'copy',
    'concat',
    'uglify',
    'compass:out',
    'autoprefixer',
    'imagemin',
    'svgmin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);
};
