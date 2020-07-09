const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-node')
// const spotifyStrategy = require('passport-spotify').Strategy
// const passport = require('passport')
const Axios = require('axios')
const {TopChart} = require('../db/models/')
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

// we want to make spotify requests based on our clientID and secret, without having to log in
// we need to look through our top charts
// extract the track id's
// and then receive back data based on those ids

// Constr.prototype.getAudioFeaturesForTrack = function (trackId, callback) {
//   var requestData = {};
//   requestData.url = _baseUri + '/audio-features/' + trackId;
//   return _checkParamsAndPerformRequest(requestData, {}, callback);
// };

// get audio features of a specific track
router.get('/token', async (req, res, next) => {
  try {
    // const spotifyApi = new SpotifyWebApi({
    //   clientId: process.env.CLIENT_ID,
    //   clientSecret: process.env.CLIENT_SECRET,
    //   redirectUri: process.env.SPOTIFY_CALLBACK
    // })
    // console.log('req.session', req.session)

    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLIENT_SECRET

    const options = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: clientId,
        password: clientSecret
      }
    }

    const {data} = await Axios(options)
    // delete req.session.guestToken
    // req.session.guestToken = data.access_token
    // console.log('req.session after request', req.session)
    // console.log(data)
    res.json(data)
    // const trackId = req.params.id

    // const data = await spotifyApi.getAudioFeaturesForTrack(trackId)
    // console.log('data', data)
  } catch (error) {
    next(error)
  }
})
