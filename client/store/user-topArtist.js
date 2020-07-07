const {default: Axios} = require('axios')

const GET_TOP_ARTIST = 'GET_TOP_ARTIST'

const getTopArtist = artist => ({
  type: GET_TOP_ARTIST,
  artist
})

export const fetchTopArtist = () => async (dispatch, getState) => {
  const accessToken = getState().user.accessToken

  const {data} = await Axios.get(
    'https://api.spotify.com/v1/me/top/artists?time_range=long_term',
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    }
  )
  dispatch(getTopArtist(data.items))
}

export const refreshAccessToken = () => async (dispatch, getState) => {
  const {data} = await Axios.post('https://accounts.spotify.com/api/token', {
    grant_type: refresh_token,
    refresh_token: getState().user.refreshToken,
    headers: {
      Authorization:
        'Basic ' + process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  console.log(data)
  // dispatch(updateUser(data))
}

const initialState = []

const topArtistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOP_ARTIST:
      return [...action.artist]
    default:
      return state
  }
}

export default topArtistReducer
