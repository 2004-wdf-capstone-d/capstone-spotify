import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'
import {setAudioFeature} from '../store/currentAudioFeature'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user, topArtists, fetchTopArtist} = props
  const {
    displayName,
    email,
    followers,
    country,
    images,
    product,
    profileUrl
  } = user

  useEffect(() => {
    async function fetch() {
      await fetchTopArtist()
    }
    fetch()
  }, [])

  return (
    <div className="mt-4">
      <div>
        <h1 className="title is-size-2 has-text-light">
          Welcome, {displayName}
        </h1>
      </div>

      <div className="columns mt-3">
        <div className="level-left column is-one-fifth">
          {images.length ? (
            <img className="is-128x128" src={images[0].url} />
          ) : (
            <i className="fas fa-user fa-8x" />
          )}
        </div>
        <div className="column">
          <h3>{displayName}</h3>
          <h3>{email}</h3>
          <h3> Country: {country}</h3>
          <h3>Followers: {followers}</h3>
          <h3>
            Profile URL:{' '}
            <a className="on-hover" href={profileUrl}>
              {profileUrl}
            </a>
          </h3>
          <h3>Subscription: {product}</h3>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    topArtists: state.topArtists,
    audioFeatureData: state.audioFeatureData
  }
}

const mapDispatch = dispatch => {
  return {
    fetchTopArtist: () => dispatch(fetchTopArtist()),
    setAudioFeature: (data, settings) =>
      dispatch(setAudioFeature(data, settings))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
