'use strict'

var path = require('path')

module.exports = function (grunt, options) {
  return {

    bake: {
      options: {
        // data: '<%= datas %>', why it doesnt work?
        basepath: options.folders.app
      },

      files: [
        {
          expand: true,
          cwd: options.folders.app,
          src: ['*.html', '*/*.html', '!components/*.html'],
          dest: options.folders.app
        }
      ]
    }

  }
}
