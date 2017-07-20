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
                    .padding(3)
                    // .radius(() => Math.random() + 10)

    var states = ['intro', 'diver', 'country', 'gender']
    var indexState = 0
    var prevState

    function draw () {
      var key = states[indexState]

      var str = d3.hierarchy({root: 'r', children: data})
                              .sort((a, b) => d3.ascending(a.data[key], b.data[key]))
                              .sum(d => d.age)

      var packed = pack(str)

      switch (key) {
        case 'intro':
          scramble(`Explore BigDive through the participants`)
          break

        case 'diver':
          scramble(`There are ${data.length} divers over ${editions.length} editions`)
          break

        case 'country':
          scramble(`From ${countries.length} different countries`)
          break

        case 'gender':
          var perc = 100 * genders[1].values.length / data.length
          scramble(`${parseInt(perc)}% are ladies`)
          break

        case 'edition':
          scramble(`edition`)
          break
      }

      circles = svg.selectAll('g')
          .data(packed.children, d => d.data.id)

      var newcircles = circles.enter()
          .append('g')
          .attr('transform', `translate(${w / 2}, ${h / 2})`)

      newcircles.append('circle')
          .attr('r', d => d.r)
          .classed('intro', true)
          .attr('opacity', 0)

      newcircles.append('image')
        .classed('diver', true)
        .attr('xlink:href', d => {
          var index = parseInt(Math.random() * APP.faces.length)
          return `assets/faces/${APP.faces[index]}.png`
        })
        .attr('width', d => d.r * 2)
        .attr('height', d => d.r * 2)
        .attr('x', d => -d.r)
        .attr('y', d => -d.r)
        .attr('opacity', 0)

      newcircles.append('image')
        .classed('country', true)
        .attr('xlink:href', d => {
          var c = getCountryName(d.data.country).toLowerCase().replace(/ /g, '-')
          return `assets/flag/svg/${c}.svg`
        })
        .attr('width', d => d.r * 2)
        .attr('height', d => d.r * 2)
        .attr('x', d => -d.r)
        .attr('y', d => -d.r)
        .attr('opacity', 0)

      newcircles.append('circle')
          .attr('r', d => d.r)
          .classed('gender', true)
          .attr('opacity', 0)
          .style('fill', d => window.APP.genderPalette[d.data.gender])

      newcircles.append('circle')
          .attr('r', d => d.r)
          .classed('edition', true)
          .attr('opacity', 0)
          .style('fill', (d, i) => window.APP.editionPalette[d.data.edition])

      circles.merge(newcircles)
          // .transition()
          // .duration(100)
          .attr('transform', d => `translate(${d.x}, ${d.y})`)
          // .transition()
          // .duration(750)
          // .ease(d3.easeExpIn)
          // .delay((d, i) => i * 1)
          // .attr('transform', d => `translate(${d.x}, ${d.y})`)
          // .attr('opacity', 0)
          // .transition()
          // .duration(750)
          // .ease(d3.easeExpOut)
          // .attr('opacity', 1)
          // .style('fill', d => {
          //   var c = '#ccc'
          //   if (states[indexState] == 'country') {
          //     c = countryColor(d.data.country)
          //   }
          //   if (states[indexState] == 'gender') {
          //     c = genderColor(d.data.gender)
          //   }
          //   if (states[indexState] == 'edition') {
          //     c = editionColor(d.data.edition)
          //   }
          //   return c
          // })

      if (prevState) {
        circles.merge(newcircles).selectAll('.' + prevState)
          .transition()
          .duration(0)
          .attr('opacity', 0)
      }

      circles.merge(newcircles).selectAll('.' + key)
        .attr('transform', 'scale(.1)')
        .transition()
        .delay((d, i) => {
          return +d.data.id * 10
        })
        .duration(1000)
        .ease(d3.easeExpInOut)
        .attr('opacity', 1)
        .attr('transform', 'scale(1)')

      prevState = key

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
