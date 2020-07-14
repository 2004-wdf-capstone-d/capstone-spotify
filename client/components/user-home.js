import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'
import {setAudioFeature} from '../store/currentAudioFeature'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {
    user,
    topArtists,
    fetchTopArtist,
    audioFeatureData,
    setAudioFeature
  } = props
  const {displayName, email, images} = user

  useEffect(() => {
    async function fetch() {
      await fetchTopArtist()
      // await setAudioFeature(audioFeatureData, {
      //   feature: 'danceability',
      //   sort: 'position',
      //   data: 0
      // })
    }
    fetch()
  }, [])
  return (
    <div>
      <h3>Welcome, {displayName}</h3>
      <h3>{email}</h3>
      <div>
        {images ? (
          <div>
            {images.map((image, index) => {
              return <img key={index} src={image.url} />
            })}
          </div>
        ) : null}

        {topArtists ? (
          <div>
            <h3>Your Top Artists</h3>
            {topArtists.map((artist, index) => {
              return <img key={index} src={artist.images[2].url} />
            })}
          </div>
        ) : null}
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
