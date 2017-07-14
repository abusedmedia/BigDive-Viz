;(function (d3) {
  function init (data) {
    var w = 550 // document.body.clientWidth
    var h = 350

    var svg = d3.select('#all_divers').attr('viewBox', `0 0 ${w} ${h}`)

    var pack = d3.pack()
                    .size([w, h])
                    .padding(1)
                    .radius(() => 10)

    var str = d3.hierarchy({root: 'r', children: data})
                            .sort(null)

    var packed = pack(str)
    console.log(packed)

    var cols = d3.scaleOrdinal(d3.schemeCategory20)

    svg.selectAll('circle')
        .data(packed.children)
        .enter()
        .append('circle')
        .attr('r', 0)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .style('fill', d => cols(d.data.NATION))
        .transition()
        .duration(1000)
        .delay((d, i) => {
          return i * 30
        })
        .attr('r', d => d.r)
  }

  window.APP.all_divers = init
})(window.d3)
