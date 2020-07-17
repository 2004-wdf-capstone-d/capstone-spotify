import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {default as SelectedTrack} from './audioFeatures/selectedTrack'

const Sidebar = ({isLoggedIn, selectedTrack}) => (
  <div className="container ml-5">
    {isLoggedIn ? (
      <div className="menu mb-2">
        <p className="menu-label">Menu</p>
        <ul className="menu-list mb-5">
          <li>
            <Link to="/top-global">Global Top Tracks' Audio Features</Link>
          </li>
          <li>
            <Link to="/my-audio-features">Your Top Tracks' Audio Features</Link>
          </li>
          <li>
            <Link to="/">Your Top Artists</Link>
          </li>
        </ul>
      </div>
    ) : null}
    <div className="container mb-5">
      {selectedTrack.trackId ? (
        <div>
          <div className="container">
            <h5 className="is-size-6">Now playing:</h5>
            <h5 className="is-size-7 mt-2 mb-4">
              {selectedTrack.artist} - "{selectedTrack.trackName}"
            </h5>
            {selectedTrack.streams ? (
              <h5 className="is-size-7 my-2">
                Streams: {selectedTrack.streams}
              </h5>
            ) : null}
          </div>
          <iframe
            src={`https://open.spotify.com/embed/track/${selectedTrack.uri.substring(
              14
            )}`}
            width="100%"
            height="80"
            allow="encrypted-media"
          />
        </div>
      ) : null}
    </div>
    {selectedTrack.features ? <SelectedTrack width="100%" /> : null}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user._id,
    selectedTrack: state.selectedTrack
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Sidebar)

/**
 * PROP TYPES
 */
Sidebar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
