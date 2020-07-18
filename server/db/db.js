const mongoose = require('mongoose')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

mongoose.connect(
  process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${databaseName}`,
  {useNewUrlParser: true}
)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'mongodb connection error:'))

module.exports = db

if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
