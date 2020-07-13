const SET_AUDIO_FEATURE = 'SET_AUDIO_FEATURE'

const setFeature = audioFeature => ({
  type: SET_AUDIO_FEATURE,
  audioFeature
})

export const setAudioFeature = (data, settings) => dispatch => {
  const {feature, sort, page} = settings

  // handle page settings
  const pageFeatures = []
  for (let i = page; i < page + 10; i++) {
    pageFeatures.push(data[i])
  }

  // handle name settings
  const dataGroup = pageFeatures.reduce((data, track) => {
    data.push({
      artist: track.artist,
      trackName: track.trackName,
      trackId: track.trackId,
      url: track.url,
      uri: track.uri,
      streams: track.streams,
      position: track.position,
      feature,
      value: track[feature]
    })
    return data
  }, [])

  // handle sort settings
  if (sort === 'position') {
    dataGroup.sort((a, b) => {
      return a.position - b.position
    })
  } else if (sort === 'descending') {
    dataGroup.sort((a, b) => {
      return b.value - a.value
    })
  } else if (sort === 'ascending') {
    dataGroup.sort((a, b) => {
      return a.value - b.value
    })
  }

  dispatch(setFeature(dataGroup))
}

const initialState = []

const currentAudioFeatureReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUDIO_FEATURE:
      return action.audioFeature
    default:
      return state
  }
}

export default currentAudioFeatureReducer
