;(function (d3) {
  function init (data) {
    var w = 550 // document.body.clientWidth
    var h = 250

    var circles

    var svg = d3.select('#all_divers').attr('viewBox', `0 0 ${w} ${h}`)

    var pack = d3.pack()
                    .size([w, h])
                    .padding(1)
                    // .radius(() => Math.random() + 10)

    var states = ['', 'country', 'gender', 'edition']
    var indexState = 0

    var countryColor = d3.scaleOrdinal(d3.schemeCategory20)
    var genderColor = d3.scaleOrdinal().domain(['M', 'F']).range(['blue', 'pink'])
    var editionColor = d3.scaleOrdinal(d3.schemeCategory20)

    function draw (key) {
      var str = d3.hierarchy({root: 'r', children: data})
                              .sort((a, b) => d3.ascending(a.data[key], b.data[key]))
                              .sum(d => d.age)

      var packed = pack(str)

      circles = svg.selectAll('circle')
          .data(packed.children, d => d.data.id)

      var newcircles = circles.enter()
          .append('circle')
          .attr('r', 0)
          .attr('cx', w / 2)
          .attr('cy', h / 2)

      circles.merge(newcircles)
          .transition()
          .duration(1000)
          .ease(d3.easeExpInOut)
          .delay((d, i) => i * 10)
          .attr('r', d => d.r)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .style('fill', d => {
            var c = 'white'
            if (states[indexState] == 'country') {
              c = countryColor(d.data.country)
            }
            if (states[indexState] == 'gender') {
              c = genderColor(d.data.gender)
            }
            if (states[indexState] == 'edition') {
              c = editionColor(d.data.edition)
            }
            return c
          })

      circles.on('mouseenter', (d) => {
        console.log(d.data)
            // this.select(d.data.country)
      })
      .on('mouseleave', (d) => {
        // this.deselect()
      })
    }

    draw()

    svg.on('click', function () {
      draw(states[indexState])
      indexState++
      if (indexState >= states.length) indexState = 0
    })

    this.select = function (id) {
      console.log(id)
      circles.each(function (d, i) {
        var c = '#fff'
        if (d.data.country === id) {
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
