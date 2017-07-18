;(function (d3) {
  window.APP = {}

  d3.csv('BigDivers - data.csv', data => {
    console.log(data)

    data.forEach(d => d.age = Math.random() * 10 + 20)

    var alldiv = APP.all_divers(data)

    APP.edition_labels(data)
    APP.by_divers(data)
    APP.by_countries(data)
    APP.by_gender(data)
    APP.all_countries(data)
  })
})(window.d3)
