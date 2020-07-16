import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

const AudioFeaturesGraph = props => {
  const {currentAudioFeature} = props

  const width = window.innerWidth * 0.8

  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, width])
  const y = d3
    .scaleBand()
    .domain(currentAudioFeature.map(dataPoint => dataPoint.trackName))
    .range([0, 35 * currentAudioFeature.length])

  return (
    <section>
      <svg
        viewBox={`0, 0, ${width}, ${y.range()[1]}`}
        width="90vw"
        height="100%"
        className="audio-feature-graph"
      >
        {currentAudioFeature.map((dataPoint, index) => (
          <g
            key={index}
            className="audio-feature-bar"
            transform={`translate(0,${y(dataPoint.trackName)})`}
          >
            <rect
              fill={d3.interpolateWarm(dataPoint.value)}
              width={x(dataPoint.value)}
              height={y.bandwidth() - 1}
            />
            <text
              fill="white"
              x={x(0.01)}
              y={y.bandwidth() / 2}
              dy="0.35em"
              className="is-size-6"
            >
              #{dataPoint.position}: {dataPoint.artist} - "{dataPoint.trackName}"
            </text>
          </g>
        ))}
      </svg>
    </section>
  )
}

const mapState = state => {
  return {
    currentAudioFeature: state.currentAudioFeature
  }
}

export default connect(mapState)(AudioFeaturesGraph)
