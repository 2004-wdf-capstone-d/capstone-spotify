const router = require('express').Router()
module.exports = router

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  const user = {...req.user._doc}
  //console.log(user);
  delete user.accessToken
  delete user.refreshToken
  //console.log(req.user);
  res.json(user)
})

router.use('/spotify', require('./spotify'))
