import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {setAudioFeature} from '../store/currentAudioFeature'
import {
  setAudioFeatureName,
  setAudioFeatureSort,
  setAudioFeaturePage
} from '../store/audioFeatureSettings'
import {selectTrack} from '../store/selectedTrack'

export const AudioFeatures = props => {
  const {currentAudioFeature} = props

  const handleChangeSettings = event => {
    props[`setAudioFeature${event.target.name}`](event.target.value)
    props.setAudioFeature()
  }
  const handleSelectedTrack = dataPoint => {
    props.selectTrack(dataPoint)
  }

  const width = window.innerWidth

  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, width])
  const y = d3
    .scaleBand()
    .domain(currentAudioFeature.map(dataPoint => dataPoint.trackName))
    .range([0, 50 * currentAudioFeature.length])

  return currentAudioFeature.length ? (
    <div>
      <h1>Audio Features of the Top Streaming Tracks on Spotify</h1>
      <h5>based on global weekly charts from July 9, 2020</h5>
      <div id="audio-feature-graph">
        <h3>Audio Feature: {currentAudioFeature[0].feature}</h3>
        <div id="audio-feature-settings">
          <div>
            <label htmlFor="change-feature">Change Feature:</label>
            <select
              name="Name"
              id="change-audio-feature"
              onChange={event => {
                handleChangeSettings(event)
              }}
            >
              <option value="danceability">Danceability</option>
              <option value="energy">Energy</option>
              <option value="speechiness">Speechiness</option>
              <option value="acousticness">Acousticness</option>
              <option value="liveness">Liveness</option>
              <option value="valence">Valence</option>
            </select>
          </div>
          <div>
            <label htmlFor="af-value-sorter">Sort by:</label>
            <select
              name="Sort"
              id="af-value-sorter"
              onChange={event => {
                handleChangeSettings(event)
              }}
            >
              <option value="position">Chart Ranking</option>
              <option value="descending">High to Low</option>
              <option value="ascending">Low to High</option>
            </select>
          </div>
          <div>
            <label htmlFor="pager">Page:</label>
            <select
              name="Page"
              id="af-pager"
              onChange={event => {
                handleChangeSettings(event)
              }}
            >
              <option value="0">1 - 10</option>
              <option value="10">11 - 20</option>
              <option value="20">21 - 30</option>
              <option value="30">31 - 40</option>
              <option value="40">41 - 50</option>
              <option value="50">51 - 60</option>
              <option value="60">61 - 70</option>
              <option value="70">71 - 80</option>
              <option value="80">81 - 90</option>
              <option value="90">91 - 100</option>
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
          {currentAudioFeature.map((dataPoint, index) => (
            <g
              key={index}
              className="audio-feature-bar"
              transform={`translate(0,${y(dataPoint.trackName)})`}
            >
              <rect
                fill="limegreen"
                width={x(dataPoint.value)}
                height={y.bandwidth() - 1}
              />
              <text fill="black" x={x(0)} y={y.bandwidth() / 2} dy="0.35em">
                #{dataPoint.position} : {dataPoint.artist} - "{
                  dataPoint.trackName
                }"
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  ) : (
    <h5>Loading...</h5>
  )
}

const mapState = state => {
  return {
    currentAudioFeature: state.currentAudioFeature
  }
}

const mapDispatch = dispatch => {
  return {
    setAudioFeature: () => dispatch(setAudioFeature()),
    setAudioFeatureName: value => dispatch(setAudioFeatureName(value)),
    setAudioFeatureSort: value => dispatch(setAudioFeatureSort(value)),
    setAudioFeaturePage: value => dispatch(setAudioFeaturePage(value)),
    selectTrack: dataPoint => dispatch(selectTrack(dataPoint))
  }
}

export default connect(mapState, mapDispatch)(AudioFeatures)
