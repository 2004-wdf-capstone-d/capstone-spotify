import Axios from 'axios'
import history from '../history'
const SET_SINGLE_TOP_ARTIST = 'SET_SINGLE_TOP_ARTIST'
const SET_TOP_ARTIST_ALBUM = 'SET_SINGLE_ARTIST_ALBUM'
const ADD_TOP_TRACKS_TO_ARTIST = 'ADD_TOP_TRACKS_TO_ARTIST'
const ADD_ALBUMS_TO_ARTIST = 'ADD_ALBUMS_TO_ARTIST'

export const setTopArtist = artist => ({
  type: SET_SINGLE_TOP_ARTIST,
  artist
})

export const setTopArtistAlbum = albums => ({
  type: SET_TOP_ARTIST_ALBUM,
  albums
})

// export const fetchTopArtist = () => async dispatch => {
//   const {data} = await Axios.get('/api/spotify/user/topArtists')
//   dispatch(setTopArtist(data.items))
// }

export const addTrackToArtist = tracks => ({
  type: ADD_TOP_TRACKS_TO_ARTIST,
  tracks
})

export const addAlbumToArtist = albums => ({
  type: ADD_ALBUMS_TO_ARTIST,
  albums
})

export const fetchSingleArtistTopSongs = () => {
  return async (dispatch, getState) => {
    try {
      const artist = getState().singleTopArtist
      let {data} = await Axios.get('/api/spotify/topArtist/top-tracks', {
        params: {
          artistId: artist.id
        }
      })
      data = data.map(el => {
        el.pop = 95
        return el
      })
      dispatch(addTrackToArtist(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchArtistAlbums = () => {
  return async (dispatch, getState) => {
    try {
      const artist = getState().singleTopArtist
      const {data} = await Axios.get('/api/spotify/topArtist/artist-albums', {
        params: {
          artistId: artist.id
        }
      })
      dispatch(addAlbumToArtist(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {}

const singleTopArtistReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_TOP_ARTIST:
      return action.artist
    case ADD_TOP_TRACKS_TO_ARTIST:
      return {...state, topTracks: action.tracks}
    case ADD_ALBUMS_TO_ARTIST:
      return {...state, albums: action.albums}
    default:
      return state
  }
}

export default singleTopArtistReducer
