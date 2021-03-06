const mongoose = require('mongoose')

const AudioFeatureTrack = mongoose.model(
  'AudioFeatureTrack',
  new mongoose.Schema({
    position: {
      type: Number
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
      type: Number
    },
    url: {
      type: String
    },
    trackId: {
      type: String,
      required: true
    },
    uri: {
      type: String,
      required: true
    },
    danceability: {
      type: String,
      required: true
    },
    energy: {
      type: Number,
      required: true
    },
    speechiness: {
      type: Number,
      required: true
    },
    acousticness: {
      type: String,
      required: true
    },
    liveness: {
      type: String,
      required: true
    },
    valence: {
      type: Number,
      required: true
    }
  })
)

module.exports = AudioFeatureTrack
