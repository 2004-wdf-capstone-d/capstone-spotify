const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-node')

const {TopChart} = require('../db/models/')
const fetchGuestToken = require('./guestToken')
module.exports = router

// get artists from database
router.get('/', async (req, res, next) => {
  try {
    const artists = await TopChart.find({
      position: {$lte: 100}
    })
    res.json(artists)
  } catch (error) {
    next(error)
  }
})

// get audio features of multiple tracks
router.get('/audio-features', fetchGuestToken, async (req, res, next) => {
  try {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_CALLBACK
    })

    await spotifyApi.setAccessToken(req.body.accessToken)

    const trackIds = req.query.trackIds

    const audioFeatures = await spotifyApi.getAudioFeaturesForTracks(trackIds)
    res.json(audioFeatures.body.audio_features)
  } catch (error) {
    next(error)
  }
})
