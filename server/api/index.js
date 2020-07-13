const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/spotify', require('./spotify'))
router.use('/audio-features', require('./audioFeatures'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
