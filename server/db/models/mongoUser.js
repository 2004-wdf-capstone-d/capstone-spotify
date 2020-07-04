const mongoose = require('mongoose')

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    spotifyId: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    sessionId: {
      type: Number,
      required: true
    },
    images: [String],
    href: {
      type: String,
      required: true
    },
    display_name: {
      type: String,
      required: true
    }
  })
)

module.exports = User
