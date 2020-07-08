import Axios from 'axios'

const GET_TOP_ARTIST = 'GET_TOP_ARTIST'

const getTopArtist = artist => ({
  type: GET_TOP_ARTIST,
  artist
})

export const fetchTopArtist = () => async dispatch => {
  const {data} = await Axios.get('/api/spotify/user/topArtists')
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
