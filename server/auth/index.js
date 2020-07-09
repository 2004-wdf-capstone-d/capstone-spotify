const router = require('express').Router()
module.exports = router

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  const user = {...req.user._doc}
  delete user.accessToken
  delete user.refreshToken
  res.json(user)
})

router.use('/spotify', require('./spotify'))
