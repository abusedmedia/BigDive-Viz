;(function (d3) {
  window.APP = {}

  var cols = ['#DFC5B4', '#C8AB95', '#668597', '#416783', '#819593', '#767570', '#C54443', '#A73835', '#9B4321', '#4F332B', '#754F3C', '#F1A353', '#F28C53', '#F7C195', '#F6B692']
  window.APP.countryPalette = d3.shuffle(cols)
  window.APP.genderPalette = ['#668597', '#C54443']
  window.APP.editionPalette = d3.shuffle(cols)

  d3.csv('assets/BigDivers - data.csv', data => {
    console.log(data)

    data.forEach(d => d.age = Math.random() * 10 + 20)

    var alldiv = APP.all_divers(data)

    APP.edition_labels(data)
    APP.by_divers(data)
    APP.by_countries(data)
    APP.by_gender(data)
    // APP.all_countries(data)
  })
})(window.d3)
