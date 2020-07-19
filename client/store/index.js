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

const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

function saveToLocalStorage(state) {
  try {
    const storedState = JSON.stringify(state)
    localStorage.setItem('store', storedState)
  } catch {
    return undefined
  }
}

function loadFromLocalStorage() {
  try {
    const storedState = localStorage.getItem('store')
    if (storedState === null) return undefined
    return JSON.parse(storedState)
  } catch (err) {
    return undefined
  }
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
if (localStorage.getItem('isLoggedIn')) {
  store.subscribe(throttle(() => saveToLocalStorage(store.getState()), 1000))
}

export default store
export * from './user'
