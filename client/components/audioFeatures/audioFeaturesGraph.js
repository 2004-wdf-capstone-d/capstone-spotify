import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

import {default as SelectedTrack} from './selectedTrack'
import {default as SettingsBar} from './settingsBar'
import {selectTrack} from '../../store/selectedTrack'

const AudioFeaturesGraph = props => {
  const {dataSet, settings, selectedTrack} = props

  const handleSelectedTrack = event => {
    props.selectTrack(event.target.value)
  }

  const width = window.innerWidth

  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, width])
  const y = d3
    .scaleBand()
    .domain(dataSet.map(dataPoint => dataPoint.trackName))
    .range([0, 40 * dataSet.length])

  return (
    <div>
      <div className="audio-feature-graph">
        <h3>Audio Feature: {settings.feature}</h3>
        <div>
          <div>
            <SettingsBar data={dataSet} settings={settings} />
          </div>
          <div>
            <label htmlFor="selectTrack">View Track Details:</label>
            <select
              name="select-track"
              className="af-select-track"
              onChange={event => {
                handleSelectedTrack(event)
              }}
            >
              {dataSet.map(track => {
                return (
                  <option key={track.trackId} value={track.trackId}>
                    {track.artist} - "{track.trackName}"
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <svg
          width={width}
          height={y.range()[1]}
          fontFamily="sans-serif"
          fontSize="18"
          className="audio-feature-graph"
        >
          {dataSet.map((dataPoint, index) => (
            <g
              key={index}
              className="audio-feature-bar"
              transform={`translate(0,${y(dataPoint.trackName)})`}
            >
              <rect
                fill="darkseagreen"
                width={x(dataPoint.value)}
                height={y.bandwidth() - 1}
              />
              <text
                fill="darkslategray"
                x={x(0)}
                y={y.bandwidth() / 2}
                dy="0.35em"
              >
                #{dataPoint.position}: {dataPoint.artist} - "{
                  dataPoint.trackName
                }"
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="audio-feature-track-details">
        {selectedTrack.trackId ? <SelectedTrack width={width} /> : null}
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
    // setAudioFeature: () => dispatch(setAudioFeature()),
    selectTrack: dataPoint => dispatch(selectTrack(dataPoint))
  }
}

export default connect(mapState, mapDispatch)(AudioFeaturesGraph)
