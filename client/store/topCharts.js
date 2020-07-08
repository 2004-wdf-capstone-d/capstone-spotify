import Axios from 'axios'

const GET_TOP_TEN = 'GET_TOP_TEN'

const getTopTen = artists => ({
  type: GET_TOP_TEN,
  artists
})

export const fetchTopTen = () => async dispatch => {
  const {data} = await Axios.get('/api/spotify-charts/ten')
  dispatch(getTopTen(data))
}

const initialState = []

const topChartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOP_TEN:
      return [...action.artists]
    default:
      return state
  }
}

export default topChartsReducer
