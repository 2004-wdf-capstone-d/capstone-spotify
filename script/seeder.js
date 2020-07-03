const db = require('../server/db/index')
const csvtojson = require('csvtojson')

const {User, TopChart} = require('../server/db/models/index.js')

async function seed() {
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function() {
    // we're connected!
    console.log('DB open!')
  })
  await db.dropDatabase()
  console.log('All DB dropped')
  const topCharts = await csvtojson().fromFile('./script/topCharts.csv')
  console.log('topCharts Array created from csv')

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
  ///Top charts bulk create here!
  await TopChart.insertMany(topCharts)

  console.log(`seeded a user`)
  console.log(`seeded successfully`)
  console.log(newUser)
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
