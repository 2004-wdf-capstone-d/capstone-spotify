const mongoose = require('mongoose')

const TopChart = mongoose.model(
  'TopChart',
  new mongoose.Schema({
    position: {
      type: Number,
      required: true
    },
    trackName: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    streams: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  })
)

module.exports = TopChart
