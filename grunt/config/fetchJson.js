'use strict'

var path = require('path')
var moment = require('moment')

module.exports = function (grunt, options) {
  var url = 'http://some/api'

  var folders = options.folders
  var env = options.env

  var date = moment().toISOString().replace(/:/g, '-').split('.')
  var key = env.fbroot // key in config file
  var pat = `bk/${date[0]}_${key}.json`
  var files = {}
  files[pat] = `https://xxxxxidxxxxxx.firebaseio.com/${env.fbroot}.json` // id in firebase project

  return {

    fetchSomeApi: {
      options: {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        parameters: {
          access_token: 'xxxxxxx'
        }
      },
      files: {
        'path/to/file.json': url
      }
    },
    fbackup: {
      options: {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },
      files: files
    }

  }
}
