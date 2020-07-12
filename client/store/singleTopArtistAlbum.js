import axios from 'axios'

const SET_SINGLE_ARTIST_ALBUM = 'SET_SINGLE_ARTIST_ALBUM'

const setSingleArtistAlbum = artist => ({
  type: SET_SINGLE_ARTIST_ALBUM,
  artist
})

export const fetchSingleArtistAlbum = artist => async dispatch => {
  try {
    const {data} = await axios.get('/api/spotify/user/artist-album', {
      params: {
        artistId: artist.id
      }
    })
    dispatch(setSingleArtistAlbum(data))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {}

const singleArtistAlbumReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_ARTIST_ALBUM:
      return action.artist
    default:
      return state
  }
}

export default singleArtistAlbumReducer
