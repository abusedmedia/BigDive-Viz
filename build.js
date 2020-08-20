const Metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')
const assets = require('metalsmith-assets')
const markdown = require('metalsmith-markdown')

const config = require('./config')()
config.dev = false

Metalsmith(__dirname)
  .source('./content')
  .destination('./public')
  .metadata(config)
  .use(markdown())
  .use(layouts({
    engine: 'ejs',
    default: 'index.ejs',
    pattern: '*.html'
  }))
  .use(assets({
    source: './static',
    destination: './'
  }))
  .build(function (err) {
    if (err) console.log(err)
  })
