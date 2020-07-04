const mongoose = require('mongoose')

const TopChart = mongoose.model(
  'TopChart',
  new mongoose.Schema({
    Position: {
      type: Number,
      required: true
    },
    Track_Name: {
      type: String,
      required: true
    },
    Artist: {
      type: String,
      required: true
    },
    Streams: {
      type: Number,
      required: true
    },
    URL: {
      type: String,
      required: true
    }
  })
)

module.exports = TopChart
