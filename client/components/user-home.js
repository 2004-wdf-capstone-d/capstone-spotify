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
  const {displayName, email, images} = user

  useEffect(() => {
    async function fetch() {
      await fetchTopArtist()
    }
    fetch()
  }, [])

  return (
    <div>
      <h3>Welcome, {displayName}</h3>
      <h3>{email}</h3>
      <div>
        {images.length ? (
          <img src={images[0].url} />
        ) : (
          <i className="fas fa-user" />
        )}
        {/* {topArtists ? (
          <div>
            <h3>Your Top Artists</h3>
            {topArtists.map((artist, index) => {
              return artist.images.length ? (
                <figure key={index} className="image is-square test">
                  <img
                    // width="10%"
                    // height="10%"
                    className="is-rounded"
                    src={artist.images[0].url}
                  />

                </figure>
              ) : null
            })}
          </div>
        ) : null} */}
      </div>
      <h3 />
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
