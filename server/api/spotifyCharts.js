const router = require('express').Router()
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
