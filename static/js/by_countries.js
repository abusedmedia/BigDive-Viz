;(function (d3) {
  function init (data) {
    var editions = d3.nest()
                    .key(d => d.edition)
                    .sortKeys(d3.ascending)
                    .key(d => d.country)
                    .entries(data)

    editions.forEach(d => {
      d.values.sort((a, b) => d3.descending(a.values.length, b.values.length))
    })

    console.log(editions)

    var w = 500 // document.body.clientWidth
    var h = 100
    var pad = 8
    var pw = w / editions.length

    var max = d3.max(editions, d => {
      return d3.max(d.values, c => c.values.length)
    })

    var mapH = d3.scaleLinear()
                .domain([0, max])
                .range([0, h - pad * 4])

    var maxEl = d3.max(editions, d => {
      return d.values.length
    })
    var fx = (pw - pad * 2) / maxEl

    var svg = d3.select('#by_countries').attr('viewBox', `0 0 ${w} ${h}`)

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

    var gr = col.append('g')
        .attr('transform', d => `translate(${((maxEl - d.values.length) * (fx)) / 2},0)`)

    var rects = gr.selectAll('rect')
        .data(d => d.values)
        .enter()
        .append('rect')
        .attr('width', fx - 1)
        .attr('height', d => mapH(d.values.length))
        .attr('x', (d, i) => pad + i * fx)
        .attr('y', d => h - mapH(d.values.length) - pad - 2)
        .style('fill', '#768797')

    gr.selectAll('image')
        .data(d => d.values)
        .enter()
        .append('image')
        .attr('xlink:href', d => `assets/flags/1x1/${d.key.toLowerCase()}.svg`)
        .attr('x', (d, i) => pad + i * fx)
        .attr('width', fx - 1)
        .attr('height', fx - 1)
        .attr('y', d => h - fx)

    gr.selectAll('text')
        .data(d => d.values)
        .enter()
        .append('text')
        .text(d => d.values.length)
        .attr('y', d => h - mapH(d.values.length) - pad - 4)
        .attr('x', (d, i) => pad + i * fx)
        .style('font-size', 7)
        .style('fill', '#000')

    rects.on('mouseenter', function (d) {
      rects.style('fill', '#fff')
      rects.each(function (c) {
        if (c.key === d.key) d3.select(this).style('fill', '#D80F0C')
      })
    })

    rects.on('mouseleave', function () {
      rects.style('fill', '#768797')
    })
  }

  window.APP.by_countries = init
})(window.d3)
