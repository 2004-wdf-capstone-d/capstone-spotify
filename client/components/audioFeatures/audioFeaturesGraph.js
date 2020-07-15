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

  const width = window.innerWidth * 0.8

  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, width])
  const y = d3
    .scaleBand()
    .domain(currentSet.map(dataPoint => dataPoint.trackName))
    .range([0, 45 * currentSet.length])

  return (
    <section>
      <SettingsBar data={dataSet} page={page} setPage={setPage} />
      <div className="level mt-4 mb-2">
        <div className="level-left">
          <div className="level-item mr-2">
            <label className="is-size-6 has-text-left mr-2">
              Select a Track
            </label>
            <select
              name="select-track"
              className="select"
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
        </div>
      </div>
      <svg
        width={width}
        height={y.range()[1]}
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
