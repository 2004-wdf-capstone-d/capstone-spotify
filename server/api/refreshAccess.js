const SpotifyWebApi = require('spotify-web-api-node')
const {User} = require('../db/models')

// refresh Access Token middleware
const refreshAccessToken = async (req, res, next) => {
  if (Math.floor(req.user.expiresIn - new Date().getTime() / 1000) < 600) {
    console.log('INSIDE REFRESH MIDDLEWARE BEFORE UPDATE', req.user)
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_CALLBACK
    })
    await spotifyApi.setAccessToken(req.user.accessToken)
    await spotifyApi.setRefreshToken(req.user.refreshToken)
    const data = await spotifyApi.refreshAccessToken()
    const {access_token, expires_in} = data.body

    const user = await User.findOneAndUpdate(
      {_id: req.user._id},
      {
        accessToken: access_token,
        expiresIn: new Date().getTime() / 1000 + expires_in
      }
    )
    console.log('INSIDE REFRESH MIDDLEWARE', req.user)
    console.log('USER MODEL AFTER UPDATE', user)
    next()
  } else {
    next()
  }
}

module.exports = refreshAccessToken
