;(function (d3) {
  function init (data) {
    var editions = d3.nest()
                    .key(d => d.EDITION)
                    .sortKeys(d3.ascending)
                    .entries(data)

    var w = document.body.clientWidth
    var h = 150
    var pw = w / editions.length

    var svg = d3.select('#by_divers').attr('viewBox', `0 0 ${w} ${h}`)

    var pack = d3.pack()
                    .size([pw, h])
                    .padding(1)
                    .radius(() => 10)

    editions.forEach(d => {
      var str = d3.hierarchy({root: 'r', children: d.values}).sum(() => 5)
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
        .style('stroke', '#ccc')

    col.append('g')
            .selectAll('circle')
            .data(d => d.pack.children)
            .enter()
            .append('circle')
            .attr('r', 0)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .style('fill', d => cols(d.data.NATION))
            .transition()
            .duration(1000)
            .delay((d, i, p) => {
              return i * 100
            })
            .attr('r', d => d.r)
  }

  window.APP.by_divers = init
})(window.d3)
