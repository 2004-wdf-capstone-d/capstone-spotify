import React from 'react'
import {connect} from 'react-redux'

import {default as AudioFeaturesGraph} from './audioFeatures/audioFeaturesGraph'

export const UserAudioFeatures = props => {
  const {userAudioFeatureData, currentAudioFeature} = props

  return currentAudioFeature.length ? (
    <div id="user-audio-feature-main">
      <div id="user-audio-feature-header">
        <h1>Audio Features of your Top 20 tracks</h1>
      </div>
      <AudioFeaturesGraph
        dataSet={userAudioFeatureData}
        currentSet={currentAudioFeature}
      />
    </div>
  ) : (
    <h5>Loading...</h5>
  )
}

const mapState = state => {
  return {
    userAudioFeatureData: state.userAudioFeatureData,
    currentAudioFeature: state.currentAudioFeature
  }
}

export default connect(mapState)(UserAudioFeatures)
