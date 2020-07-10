const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-node')

// const Axios = require('axios')
const {TopChart} = require('../db/models/')
const fetchGuestToken = require('./guestToken')
module.exports = router

// get top ten
router.get('/ten', async (req, res, next) => {
  try {
    const artists = await TopChart.find({
      position: {$lte: 10}
    })
    res.json(artists)
  } catch (error) {
    next(error)
  }
})

// get audio features of a specific track
router.get('/audio-features', fetchGuestToken, async (req, res, next) => {
  try {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_CALLBACK
    })

    await spotifyApi.setAccessToken(req.body.accessToken)

    const trackId = req.query.trackId

    const audioFeatures = await spotifyApi.getAudioFeaturesForTrack(trackId)

    res.json(audioFeatures.body)
  } catch (error) {
    next(error)
  }
})
