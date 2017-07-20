;(function (d3) {
  function init (data) {
    var editions = d3.nest()
                    .key(d => d.edition)
                    .sortKeys(d3.ascending)
                    .entries(data)

    var w = 500 // document.body.clientWidth
    var h = 100
    var padX = 24
    var padY = 12
    var pw = w / editions.length

    var max = d3.max(editions, d => {
      return d.values.length
    })

    var mapH = d3.scaleLinear()
                .domain([0, max])
                .range([0, h - padY * 2])

    var fx = (pw - padX * 2)

    var svg = d3.select('#by_divers').attr('viewBox', `0 0 ${w} ${h}`)

    var col = svg.append('g')
            .selectAll('g')
            .data(editions)
            .enter()
            .append('g')
            .attr('transform', (d, i) => `translate(${pw * i},0)`)

    col.filter((d, i) => i > 0)
        .append('line')
        .attr('y1', 0)
        .attr('y2', h)
        .style('stroke', '#fff')

    col.append('rect')
        .attr('width', fx - 1)
        .attr('height', d => mapH(d.values.length))
        .attr('x', padX)
        .attr('y', d => h - mapH(d.values.length))

    col.append('text')
        .text(d => d.values.length)
        .attr('y', d => h - mapH(d.values.length) + 12)
        .attr('x', padX + 1)
        .style('font-size', 12)
        .style('fill', '#fff')
  }

  window.APP.by_divers = init
})(window.d3)
