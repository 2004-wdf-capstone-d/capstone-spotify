const router = require('express').Router()
const axios = require('axios')
module.exports = router
const refreshAccessToken = require('./refreshAccess')
const guestToken = require('./guestToken')
const SpotifyWebApi = require('spotify-web-api-node')

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
//get one of the user's top artists' top tracks
//takes a single top artist from the list and displays them on click with their information including top tracks.

router.get(
  '/topArtist/top-tracks',
  refreshAccessToken,
  guestToken,
  async (req, res, next) => {
    try {
      const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_CALLBACK
      })

      await spotifyApi.setAccessToken(
        req.user.accessToken || req.body.accessToken
      )

      const artistId = req.query.artistId

      const artistTopSongs = await spotifyApi.getArtistTopTracks(artistId, 'US')
      res.json(artistTopSongs.body.tracks)
    } catch (error) {
      next(error)
    }
  }
)
