import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {default as AudioFeaturesGraph} from './audioFeatures/audioFeaturesGraph'
import {default as SettingsBar} from './audioFeatures/settingsBar'
import {setAudioFeature, setBlankFeature} from '../store/currentAudioFeature'

export const DefaultAudioFeatures = props => {
  const {audioFeatureData, currentAudioFeature, setAudioFeature} = props

  useEffect(
    () => {
      async function setFeat() {
        await setAudioFeature(audioFeatureData, {
          feature: 'danceability',
          sort: 'position',
          page: 0
        })
      }
      if (audioFeatureData.length) {
        setFeat()
      }
    },
    [audioFeatureData]
  )

  return currentAudioFeature.length ? (
    <div className="container">
      <div className="hero is-dark is-bold">
        <div className="hero-body">
          <h1 className="title">
            Audio Features of the Top Streaming Tracks on Spotify
          </h1>
          <h5 className="subtitle">
            based on global weekly charts from July 16, 2020
          </h5>
          <SettingsBar dataSet={audioFeatureData} />
          <AudioFeaturesGraph dataSet={audioFeatureData} />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="hero is-dark is-bold">
        <div className="hero-body">
          <h1 className="title">Loading...</h1>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    audioFeatureData: state.audioFeatureData,
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

export default connect(mapState, mapDispatch)(DefaultAudioFeatures)
