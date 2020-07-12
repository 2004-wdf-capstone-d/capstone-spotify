const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-node')

const {TopChart} = require('../db/models/')
const fetchGuestToken = require('./guestToken')
module.exports = router

// get artists from database
router.get('/', fetchGuestToken, async (req, res, next) => {
  try {
    // get charts from database
    const charts = await TopChart.find({
      position: {$lte: 100}
    })

    // extract trackIds from charts
    const trackIds = charts.map(track => {
      return track.url.substring(31)
    })

    // spotify API call to retrieve audio features
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_CALLBACK
    })
    await spotifyApi.setAccessToken(req.body.accessToken)
    const response = await spotifyApi.getAudioFeaturesForTracks(trackIds)
    const audioFeatures = response.body.audio_features

    // data cleaning
    const dataset = charts.map((track, index) => {
      return {
        artist: track.artist,
        position: track.position,
        streams: track.streams,
        trackName: track.trackName,
        url: track.url,
        trackId: trackIds[index],
        danceability: audioFeatures[index].danceability,
        energy: audioFeatures[index].energy,
        speechiness: audioFeatures[index].speechiness,
        acousticness: audioFeatures[index].acousticness,
        liveness: audioFeatures[index].liveness,
        valence: audioFeatures[index].valence
      }
    })

    res.json(dataset)
  } catch (error) {
    next(error)
  }
})
