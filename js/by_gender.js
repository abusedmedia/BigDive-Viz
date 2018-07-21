;(function (d3) {
  function init (data) {
    var editions = d3.nest()
                    .key(d => d.edition)
                    .sortKeys(d3.ascending)
                    .key(d => d.gender)
                    .entries(data)

    editions.forEach(d => {
      d.values.sort((a, b) => d3.descending(a.values.length, b.values.length))
    })

    var w = 500 // document.body.clientWidth
    var h = 100
    var padX = 24
    var padY = 12

    var pw = w / editions.length

    var max = d3.max(editions, d => {
      return d3.max(d.values, c => c.values.length)
    })

    var mapH = d3.scaleLinear()
                .domain([0, max])
                .range([0, h - padY * 2])

    var maxEl = d3.max(editions, d => {
      return d.values.length
    })
    var fx = (pw - padX * 2) / maxEl

    var svg = d3.select('#by_gender').attr('viewBox', `0 0 ${w} ${h}`)

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
        .data(d => d.values)
        .enter()
        .append('rect')
        .attr('width', fx - 1)
        .attr('height', d => mapH(d.values.length))
        .attr('x', (d, i) => padX + i * fx)
        .attr('y', d => h - mapH(d.values.length))
        .style('fill', d => window.APP.genderPalette[d.key])

    col.selectAll('text')
        .data(d => d.values)
        .enter()
        .append('text')
        .text(d => d.values.length)
        .attr('y', d => h - mapH(d.values.length) - 2)
        .attr('x', (d, i) => padX + i * fx + 1)
        .style('font-size', 7)
        .style('fill', '#000')
  }

  window.APP.by_gender = init
})(window.d3)
