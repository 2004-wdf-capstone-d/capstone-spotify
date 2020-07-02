import seeder from 'mongoose-seed'

const db = 'mongodb://localhost:27017/testDB'

seeder.connect(db, function() {
  seeder.loadModels(['../server/db/models/index'])

  seeder.clearModels(['User'])
  seeder.populateModels(data, (err, done) => {
    if (err) {
      return console.log('Seed Err', err)
    }
    if (done) {
      return console.log('seed done', done)
    }
    seeder.disconnect()
  })
})

const data = [
  {
    model: 'User',
    documents: [
      {
        country: 'SE',
        display_name: 'JM Wizzler',
        email: 'email@example.com',
        external_urls: {spotify: 'https://open.spotify.com/user/wizzler'},
        followers: {href: null, total: 3829},
        href: 'https://api.spotify.com/v1/users/wizzler',
        id: 'wizzler',
        images: [
          {
            height: null,
            url:
              'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg',
            width: null
          }
        ],
        product: 'premium',
        type: 'user',
        uri: 'spotify:user:wizzler'
      }
    ]
  }
]
