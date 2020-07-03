/* eslint-disable */

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/testDB', {useNewUrlParser: true})
const db = mongoose.connection

const {User} = require('../server/db/models/index.js')
async function seed() {
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function() {
    // we're connected!
    console.log('DB open!')
  })
  await db.dropDatabase()
  console.log('All DB dropped')

  const newUser = await User.create({
    display_name: 'JM Wizzler',
    email: 'email@example.com',
    href: 'https://api.spotify.com/v1/users/wizzler',
    spotifyId: 'wizzler',
    images: [
      'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg'
    ],
    sessionId: 1
  })

  console.log(`seeded a user`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

runSeed()
