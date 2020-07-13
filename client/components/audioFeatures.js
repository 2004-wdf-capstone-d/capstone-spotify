import React from 'react'
import {connect} from 'react-redux'

import {default as AudioFeaturesGraph} from './audioFeatures/audioFeaturesGraph'

export const DefaultAudioFeatures = props => {
  const {audioFeatureData, currentAudioFeature, audioFeatureSettings} = props

  return currentAudioFeature.length ? (
    <div id="audio-feature-main">
      <div id="audio-feature-header">
        <h1>Audio Features of the Top Streaming Tracks on Spotify</h1>
        <h5>based on global weekly charts from July 9, 2020</h5>
      </div>
      <AudioFeaturesGraph
        dataSet={audioFeatureData}
        currentSet={currentAudioFeature}
        settings={audioFeatureSettings}
      />
    </div>
  ) : (
    <h5>Loading...</h5>
  )
}

const mapState = state => {
  return {
    audioFeatureData: state.audioFeatureData,
    currentAudioFeature: state.currentAudioFeature,
    audioFeatureSettings: state.audioFeatureSettings
  }
}

export default connect(mapState)(DefaultAudioFeatures)
