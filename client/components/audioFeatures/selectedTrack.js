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
    <div className="selected-track-main">
      <div className="selected-track-info">
        <iframe
          src={`https://open.spotify.com/embed/track/${selectedTrack.uri.substring(
            14
          )}`}
          width="300"
          height="80"
          allow="encrypted-media"
        />
        <div>
          <h3>
            #{selectedTrack.position}: {selectedTrack.artist} - "{
              selectedTrack.trackName
            }"
          </h3>
          <h3>Streams: {selectedTrack.streams}</h3>
        </div>
      </div>
      <div className="selected-track-features">
        <svg
          width={width}
          height={y.range()[1]}
          fontFamily="sans-serif"
          fontSize="18"
        >
          {selectedTrack.features.map((dataPoint, i) => (
            <g key={i} transform={`translate(0,${y(dataPoint.name)})`}>
              <rect
                fill="darkslategray"
                width={x(dataPoint.value)}
                height={y.bandwidth() - 1}
              />
              <text
                fill="darkseagreen"
                x={x(0)}
                y={y.bandwidth() / 2}
                dy="0.35em"
              >
                {dataPoint.name}: {dataPoint.value}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    selectedTrack: state.selectedTrack
  }
}

export default connect(mapState)(SelectedTrack)
