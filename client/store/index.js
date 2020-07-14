import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import topArtists from './user-topArtist'
import singleTopArtist from './singleTopArtist'
import audioFeatureData from './audioFeatures'
import currentAudioFeature from './currentAudioFeature'
import selectedTrack from './selectedTrack'
import userAudioFeatureData from './userAudioFeatureData'

function saveToLocalStorage(state) {
  const storedState = JSON.stringify(state)
  localStorage.setItem('store', storedState)
}

function loadFromLocalStorage() {
  const storedState = localStorage.getItem('store')
  if (storedState === null) return undefined
  return JSON.parse(storedState)
}
const persistedStore = loadFromLocalStorage()
const reducer = combineReducers({
  user,
  topArtists,
  singleTopArtist,
  audioFeatureData,
  currentAudioFeature,
  selectedTrack,
  userAudioFeatureData
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, persistedStore, middleware)

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
export * from './user'
