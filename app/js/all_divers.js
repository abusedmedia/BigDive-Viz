;(function (d3) {
  function init (data) {
    var w = 550 // document.body.clientWidth
    var h = 250

    var countries = d3.nest().key(d => d.country).entries(data)
    var genders = d3.nest().key(d => d.gender).entries(data)
    var editions = d3.nest().key(d => d.edition).entries(data)

    var circles

    var svg = d3.select('#all_divers').attr('viewBox', `0 0 ${w} ${h}`)

    var pack = d3.pack()
                    .size([w, h])
                    .padding(1)
                    // .radius(() => Math.random() + 10)

    var states = ['', 'country', 'gender', 'edition']
    var indexState = 0

    var countryColor = d3.scaleOrdinal(window.APP.countryPalette)
    var genderColor = d3.scaleOrdinal().domain(['M', 'F']).range(window.APP.genderPalette)
    var editionColor = d3.scaleOrdinal(window.APP.editionPalette)

    function draw () {
      var key = states[indexState]

      var str = d3.hierarchy({root: 'r', children: data})
                              .sort((a, b) => d3.ascending(a.data[key], b.data[key]))
                              .sum(d => d.age)

      var packed = pack(str)

      circles = svg.selectAll('circle')
          .data(packed.children, d => d.data.id)

      switch (key) {
        case 'country':
          scramble(`From ${countries.length} different countries`)
          break

        case 'gender':
          var perc = 100 * genders[1].values.length / data.length
          scramble(`${parseInt(perc)}% are ladies`)
          break

        default:
          scramble(`There are ${data.length} divers across ${editions.length} editions`)
      }

      var newcircles = circles.enter()
          .append('circle')
          .attr('r', 0)
          .attr('cx', w / 2)
          .attr('cy', h / 2)

      circles.merge(newcircles)
          .transition()
          .duration(750)
          .ease(d3.easeExpIn)
          .delay((d, i) => i * 1)
          .attr('r', 0)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .transition()
          .duration(750)
          .ease(d3.easeExpOut)
          .attr('r', d => d.r)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .style('fill', d => {
            var c = '#ccc'
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

    function scramble (str) {
      TweenMax.to('#subtitle', 1, {scrambleText: {text: str, chars: '1234567890', speed: 0.5}, delay: 0.5, ease: Linear.easeNone})
    }

    return this
  }

  window.APP.all_divers = init
})(window.d3)
