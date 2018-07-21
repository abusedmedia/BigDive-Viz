const Metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')
const browserSync = require('metalsmith-browser-sync')
const markdown = require('metalsmith-markdown')
const config = require('./config')()

Metalsmith(__dirname)
    .source('./content')
    .destination('./dev')
    .metadata(config)
    .clean(false)
    .use(markdown())
    .use(layouts({
      engine: 'ejs',
      default: 'index.ejs',
      pattern: '*.html'
    }))
    .use(browserSync({
      server: ['dev', 'static'],
      files: ['content/**/*', 'layouts/**/*', 'static/**/*'],
      open: false
    }))
    .build(function (err) {
      if (err) console.log(err)
    })
