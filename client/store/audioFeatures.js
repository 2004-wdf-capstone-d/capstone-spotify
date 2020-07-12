import Axios from 'axios'

const GET_AUDIO_FEATURES = 'GET_AUDIO_FEATURES'

const getAudioFeatures = audioFeatures => ({
  type: GET_AUDIO_FEATURES,
  audioFeatures
})

export const fetchAudioFeatures = () => async dispatch => {
  const {data} = await Axios.get('/api/spotify-charts/')
  dispatch(getAudioFeatures(data))
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
