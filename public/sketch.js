// {
//   const div = d3.create("div");
//   div.html("Hello, world!");
//   // console.log(div)
//   div.node();
// }

// const svg = d3
//   .select('#app')
//   .append('svg')
//   .attr('width', 500)
//   .attr('height', 500)
//   .style('background-color', '#666666')

// const data = [44, 8, 15, 16, 23, 42]

const data = [
  {
    Artist: 'DaBaby',
    Streams: 5639584
  },
  {
    Artist: 'Jawsh 685',
    Streams: 4769131
  },
  {
    Artist: 'The Weeknd',
    Streams: 4663575
  },
  {
    Artist: 'SAINt JHN',
    Streams: 3969610
  },
  {
    Artist: 'Harry Styles',
    Streams: 3746953
  }
]

const width = 420

const x = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d.Streams)])
  .range([0, width])

const y = d3
  .scaleBand()
  .domain(data.map(d => d.Artist))
  .range([0, 20 * data.length])

const svg = d3
  .select('#app')
  .append('svg') //select the dom element we want to append. then we are appending our svg elements
  .attr('width', width)
  .attr('height', y.range()[1])
  .attr('font-family', 'sans-serif')
  .attr('font-size', '10')
  .attr('text-anchor', 'end')

const bar = svg
  .selectAll('g')
  .data(data)
  .join('g')
  .attr('transform', d => `translate(0,${y(d.Artist)})`)

bar
  .append('rect')
  .attr('fill', 'steelblue')
  .attr('width', d => x(d.Streams))
  .attr('height', y.bandwidth() - 1)

bar
  .append('text')
  .attr('fill', 'white')
  .attr('x', d => x(d.Streams) - 3)
  .attr('y', y.bandwidth() / 2)
  .attr('dy', '0.35em')
  .text(d => d.Artist)
