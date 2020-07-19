const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-node')
const axios = require('axios')

const {TopChart, AudioFeatureTrack} = require('../db/models')
const fetchGuestToken = require('./guestToken')
const refreshAccessToken = require('./refreshAccess')
module.exports = router

// create default audio feature tracks
router.post('/', fetchGuestToken, async (req, res, next) => {
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
        uri: audioFeatures[index].uri,
        danceability: audioFeatures[index].danceability,
        energy: audioFeatures[index].energy,
        speechiness: audioFeatures[index].speechiness,
        acousticness: audioFeatures[index].acousticness,
        liveness: audioFeatures[index].liveness,
        valence: audioFeatures[index].valence
      }
    })

    const defaultTracks = await AudioFeatureTrack.insertMany(dataset)

    res.json(defaultTracks)
  } catch (error) {
    next(error)
  }
})

// get audio feature tracks from database
router.get('/', async (req, res, next) => {
  try {
    const defaultTracks = await AudioFeatureTrack.find({
      position: {$lte: 100}
    })

    res.json(defaultTracks)
  } catch (error) {
    next(error)
  }
})

// get user's top tracks with audio features
router.get('/user', refreshAccessToken, async (req, res, next) => {
  try {
    const accessToken = req.user.accessToken

    const response = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50',
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      }
    )
    const topTracks = response.data.items

    const trackIds = topTracks.map(track => track.id)

    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_CALLBACK
    })
    await spotifyApi.setAccessToken(accessToken)
    const features = await spotifyApi.getAudioFeaturesForTracks(trackIds)
    const audioFeatures = features.body.audio_features

    const dataset = topTracks.map((track, index) => {
      if (audioFeatures[index]) {
        return {
          artist: track.artists[0].name,
          position: index + 1,
          trackName: track.name,
          trackId: trackIds[index],
          uri: audioFeatures[index].uri,
          danceability: audioFeatures[index].danceability,
          energy: audioFeatures[index].energy,
          speechiness: audioFeatures[index].speechiness,
          acousticness: audioFeatures[index].acousticness,
          liveness: audioFeatures[index].liveness,
          valence: audioFeatures[index].valence
        }
      }
    })

    res.json(dataset)
  } catch (error) {
    next(error)
  }
})
