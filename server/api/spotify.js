const router = require('express').Router()
const Axios = require('axios')
module.exports = router
const refreshAccessToken = require('./refreshAccess')

// api requests go here

// a route for user's top artists
router.get('/user/topArtists', refreshAccessToken, async (req, res, next) => {
  try {
    const accessToken = req.user.accessToken

    const {data} = await Axios.get(
      'https://api.spotify.com/v1/me/top/artists?time_range=long_term',
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      }
    )
    res.json(data)
    // dispatch(getTopArtist(data.items))
  } catch (error) {
    next(error)
  }
})
