import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {
  changeAudioFeature,
  sortAudioFeature
} from '../store/currentAudioFeature'

export const AudioFeatures = props => {
  const {currentAudioFeature} = props

  const handleChange = event => {
    props.changeAudioFeature(event.target.value)
  }
  const handleSort = event => {
    props.sortAudioFeature(event.target.value)
  }

  let width = window.innerWidth

  let x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, width])
  let y = d3
    .scaleBand()
    .domain(currentAudioFeature.map(dataPoint => dataPoint.trackName))
    .range([0, 50 * currentAudioFeature.length])

  if (currentAudioFeature.length) {
    return (
      <div>
        <h1>Audio Features of the Top Streaming Tracks on Spotify</h1>
        <h5>based on global weekly charts from July 9, 2020</h5>
        <div id="audio-feature-graph">
          <h3>Audio Feature: {currentAudioFeature[0].feature}</h3>
          <label htmlFor="change-feature">Change Feature:</label>
          <select
            name="change-feature"
            id="change-audio-feature"
            onChange={event => {
              handleChange(event)
            }}
          >
            <option value="danceability">Danceability</option>
            <option value="energy">Energy</option>
            <option value="speechiness">Speechiness</option>
            <option value="acousticness">Acousticness</option>
            <option value="liveness">Liveness</option>
            <option value="valence">Valence</option>
          </select>
          <label htmlFor="af-value-sorter">Sort by:</label>
          <select
            name="sorters"
            id="af-value-sorter"
            onChange={event => {
              handleSort(event)
            }}
          >
            <option value="position">Chart Ranking</option>
            <option value="descending">High to Low</option>
            <option value="ascending">Low to High</option>
          </select>
          <svg
            width={width}
            height={y.range()[1]}
            fontFamily="sans-serif"
            fontSize="18"
          >
            {currentAudioFeature.map((dataPoint, index) => (
              <g
                key={index}
                transform={`translate(0,${y(dataPoint.trackName)})`}
              >
                <rect
                  fill="limegreen"
                  width={x(dataPoint.value)}
                  height={y.bandwidth() - 1}
                />
                <text fill="black" x={x(0)} y={y.bandwidth() / 2} dy="0.35em">
                  {dataPoint.artist} : {dataPoint.trackName}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    )
  } else {
    return <h5>Loading...</h5>
  }
}

const mapState = state => {
  return {
    currentAudioFeature: state.currentAudioFeature
  }
}

const mapDispatch = dispatch => {
  return {
    changeAudioFeature: value => dispatch(changeAudioFeature(value)),
    sortAudioFeature: value => dispatch(sortAudioFeature(value))
  }
}

export default connect(mapState, mapDispatch)(AudioFeatures)
