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

    var circles = svg.selectAll('circle')
        .data(packed.children)
        .enter()
        .append('circle')
        .attr('r', d => d.r)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        // .style('fill', d => cols(d.data.NATION))
        .on('mouseenter', (d) => {
          this.select(d.data.NATION)
        })
        .on('mouseleave', (d) => {
          this.deselect()
        })

    this.select = function (id) {
      console.log(id)
      circles.each(function (d) {
        var c = '#fff'
        if (d.data.NATION === id) {
          c = 'black'// cols(id)
        }
        d3.select(this)
            .style('fill', c)
      })
    }

    this.deselect = function () {
      circles.style('fill', null)
    }

    return this
  }

  window.APP.all_divers = init
})(window.d3)
