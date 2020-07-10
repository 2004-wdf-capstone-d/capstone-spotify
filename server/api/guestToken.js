const Axios = require('axios')

const fetchGuestToken = async (req, res, next) => {
  try {
    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLIENT_SECRET

    const options = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: clientId,
        password: clientSecret
      }
    }

    // post request to obtain guest token
    const {data} = await Axios(options)

    // set the accessToken on the req.body
    req.body.accessToken = data.access_token

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = fetchGuestToken
