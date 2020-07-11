const SET_AUDIO_FEATURE = 'SET_AUDIO_FEATURE'

const setAudioFeature = audioFeature => ({
  type: SET_AUDIO_FEATURE,
  audioFeature
})

export const defaultAudioFeature = () => (dispatch, getState) => {
  const {audioFeatures} = getState()

  const dataSet = audioFeatures.reduce((data, curTrack) => {
    data.push({
      artist: curTrack.artist,
      trackName: curTrack.trackName,
      position: curTrack.position,
      feature: 'danceability',
      value: curTrack.danceability
    })
    return data
  }, [])
  dispatch(setAudioFeature(dataSet))
}

export const changeAudioFeature = value => (dispatch, getState) => {
  const {audioFeatures} = getState()

  const dataSet = audioFeatures.reduce((data, curTrack) => {
    data.push({
      artist: curTrack.artist,
      trackName: curTrack.trackName,
      position: curTrack.position,
      feature: value,
      value: curTrack[value]
    })
    return data
  }, [])
  dispatch(setAudioFeature(dataSet))
}

export const sortAudioFeature = value => (dispatch, getState) => {
  const {currentAudioFeature} = getState()

  if (value === 'position') {
    currentAudioFeature.sort((a, b) => {
      return a.position - b.position
    })
  } else if (value === 'descending') {
    currentAudioFeature.sort((a, b) => {
      return b.value - a.value
    })
  } else if (value === 'ascending') {
    currentAudioFeature.sort((a, b) => {
      return a.value - b.value
    })
  }

  dispatch(setAudioFeature(currentAudioFeature))
}

const initialState = []

const currentAudioFeatureReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUDIO_FEATURE:
      return [...action.audioFeature]
    default:
      return state
  }
}

export default currentAudioFeatureReducer
