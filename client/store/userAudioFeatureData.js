import axios from 'axios'

const GET_USER_AUDIO_FEATURES = 'GET_USER_AUDIO_FEATURES'

const getUserAudioFeatures = audioFeatures => ({
  type: GET_USER_AUDIO_FEATURES,
  audioFeatures
})

export const fetchUserAudioFeatures = () => async dispatch => {
  const {data} = await axios.get('api/audio-features/user')

  dispatch(getUserAudioFeatures(data))
}

const initialState = []

const userAudioFeaturesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_AUDIO_FEATURES:
      return action.audioFeatures
    default:
      return state
  }
}

export default userAudioFeaturesReducer
