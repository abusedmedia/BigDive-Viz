;(function (d3) {
  function init (data) {
    var w = 550 // document.body.clientWidth
    var h = 300
    var h2 = 275

    var countries = d3.nest().key(d => d.country).entries(data)
    var genders = d3.nest().key(d => d.gender).entries(data)
    var editions = d3.nest().key(d => d.edition).entries(data)

    var circles

    var svg = d3.select('#all_divers svg').attr('viewBox', `0 0 ${w} ${h}`)
    var dots = svg.append('g')
    svg.selectAll(`#breads rect`)
        .attr('opacity', 0.2)

    var tool

    var pack = d3.pack()
                    .size([w, h2])
                    .padding(3)
                    // .radius(() => Math.random() + 10)

    var states = ['intro', 'diver', 'country', 'gender', 'age']
    var indexState = 0
    var prevState

    function draw () {
      var key = states[indexState]

      var str = d3.hierarchy({root: 'r', children: data})
                              .sort((a, b) => d3.ascending(a.data[key], b.data[key]))
                              .sum(d => d.num)

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

        case 'age':
          var min = d3.min(data, d => (d.age !== '') ? +d.age : 100)
          var max = d3.max(data, d => +d.age)
          scramble(`Age range: ${min} - ${max}`)
          break

        case 'edition':
          scramble(`edition`)
          break
      }

      circles = dots.selectAll('.elements')
          .data(packed.children, d => d.data.id)

      var newcircles = circles.enter()
          .append('g')
          .classed('elements', true)
          .attr('transform', `translate(${w / 2}, ${h / 2})`)

      newcircles.append('circle')
        .attr('r', d => d.r)
        .classed('intro', true)
        .attr('display', 'none')
        .style('fill', '#768797')

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
        .attr('display', 'none')

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
        .attr('display', 'none')

      newcircles.append('circle')
          .attr('r', d => d.r)
          .classed('gender', true)
          .style('fill', d => window.APP.genderPalette[d.data.gender])
          .attr('display', 'none')

      // newcircles.append('circle')
      //   .attr('r', d => d.r)
      //   .classed('edition', true)
      //   .style('fill', (d, i) => window.APP.editionPalette[d.data.edition])
      //   .attr('display', 'none')

      var min = d3.min(data, d => (d.age !== '') ? +d.age : 100)
      var max = d3.max(data, d => +d.age)

      var mapAge = d3.scaleLinear()
        .domain([min, max])
        .range(['#D80F0C', '#000'])

      newcircles.append('circle')
        .attr('r', d => d.r)
        .classed('age', true)
        .style('fill', (d, i) => mapAge(d.data.age))
        .attr('display', 'none')

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
          // .transition()
          // .duration(0)
          // .attr('opacity', 0)
          .attr('display', 'none')

        var prevIndex = states.indexOf(prevState)
        svg.selectAll(`#breads rect:nth-child(${prevIndex + 1})`)
          .transition()
          .attr('opacity', 0.2)
      }

      prevState = key

      svg.selectAll(`#breads rect:nth-child(${indexState + 1})`)
        .transition()
        .attr('opacity', 1)

      circles.merge(newcircles).selectAll('.' + key)
        .attr('transform', 'scale(.01)')
        .attr('display', 'block')
        .transition()
        .delay((d, i) => {
          return Math.random() * 500
        })
        .duration(750)
        .ease(d3.easeExpInOut)
        // .attr('opacity', 1)
        .attr('transform', 'scale(1)')

      circles.on('mouseenter', (d) => {
        var name = `${d.data.first_name} ${d.data.last_name}`
        if (key === 'country') name = getCountryName(d.data.country)
        if (key === 'age') name = d.data.age
        tool.select('text').text(name)
        tool.attr('transform', `translate(${d.x}, ${d.y - 35})`)
          .attr('opacity', 1)
          // .transition()
          // .ease(d3.easeExpInOut)
          // .duration(350)
          // .attr('transform', `translate(${d.x}, ${d.y - 35})`)
            // this.select(d.data.country)
      })
      .on('mouseleave', (d) => {
        tool.attr('opacity', 0)
        // this.deselect()
      })
    }

    draw()
    createToolTip()

    svg.select('#right').on('click', function () {
      indexState++
      if (indexState >= states.length) indexState = 0
      draw()
    })

    svg.select('#left').on('click', function () {
      indexState--
      if (indexState < 0) indexState = states.length - 1
      draw()
    })

    this.select = function (id) {
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
      TweenMax.to('#subtitle', 1, {scrambleText: {text: str, chars: '1234567890', speed: 0.5}, delay: 0.75, ease: Linear.easeNone})
    }

    function createToolTip () {
      var ww = 100
      var hh = 20

      tool = svg.append('g')
        .attr('id', 'tooltip')
        .attr('opacity', 0)

      tool.append('rect')
        .attr('width', ww)
        .attr('height', hh)
        .attr('x', ww / 2 * -1)
        .attr('y', 0)
        .style('fill', 'black')

      tool.append('polygon')
        .attr('points', '0 0 14 0 7 6')
        .style('fill', 'black')
        .attr('transform', `translate(-7, ${hh - 1})`)

      tool.append('text')
        .style('fill', 'white')
        .style('text-anchor', 'middle')
        .style('font-size', '10')
        .attr('y', 14)
        .text('Fabio Franchino')
    }

    return this
  }

  window.APP.all_divers = init
})(window.d3)
