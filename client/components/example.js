import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

export const Example = props => {
  const {audioFeatures} = props

  const data = [
    {
      track: [
        {
          name: 'danceability',
          value: audioFeatures.danceability
        },
        {
          name: 'energy',
          value: audioFeatures.energy
        },
        {
          name: 'speechiness',
          value: audioFeatures.speechiness
        },
        {
          name: 'acousticness',
          value: audioFeatures.acousticness
        },
        {
          name: 'instrumentalness',
          value: audioFeatures.instrumentalness
        },
        {
          name: 'liveness',
          value: audioFeatures.liveness
        }
      ]
    }
  ]

  console.log('data', data[0])

  let width = 420

  let x = d3
    .scaleLinear()
    .domain([0, d3.max(data[0].track, dataPoint => dataPoint.value)])
    .range([0, width])
  let y = d3
    .scaleBand()
    .domain(data[0].track.map(dataPoint => dataPoint.name))
    .range([0, 20 * data[0].track.length])

  return (
    <svg
      width={width}
      height={y.range()[1]}
      fontFamily="sans-serif"
      fontSize="10"
      textAnchor="end"
    >
      {data[0].track.map((dataPoint, i) => (
        <g key={i} transform={`translate(0,${y(dataPoint.name)})`}>
          <rect
            fill="steelblue"
            width={x(dataPoint.value)}
            height={y.bandwidth() - 1}
          />
          <text
            fill="white"
            x={x(dataPoint.value)}
            y={y.bandwidth() / 2}
            dy="0.35em"
          >
            {dataPoint.name}
          </text>
        </g>
      ))}
    </svg>
  )
}

const mapState = state => {
  return {
    topCharts: state.topCharts,
    audioFeatures: state.audioFeatures
  }
}

export default connect(mapState)(Example)

// sample chart for audio features
// https://www.d3-graph-gallery.com/spider.html

// usage of transitions
// https://www.d3-graph-gallery.com/graph/interactivity_transition.html
