import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {default as AudioFeaturesGraph} from './audioFeatures/audioFeaturesGraph'
import {setAudioFeature} from '../store/currentAudioFeature'

export const UserAudioFeatures = props => {
  const {userAudioFeatureData, currentAudioFeature, setAudioFeature} = props

  useEffect(() => {
    setAudioFeature(userAudioFeatureData, {
      feature: 'danceability',
      sort: 'position',
      page: 0
    })
  }, [])

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

const mapDispatch = dispatch => {
  return {
    setAudioFeature: (data, settings) =>
      dispatch(setAudioFeature(data, settings))
  }
}

export default connect(mapState, mapDispatch)(UserAudioFeatures)
