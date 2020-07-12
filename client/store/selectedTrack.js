const SET_TRACK = 'SET_TRACK'

const setTrack = track => ({
  type: SET_TRACK,
  track
})

export const selectTrack = dataPoint => (dispatch, getState) => {
  const {audioFeatureData, audioFeatureSettings} = getState()
  const {page} = audioFeatureSettings

  const selectedTrack = {
    artist: dataPoint.artist,
    trackName: dataPoint.trackName,
    trackId: dataPoint.trackId,
    url: dataPoint.url,
    streams: dataPoint.streams,
    position: dataPoint.position
  }
  for (let i = page; i < page + 10; i++) {
    if (selectedTrack.trackId === audioFeatureData[i].trackId) {
      selectedTrack.features = [
        {
          name: 'danceability',
          value: audioFeatureData[i].danceability
        },
        {
          name: 'energy',
          value: audioFeatureData[i].energy
        },
        {
          name: 'speechiness',
          value: audioFeatureData[i].speechiness
        },
        {
          name: 'acousticness',
          value: audioFeatureData[i].acousticness
        },
        {
          name: 'liveness',
          value: audioFeatureData[i].liveness
        },
        {
          name: 'valence',
          value: audioFeatureData[i].valence
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
