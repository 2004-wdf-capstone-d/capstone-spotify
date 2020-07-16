import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {default as AudioFeaturesGraph} from './audioFeatures/audioFeaturesGraph'
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
      // console.log('check user audioFeatureData: ', userAudioFeatureData.length)
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
          <h1 className="title">Audio Features of your Top 20 tracks</h1>
          {userAudioFeatureData.length > 10 ? (
            <div>
              <AudioFeaturesGraph
                dataSet={userAudioFeatureData}
                currentSet={currentAudioFeature}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  ) : (
    <h5>Not enough data to display.</h5>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user._id,
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
