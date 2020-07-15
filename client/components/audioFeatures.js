import React from 'react'
import {connect} from 'react-redux'

import {default as AudioFeaturesGraph} from './audioFeatures/audioFeaturesGraph'

export const DefaultAudioFeatures = props => {
  const {audioFeatureData, currentAudioFeature} = props

  return currentAudioFeature.length ? (
    <section className="section">
      <div className="hero is-dark is-bold">
        <div className="hero-body">
          <h1 className="title">
            Audio Features of the Top Streaming Tracks on Spotify
          </h1>
          <h5 className="subtitle">
            based on global weekly charts from July 9, 2020
          </h5>
          <AudioFeaturesGraph
            dataSet={audioFeatureData}
            currentSet={currentAudioFeature}
          />
        </div>
      </div>
    </section>
  ) : (
    <h5>Loading...</h5>
  )
}

const mapState = state => {
  return {
    audioFeatureData: state.audioFeatureData,
    currentAudioFeature: state.currentAudioFeature
  }
}

export default connect(mapState)(DefaultAudioFeatures)
