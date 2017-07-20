;(function (d3) {
  function init (data) {
    var editions = d3.nest()
                    .key(d => d.edition)
                    .sortKeys(d3.ascending)
                    .rollup(d => {
                      return [
                        d3.sum(d, c => (c.country === 'IT') ? 1 : 0),
                        d3.sum(d, c => (c.country !== 'IT') ? 1 : 0)
                      ]
                    })
                    .entries(data)

    console.log(editions)
    // editions.forEach(d => {
    //   d.values.sort((a, b) => d3.descending(a.values.length, b.values.length))
    // })

    var w = 500 // document.body.clientWidth
    var h = 100
    var padX = 24
    var padY = 12

    var pw = w / editions.length

    var max = d3.max(editions, d => {
      return d3.max(d.value, c => c)
    })

    var mapH = d3.scaleLinear()
                .domain([0, max])
                .range([0, h - padY * 2])

    var maxEl = d3.max(editions, d => {
      return d.value.length
    })
    var fx = (pw - padX * 2) / maxEl

    var svg = d3.select('#by_vs_country').attr('viewBox', `0 0 ${w} ${h}`)

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

    col.selectAll('rect')
        .data(d => d.value)
        .enter()
        .append('rect')
        .attr('width', fx - 1)
        .attr('height', d => mapH(d))
        .attr('x', (d, i) => padX + i * fx)
        .attr('y', d => h - mapH(d))
        .style('fill', (d, i) => window.APP.vsPalette[i])

    col.selectAll('text')
        .data(d => d.value)
        .enter()
        .append('text')
        .text(d => d)
        .attr('y', d => h - mapH(d) - 2)
        .attr('x', (d, i) => padX + i * fx + 1)
        .style('font-size', 7)
        .style('fill', '#000')
  }

  window.APP.by_vs_country = init
})(window.d3)
