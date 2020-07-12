import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

export const SelectedTrack = props => {
  const {selectedTrack, width} = props

  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, width])
  const y = d3
    .scaleBand()
    .domain(selectedTrack.features.map(dataPoint => dataPoint.name))
    .range([0, 50 * selectedTrack.features.length])

  return (
    <div>
      <h3>#{selectedTrack.position}</h3>
      <h3>Artist: {selectedTrack.artist}</h3>
      <h3>Track: {selectedTrack.trackName}</h3>
      <svg
        width={width}
        height={y.range()[1]}
        fontFamily="sans-serif"
        fontSize="18"
      >
        {selectedTrack.features.map((dataPoint, i) => (
          <g key={i} transform={`translate(0,${y(dataPoint.name)})`}>
            <rect
              fill="gray"
              width={x(dataPoint.value)}
              height={y.bandwidth() - 1}
            />
            <text fill="limegreen" x={x(0)} y={y.bandwidth() / 2} dy="0.35em">
              {dataPoint.name}
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
