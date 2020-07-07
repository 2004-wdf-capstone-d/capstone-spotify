const spotifyStrategy = require('passport-spotify').Strategy
const passport = require('passport')
const {User} = require('../db/models/')
const router = require('express').Router()
module.exports = router

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  console.log('Spotify client ID / secret not found. Skipping spotify OAuth.')
} else {
  const spotifyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK
  }
  const strategy = new spotifyStrategy(spotifyConfig, async function(
    accessToken,
    refreshToken,
    expiresIn,
    profile,
    done
  ) {
    const spotifyId = profile.id
    const email = profile.emails[0].value
    const images = profile.photos
    const href = profile._json.href
    const displayName = profile.displayName

    await User.findOne({spotifyId: profile.id}, async function(err, user) {
      if (!user) {
        user = await User.create({
          spotifyId,
          email,
          images,
          href,
          displayName,
          accessToken,
          refreshToken
        })
      }
      return done(err, user)
    })
  })

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('spotify', {
      scope: ['user-read-email', 'user-read-private', 'user-top-read'],
      showDialog: true
    })
  )

  router.get(
    '/callback',
    passport.authenticate('spotify', {
      failureRedirect: '/',
      successRedirect: '/home'
    })
  )
}
