import React from 'react'
import * as d3 from 'd3'

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

export class Example extends React.Component {
  render() {
    return (
      <svg
        width={width}
        height={y.range()[1]}
        fontfamily="sans-serif"
        fontSize="10"
        textAnchor="end"
      >
        {data.map((d, i) => (
          <g key={i} transform={`translate(0,${y(d.Artist)})`}>
            <rect
              fill="steelblue"
              width={x(d.Streams)}
              height={y.bandwidth() - 1}
            />
            <text
              fill="white"
              x={x(d.Streams)}
              y={y.bandwidth() / 2}
              dy="0.35em"
            >
              {d.Artist}
            </text>
          </g>
        ))}
      </svg>
    )
  }
}
