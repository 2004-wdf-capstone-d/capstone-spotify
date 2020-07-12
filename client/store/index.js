import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import topArtists from './user-topArtist'
import audioFeatureData from './audioFeatures'
import currentAudioFeature from './currentAudioFeature'
import audioFeatureSettings from './audioFeatureSettings'
import selectedTrack from './selectedTrack'

const reducer = combineReducers({
  user,
  topArtists,
  audioFeatureData,
  currentAudioFeature,
  audioFeatureSettings,
  selectedTrack
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
