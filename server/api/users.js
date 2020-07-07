const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router
const refreshAccessToken = require('./refreshAccess')

router.get('/', refreshAccessToken, async (req, res, next) => {
  try {
    // const users = await User.findAll({
    //   // explicitly select only the id and email fields - even though
    //   // users' passwords are encrypted, it won't help if we just
    //   // send everything to anyone who asks!
    //   attributes: ['id', 'email']
    // })
    res.json(req.user)
  } catch (err) {
    next(err)
  }
})

// // route for top artists
// router.get('/topArtists', validationMiddleware, async (req, res, next) => {
//   try {
//     const accessToken = getState().user.accessToken
//     const {data} = await Axios.get(
//       'https://api.spotify.com/v1/me/top/artists?time_range=long_term',
//       {
//         headers: {
//           Authorization: 'Bearer ' + accessToken,
//           'Content-Type': 'application/json'
//         }
//       }
//     )
//     res.json(data)
//   } catch (error) {
//     next(error)
//   }
// })
