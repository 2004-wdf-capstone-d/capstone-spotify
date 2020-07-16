import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {default as AudioFeaturesGraph} from './audioFeatures/audioFeaturesGraph'
import {default as SettingsBar} from './audioFeatures/settingsBar'
import {setAudioFeature, setBlankFeature} from '../store/currentAudioFeature'

export const UserAudioFeatures = props => {
  const {
    userAudioFeatureData,
    currentAudioFeature,
    setAudioFeature,
    setBlankFeature
  } = props

  useEffect(
    () => {
      async function setFeat() {
        await setAudioFeature(userAudioFeatureData, {
          feature: 'danceability',
          sort: 'position',
          page: 0
        })
      }
      function setBlank() {
        setBlankFeature()
      }
      if (userAudioFeatureData.length >= 10) {
        setFeat()
      } else {
        setBlank()
      }
    },
    [userAudioFeatureData]
  )

  return currentAudioFeature.length ? (
    <section className="section">
      <div className="hero is-dark is-bold">
        <div className="hero-body">
          <h1 className="title">
            Audio Features of your Top {userAudioFeatureData.length} Tracks
          </h1>
          <h5 className="subtitle">based on data from Spotify</h5>
          <SettingsBar dataSet={userAudioFeatureData} />
          <AudioFeaturesGraph dataSet={userAudioFeatureData} />
        </div>
      </div>
    </section>
  ) : (
    <section className="section">
      <div className="hero is-dark is-bold">
        <div className="hero-body">
          <h1 className="title">Not enough data to display.</h1>
        </div>
      </div>
    </section>
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
      dispatch(setAudioFeature(data, settings)),
    setBlankFeature: () => dispatch(setBlankFeature())
  }
}

export default connect(mapState, mapDispatch)(UserAudioFeatures)
