import Axios from 'axios'

const GET_AUDIO_FEATURES = 'GET_AUDIO_FEATURES'

const getAudioFeatures = audioFeatures => ({
  type: GET_AUDIO_FEATURES,
  audioFeatures
})

export const fetchAudioFeatures = () => async dispatch => {
  // retrieve the db data first
  let {data} = await Axios.get('/api/spotify-charts/')

  const charts = data

  const trackIds = data.map(track => {
    return track.url.substring(31)
  })

  // retrieve audio features data
  data = await Axios.get('/api/spotify-charts/audio-features', {
    params: {
      trackIds
    }
  })

  // merge the data together
  const features = charts.map((track, index) => {
    return {
      artist: track.artist,
      position: track.position,
      streams: track.streams,
      trackName: track.trackName,
      url: track.url,
      trackId: trackIds[index],
      danceability: data.data[index].danceability,
      energy: data.data[index].energy,
      speechiness: data.data[index].speechiness,
      acousticness: data.data[index].acousticness,
      liveness: data.data[index].liveness,
      valence: data.data[index].valence
    }
  })

  dispatch(getAudioFeatures(features))
}

const initialState = []

const audioFeaturesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUDIO_FEATURES:
      return [...action.audioFeatures]
    default:
      return state
  }
}

export default audioFeaturesReducer
