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

    var minAge = d3.min(editions, d => d3.min(d.values, c => +c.key))
    console.log(minAge)

    var maxAge = d3.max(editions, d => d3.max(d.values, c => +c.key))
    console.log(maxAge)

    var start_age = minAge - 4
    var end_age = maxAge + 4

    editions.forEach(d => {
      for (var age = start_age; age < end_age; ++age) {
        var present = false
        d.values.forEach((c, i) => {
          if (+c.key === age) present = true
        })
        if (!present) {
          d.values.push({key: age + '', values: []})
        }
      }
      d.values.sort((a, b) => d3.ascending(a.key, b.key))
    })

    console.log(editions)

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

    var mapX = d3.scaleLinear()
        .domain([0, end_age - start_age])
        .range([0, pw])

    var mapY = d3.scaleLinear()
        .domain([0, max])
        .range([0, h])

    var line = d3.area()
        .x((d, i) => mapX(i))
        .y1((d, i) => h - mapY(d.values.length))
        .y0(h)
        .curve(d3.curveBasis)

    col.append('path')
        .attr('d', d => line(d.values))
        .style('stroke', 'none')
        .style('fill', '#768797')

    // col.selectAll('circle')
    //     .data(d => d.values)
    //     .enter()
    //     .append('circle')
    //     .attr('r', 3)
    //     .attr('cx', (d, i) => mapX(i))
    //     .attr('cy', (d, i) => h - mapY(d.values.length))
  }

  window.APP.by_age = init
})(window.d3)
