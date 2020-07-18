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
  ///Top charts bulk create here!
  await TopChart.insertMany(topCharts)
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
