import Axios from 'axios'

const SET_SINGLE_TOP_ARTIST = 'SET_SINGLE_TOP_ARTIST'

export const setTopArtist = artist => ({
  type: SET_SINGLE_TOP_ARTIST,
  artist
})

// export const fetchTopArtist = () => async dispatch => {
//   const {data} = await Axios.get('/api/spotify/user/topArtists')
//   dispatch(setTopArtist(data.items))
// }

export const fetchSingleArtistTopSongs = artist => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/spotify/topArtist/top-tracks', {
        params: {
          artistId: artist.id
        }
      })
      const artistWithTracks = {...artist, topTracks: data}
      dispatch(setTopArtist(artistWithTracks))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {}

const userSingleTopArtistReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_TOP_ARTIST:
      return action.artist
    default:
      return state
  }
}

export default userSingleTopArtistReducer
