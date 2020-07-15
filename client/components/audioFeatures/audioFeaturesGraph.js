import React, {useState} from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

import {default as SelectedTrack} from './selectedTrack'
import {default as SettingsBar} from './settingsBar'
import {selectTrack} from '../../store/selectedTrack'

const AudioFeaturesGraph = props => {
  const {dataSet, currentSet, selectedTrack} = props
  const [page, setPage] = useState(0)

  const handleSelectedTrack = event => {
    props.selectTrack(dataSet, event.target.value, page)
  }

  const width = window.innerWidth

  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, width])
  const y = d3
    .scaleBand()
    .domain(currentSet.map(dataPoint => dataPoint.trackName))
    .range([0, 40 * currentSet.length])

  return (
    <div>
      <div className="audio-feature-graph">
        <SettingsBar data={dataSet} page={page} setPage={setPage} />
        <svg
          width={width}
          height={y.range()[1]}
          // fontFamily="sans-serif"
          fontSize="18"
          className="audio-feature-graph"
          padding="0.5em"
        >
          {currentSet.map((dataPoint, index) => (
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
              <text fill="black" x={x(0)} y={y.bandwidth() / 2} dy="0.35em">
                #{dataPoint.position}: {dataPoint.artist} - "{
                  dataPoint.trackName
                }"
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="audio-feature-track-details">
        <div>
          <label htmlFor="selectTrack">View Track Details:</label>
          <select
            name="select-track"
            className="af-select-track"
            onChange={event => {
              handleSelectedTrack(event)
            }}
          >
            {currentSet.map(track => {
              return (
                <option key={track.trackId} value={track.trackId}>
                  {track.artist} - "{track.trackName}"
                </option>
              )
            })}
          </select>
        </div>
        {selectedTrack.features ? (
          <div>
            <h5>
              Current Track: {selectedTrack.artist} - "{selectedTrack.trackName}"
            </h5>
            <SelectedTrack width={width} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    selectedTrack: state.selectedTrack
  }
}

const mapDispatch = dispatch => {
  return {
    selectTrack: (data, trackId, page) =>
      dispatch(selectTrack(data, trackId, page))
  }
}

export default connect(mapState, mapDispatch)(AudioFeaturesGraph)
