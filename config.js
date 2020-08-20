module.exports = function () {
  return {
    dev: true,
    version: '1.1.0',
    seo: {
      url: 'http://viz.bigdive.eu'
    },
    css: [
      '/node_modules/normalize.css/normalize.css',
      '/style.css'
    ],
    libs: [
      '/node_modules/jquery/dist/jquery.min.js',
      '/node_modules/d3/dist/d3.min.js',
      '/libs/gsap/gsap.min.js',
      '/libs/gsap/ScrambleTextPlugin.min.js',
      '/node_modules/slugify/index.js',
      '/node_modules/iso-countries/dist/countries.min.js'
    ],
    js: [
      '/js/app.js',
      '/js/all_divers.js',
      '/js/edition_labels.js',
      '/js/by_divers.js',
      '/js/by_countries.js',
      '/js/by_vs_country.js',
      '/js/by_gender.js',
      '/js/by_age.js',
      '/js/all_countries.js'
    ]
  }
}
