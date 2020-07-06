const {default: Axios} = require('axios')

const GET_TOP_ARTIST = 'GET_TOP_ARTIST'

const getTopArtist = artist => ({
  type: GET_TOP_ARTIST,
  artist
})

export const fetchTopArtist = () => async (dispatch, getState) => {
  const accessToken = getState().user.accessToken
  console.log(accessToken)
  const {data} = await Axios.get(
    'https://api.spotify.com/v1/me/top/artists?time_range=long_term',
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    }
  )
  console.log(data.items)
  dispatch(getTopArtist(data.items))
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
