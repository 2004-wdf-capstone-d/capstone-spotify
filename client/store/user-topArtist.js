import Axios from 'axios'

const GET_TOP_ARTIST = 'GET_TOP_ARTIST'
// const GET_TOP_ARTIST_ALBUM = 'GET_TOP_ARTIST_ALBUM'

const getTopArtist = artist => ({
  type: GET_TOP_ARTIST,
  artist
})

// const getTopArtistAlbum = artist => ({
//   type: GET_TOP_ARTIST_ALBUM,
//   artist
// })

export const fetchTopArtist = () => async dispatch => {
  const {data} = await Axios.get('/api/spotify/user/topArtists')
  dispatch(getTopArtist(data.items))
}

// export const fetchTopArtistAlbum = (id) => async (dispatch) => {
//   const {data} = await Axios.get('/api/spotify/user/artist-album', {
//     params: {
//       artistId: id
//     }
//   })

// dispatch(getTopArtistAlbum(data))

// }

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
