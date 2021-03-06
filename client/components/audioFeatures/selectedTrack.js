import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

const SelectedTrack = props => {
  const {selectedTrack, width} = props

  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, width])
  const y = d3
    .scaleBand()
    .domain(selectedTrack.features.map(dataPoint => dataPoint.name))
    .range([0, 40 * selectedTrack.features.length])

  return (
    <div className="container">
      <h5 className="is-size-6 mb-2">Audio Features:</h5>
      <svg
        viewBox={`0, 0, ${width}, ${y.range()[1]}`}
        width="100%"
        height={y.range()[1]}
      >
        {selectedTrack.features.map((dataPoint, i) => (
          <g key={i} transform={`translate(0,${y(dataPoint.name)})`}>
            <rect
              fill={d3.interpolateGreens(dataPoint.value)}
              width={x(dataPoint.value)}
              height={y.bandwidth() - 1}
            />
            <text
              fill="white"
              x={x(0.04)}
              y={y.bandwidth() / 2}
              dy="0.35em"
              className="is-size-6"
            >
              {dataPoint.name}: {dataPoint.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

const mapState = state => {
  return {
    selectedTrack: state.selectedTrack
  }
}

export default connect(mapState)(SelectedTrack)
