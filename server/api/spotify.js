const router = require('express').Router()
const axios = require('axios')
module.exports = router
const refreshAccessToken = require('./refreshAccess')

// user's top artists
router.get('/user/topArtists', refreshAccessToken, async (req, res, next) => {
  try {
    const accessToken = req.user.accessToken

    const {data} = await axios.get(
      'https://api.spotify.com/v1/me/top/artists?time_range=long_term',
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      }
    )
    res.json(data)
  } catch (error) {
    next(error)
  }
})

//users's album
router.get(
  '/user/artist-album/',
  refreshAccessToken,
  async (req, res, next) => {
    try {
      const accessToken = req.user.accessToken

      const artistId = req.query.artistId

      const artistAlbum = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/albums`,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          }
        }
      )
      res.json(artistAlbum.data)
    } catch (error) {
      next(error)
    }
  }
)
