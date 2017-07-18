;(function (d3) {
  function init (data) {
    var editions = d3.nest()
                    .key(d => d.edition)
                    .sortKeys(d3.ascending)
                    .entries(data)

    var w = 500 // document.body.clientWidth
    var h = 100
    var pw = w / editions.length
    var pad = 10

    var svg = d3.select('#by_divers').attr('viewBox', `0 0 ${w} ${h}`)

    var pack = d3.pack()
                    .size([pw - pad * 2, h - pad * 2])
                    .padding(1)
                    // .radius(() => 5)

    editions.forEach(d => {
      var str = d3.hierarchy({root: 'r', children: d.values}).sum(() => 5)
                        .sum(d => d.age)

      d.pack = pack(str)
    })

    var cols = d3.scaleOrdinal(d3.schemeCategory20)

    var col = svg.append('g')
            .selectAll('g')
            .data(editions)
            .enter()
            .append('g')
            .attr('transform', (d, i) => `translate(${pw * i},0)`)

    col.append('line')
        .attr('y1', 0)
        .attr('y2', h)
        .style('stroke', '#fff')

    col.append('g')
            .selectAll('circle')
            .data(d => d.pack.children)
            .enter()
            .append('circle')
            .attr('r', d => d.r)
            .attr('cx', d => d.x + pad)
            .attr('cy', d => d.y + pad)
            // .style('fill', d => cols(d.data.NATION))
  }

  window.APP.by_divers = init
})(window.d3)
