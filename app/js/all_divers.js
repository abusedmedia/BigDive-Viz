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

    var palette = ['#DFC5B4', '#C8AB95', '#668597', '#416783', '#819593', '#767570', '#C54443', '#A73835', '#9B4321', '#4F332B', '#754F3C', '#F1A353', '#F28C53', '#F7C195', '#F6B692']
    palette = d3.shuffle(palette)

    var states = ['', 'country', 'gender', 'edition']
    var indexState = 0

    var countryColor = d3.scaleOrdinal(palette)
    var genderColor = d3.scaleOrdinal().domain(['M', 'F']).range(['#668597', '#C54443'])
    var editionColor = d3.scaleOrdinal(palette)

    function draw () {
      var key = states[indexState]
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
      console.log('click', indexState)
      indexState++
      if (indexState >= states.length) indexState = 0
      draw()
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
