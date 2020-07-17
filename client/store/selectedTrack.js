const SET_TRACK = 'SET_TRACK'
const CLEAR_TRACK = 'CLEAR_TRACK'

const setTrack = track => ({
  type: SET_TRACK,
  track
})

const clearTrack = () => ({
  type: CLEAR_TRACK
})

export const selectTrack = (data, trackId, page) => dispatch => {
  const selectedTrack = {
    trackId
  }
  for (let i = page; i < page + 10; i++) {
    const track = data[i]
    if (selectedTrack.trackId === data[i].trackId) {
      selectedTrack.artist = track.artist
      selectedTrack.trackName = track.trackName
      selectedTrack.url = track.url
      selectedTrack.uri = track.uri
      selectedTrack.streams = track.streams
      selectedTrack.position = track.position
      selectedTrack.features = [
        {
          name: 'danceability',
          value: track.danceability
        },
        {
          name: 'energy',
          value: track.energy
        },
        {
          name: 'speechiness',
          value: track.speechiness
        },
        {
          name: 'acousticness',
          value: track.acousticness
        },
        {
          name: 'liveness',
          value: track.liveness
        },
        {
          name: 'valence',
          value: track.valence
        }
      ]
      break
    }
  }

  dispatch(setTrack(selectedTrack))
}

export const setSingleTrack = track => dispatch => {
  const selectedTrack = {
    trackId: track.trackId,
    artist: track.artist,
    trackName: track.trackName,
    uri: track.uri
  }
  dispatch(setTrack(selectedTrack))
}

export const clearSelectedTrack = () => dispatch => {
  dispatch(clearTrack())
}

const initialState = {}

const selectedTrackReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACK:
      return action.track
    case CLEAR_TRACK:
      return initialState
    default:
      return state
  }
}

export default selectedTrackReducer
