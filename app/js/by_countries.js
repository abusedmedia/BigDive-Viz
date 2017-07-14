;(function (d3) {
  function init (data) {
    var editions = d3.nest()
                    .key(d => d.EDITION)
                    .sortKeys(d3.ascending)
                    .key(d => d.NATION)
                    .entries(data)

    editions.forEach(d => {
      d.values.sort((a, b) => d3.descending(a.values.length, b.values.length))
    })

    console.log(editions)

    var w = document.body.clientWidth
    var h = 75
    var pw = w / editions.length

    var cols = d3.scaleOrdinal(d3.schemeCategory20)

    var max = d3.max(editions, d => {
      return d3.max(d.values, c => c.values.length)
    })

    var mapH = d3.scaleLinear()
                .domain([0, max])
                .range([0, h])

    var svg = d3.select('#by_countries').attr('viewBox', `0 0 ${w} ${h}`)

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

    col.selectAll('rect')
        .data(d => d.values)
        .enter()
        .append('rect')
        .attr('width', 5)
        .attr('height', d => mapH(d.values.length))
        .attr('x', (d, i) => i * 6)
        .attr('y', d => h - mapH(d.values.length))
        .style('fill', d => cols(d.key))
  }

  window.APP.by_countries = init
})(window.d3)
