import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {setAudioFeature} from '../store/currentAudioFeature'
import {selectTrack} from '../store/selectedTrack'
import {default as SelectedTrack} from './audioFeatures/selectedTrack'
import {default as SettingsBar} from './audioFeatures/settingsBar'

export const AudioFeatures = props => {
  const {currentAudioFeature, audioFeatureSettings, selectedTrack} = props

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
    .domain(currentAudioFeature.map(dataPoint => dataPoint.trackName))
    .range([0, 40 * currentAudioFeature.length])

  return currentAudioFeature.length ? (
    <div id="audio-feature-main">
      <div id="audio-feature-header">
        <h1>Audio Features of the Top Streaming Tracks on Spotify</h1>
        <h5>based on global weekly charts from July 9, 2020</h5>
      </div>
      <div>
        <div id="audio-feature-graph">
          <h3>Audio Feature: {audioFeatureSettings.feature}</h3>
          <div>
            <div>
              <SettingsBar />
            </div>
            <div>
              <label htmlFor="selectTrack">View Track Details:</label>
              <select
                name="select-track"
                id="af-select-track"
                onChange={event => {
                  handleSelectedTrack(event)
                }}
              >
                {currentAudioFeature.map(track => {
                  return (
                    <option key={track.trackId} value={track.trackId}>
                      {track.artist} - "{track.trackName}"
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div>
            <svg
              width={width}
              height={y.range()[1]}
              fontFamily="sans-serif"
              fontSize="18"
              className="audio-feature-graph"
            >
              {currentAudioFeature.map((dataPoint, index) => (
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
        </div>
        <div id="audio-feature-track-details">
          {selectedTrack.trackId ? <SelectedTrack width={width} /> : null}
        </div>
      </div>
    </div>
  ) : (
    <h5>Loading...</h5>
  )
}

const mapState = state => {
  return {
    currentAudioFeature: state.currentAudioFeature,
    audioFeatureSettings: state.audioFeatureSettings,
    selectedTrack: state.selectedTrack
  }
}

const mapDispatch = dispatch => {
  return {
    setAudioFeature: () => dispatch(setAudioFeature()),
    selectTrack: dataPoint => dispatch(selectTrack(dataPoint))
  }
}

export default connect(mapState, mapDispatch)(AudioFeatures)
