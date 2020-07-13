import React from 'react'
import {connect} from 'react-redux'
import {setAudioFeature} from '../../store/currentAudioFeature'
import {
  setAudioFeatureName,
  setAudioFeatureSort,
  setAudioFeaturePage
} from '../../store/audioFeatureSettings'

const SettingsBar = props => {
  const handleChangeSettings = event => {
    props[`setAudioFeature${event.target.name}`](event.target.value)
    props.setAudioFeature()
  }

  return (
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
  )
}

const mapState = state => {
  return {
    audioFeatureSettings: state.audioFeatureSettings
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

export default connect(mapState, mapDispatch)(SettingsBar)
