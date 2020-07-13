const SET_TRACK = 'SET_TRACK'

const setTrack = track => ({
  type: SET_TRACK,
  track
})

export const selectTrack = (data, trackId, page) => dispatch => {
  // const {audioFeatureData, audioFeatureSettings} = getState()
  // const {page} = audioFeatureSettings

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

const initialState = {}

const selectedTrackReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACK:
      return action.track
    default:
      return state
  }
}

export default selectedTrackReducer
