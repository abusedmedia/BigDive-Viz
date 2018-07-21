;(function (d3) {
  function init (data) {
    var editions = d3.nest()
                    .key(d => d.edition)
                    .sortKeys(d3.ascending)
                    .key(d => d.age)
                    .sortKeys(d3.ascending)
                    .entries(data)

    // remove nonage fields
    editions.forEach(d => {
      d.values.forEach((c, i) => {
        if (c.key === '') d.values.splice(i, 1)
      })
    })

    editions.forEach(d => {
      var prev = null
      var temp = []
      d.values.forEach((c, i) => {
        if (prev) {
          var diff = (+c.key - prev) - 1
          if (diff > 0) {
            for (var i = 0; i < diff; ++i) {
              temp.push({key: (prev + i + 1) + '', values: []})
            }
          }
        }
        prev = +c.key
      })
      d.values = d.values.concat(temp)
      d.values.sort((a, b) => d3.ascending(a.key, b.key))
    })

    console.log(editions)

    var minAge = d3.min(editions, d => d3.min(d.values, c => +c.key)) - 2
    var maxAge = d3.max(editions, d => d3.max(d.values, c => +c.key)) + 2
    console.log(minAge, maxAge)

    var w = 500 // document.body.clientWidth
    var h = 100
    var padX = 24
    var padY = 12

    var pw = w / editions.length
    var ph = h - 15

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

    var svg = d3.select('#by_age').attr('viewBox', `0 0 ${w} ${h}`)

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

    var mapY = d3.scaleLinear()
        .domain([0, max])
        .range([0, ph])

    var mapX = d3.scaleLinear()
                .domain([minAge, maxAge])
                .range([10, pw - 10])

    col.append('path')
        .attr('d', d => {
          var mn = d3.min(d.values, c => +c.key)
          var mx = d3.max(d.values, c => +c.key)

          console.log(mn, mx)

          var line = d3.area()
                .x(d => mapX(+d.key))
                .y1(d => ph - mapY(d.values.length))
                .y0(ph)
                .curve(d3.curveBasis)

          return line(d.values)
        })
        .style('stroke', 'none')
        .style('fill', '#768797')

    col.append('g')
        .attr('transform', `translate(0,${h - 13})`)
        .classed('ax', true)
        .each(function (d) {
          var mn = d3.min(d.values, c => +c.key)
          var mx = d3.max(d.values, c => +c.key)

          // var mapX = d3.scaleLinear()
          //       .domain([minAge, maxAge])
          //       .range([10, pw - 10])

          var ax = d3.axisBottom(mapX)
            .tickValues([minAge, maxAge])

          d3.select(this)
                .call(ax)
        })

    // col.selectAll('circle')
    //   .data(d => d.values)
    //   .enter()
    //   .filter(d => d.values.length > 0)
    //   .append('circle')
    //   .attr('r', 1)
    //   .attr('cx', d => mapX(+d.key))
    //   .attr('cy', d => ph - mapY(d.values.length))
    //   .style('fill', '#D80F0C')
  }

  window.APP.by_age = init
})(window.d3)
