;(function (d3) {
  function init (data) {
    var editions = d3.nest()
                    .key(d => d.EDITION)
                    .sortKeys(d3.ascending)
                    .entries(data)

    d3.select('#edition_labels')
        .selectAll('div')
        .data(editions)
        .enter()
        .append('div')
        .text(d => d.key)
  }

  window.APP.edition_labels = init
})(window.d3)
