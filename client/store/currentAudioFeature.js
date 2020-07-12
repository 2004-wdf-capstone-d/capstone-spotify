const SET_AUDIO_FEATURE = 'SET_AUDIO_FEATURE'

const setFeature = audioFeature => ({
  type: SET_AUDIO_FEATURE,
  audioFeature
})

export const setAudioFeature = () => (dispatch, getState) => {
  const {audioFeatureTracks, audioFeatureSettings} = getState()
  const {feature, sort, page} = audioFeatureSettings
  const pageFeatures = []

  for (let i = page; i < page + 10; i++) {
    pageFeatures.push(audioFeatureTracks[i])
  }

  const dataSet = pageFeatures.reduce((data, curTrack) => {
    data.push({
      artist: curTrack.artist,
      trackName: curTrack.trackName,
      position: curTrack.position,
      feature,
      value: curTrack[feature]
    })
    return data
  }, [])

  if (sort === 'position') {
    dataSet.sort((a, b) => {
      return a.position - b.position
    })
  } else if (sort === 'descending') {
    dataSet.sort((a, b) => {
      return b.value - a.value
    })
  } else if (sort === 'ascending') {
    dataSet.sort((a, b) => {
      return a.value - b.value
    })
  }
  dispatch(setFeature(dataSet))
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
