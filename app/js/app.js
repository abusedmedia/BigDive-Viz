;(function (d3) {
  window.APP = {}

  var cols = ['#DFC5B4', '#C8AB95', '#668597', '#416783', '#819593', '#767570', '#C54443', '#A73835', '#9B4321', '#4F332B', '#754F3C', '#F1A353', '#F28C53', '#F7C195', '#F6B692']
  window.APP.countryPalette = d3.shuffle(cols)
  window.APP.genderPalette = {M: '#46BDB7', F: '#F3675D'}
  window.APP.vsPalette = ['IndianRed', 'steelblue']
  window.APP.editionPalette = d3.shuffle(cols)

  window.APP.faces = ['1f61f', '1f62a', '1f62b', '1f62c', '1f62d', '1f62e', '1f62f', '1f63a', '1f63b', '1f63c', '1f63d', '1f63e', '1f63f', '1f617', '1f618', '1f619', '1f620', '1f621', '1f622', '1f623', '1f624', '1f625', '1f626', '1f627', '1f628', '1f629', '1f630', '1f631', '1f632', '1f633', '1f634', '1f635', '1f636', '1f637', '1f638', '1f639', '1f640']

  d3.csv('assets/BigDivers - data.csv', data => {
    console.log(data)

    data.forEach(d => d.age = Math.random() * 10 + 20)

    var alldiv = APP.all_divers(data)

    APP.edition_labels(data)
    APP.by_divers(data)
    APP.by_countries(data)
    APP.by_vs_country(data)
    APP.by_gender(data)
    // APP.all_countries(data)
  })
})(window.d3)
