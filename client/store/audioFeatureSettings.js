const SET_AUDIO_FEATURE_NAME = 'SET_AUDIO_FEATURE_NAME'
const SET_AUDIO_FEATURE_SORT = 'SET_AUDIO_FEATURE_SORT'
const SET_AUDIO_FEATURE_PAGE = 'SET_AUDIO_FEATURE_PAGE'

const setName = feature => ({
  type: SET_AUDIO_FEATURE_NAME,
  feature
})

const setSort = sort => ({
  type: SET_AUDIO_FEATURE_SORT,
  sort
})

const setPage = page => ({
  type: SET_AUDIO_FEATURE_PAGE,
  page
})

export const setAudioFeatureName = value => dispatch => {
  dispatch(setName(value))
}

export const setAudioFeatureSort = value => dispatch => {
  dispatch(setSort(value))
}

export const setAudioFeaturePage = value => dispatch => {
  value = parseInt(value)
  dispatch(setPage(value))
}

const initialState = {
  feature: 'danceability',
  sort: 'position',
  page: 0
}
const audioFeatureNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUDIO_FEATURE_NAME:
      return {...state, feature: action.feature}
    case SET_AUDIO_FEATURE_SORT:
      return {...state, sort: action.sort}
    case SET_AUDIO_FEATURE_PAGE:
      return {...state, page: action.page}
    default:
      return state
  }
}

export default audioFeatureNameReducer
