;(function (d3) {
  function init (data) {
    var countries = d3.nest()
                    .key(d => d.NATION)
                    .sortKeys(d3.ascending)
                    .entries(data)

    countries.sort((a, b) => d3.descending(a.values.length, b.values.length))

    console.log(countries)

    var w = document.body.clientWidth
    var ph = 10
    var h = countries.length * ph

    var cols = d3.scaleOrdinal(d3.schemeCategory20)

    var svg = d3.select('#all_countries').attr('viewBox', `0 0 ${w} ${h}`)

    var row = svg.append('g')
            .selectAll('g')
            .data(countries)
            .enter()
            .append('g')
            .attr('transform', (d, i) => `translate(0,${ph * i})`)

    var max = d3.max(countries, d => d.values.length)

    var mapW = d3.scaleLinear()
                .domain([0, max])
                .range([0, w])

    row.append('rect')
        .attr('width', d => mapW(d.values.length))
        .attr('height', ph)
        .style('fill', d => cols(d.key))
  }

  window.APP.all_countries = init
})(window.d3)
