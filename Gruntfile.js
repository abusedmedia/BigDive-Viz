module.exports = function (grunt) {
  var config = require('./config')()
  var css = config.css.map(d => d = 'public' + d)
  var libs = config.libs.map(d => d = 'public' + d)
  var js = config.js.map(d => d = 'public' + d)

  grunt.initConfig({

    clean: {
      pre: ['public/package.json'],
      post: ['public/node_modules']
    },

    concat: {
      css: {
        options: {
          separator: '\n/* ---- */\n',
          sourceMap: false
        },
        src: css,
        dest: 'public/app.css'
      },
      libs: {
        options: {
          separator: ';\n',
          sourceMap: false
        },
        src: libs,
        dest: 'public/libs.js'
      },
      js: {
        options: {
          separator: ';\n',
          sourceMap: false
        },
        src: js,
        dest: 'public/app.js'
      }
    },

    postcss: {
      options: {
        map: false, // inline sourcemaps
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'public/app.css'
      }
    },

    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'public',
          src: ['**/*.html', '*.html'],
          dest: 'public'
        }]
      }
    },

    babel: {
      options: {
        sourceMap: false,
        presets: ['env']
      },
      dist: {
        files: {
          'public/app.js': ['public/app.js']
        }
      }
    },

    uglify: {
      options: {
      },
      dist: {
        files: {
          'public/app.js': ['public/app.js']
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'public'
      },
      src: ['**']
    }
  })

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('default', ['clean:pre', 'concat', 'postcss', 'babel', 'uglify', 'htmlmin', 'clean:post'])
  grunt.registerTask('pub', ['gh-pages'])
}
