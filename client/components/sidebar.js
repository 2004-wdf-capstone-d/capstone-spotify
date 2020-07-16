import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {default as SelectedTrack} from './audioFeatures/selectedTrack'

const Sidebar = ({handleClick, isLoggedIn, selectedTrack}) => (
  <div>
    <div>
      {isLoggedIn ? (
        <div className="menu">
          <p className="menu-label">Menu</p>
          <ul className="menu-list">
            <li>
              <Link to="/top-global">Global Top Tracks' Audio Features</Link>
            </li>
            <li>
              <Link to="/my-audio-features">
                Your Top Tracks' Audio Features
              </Link>
            </li>
            <li>
              <Link to="/">Your Top Artists</Link>
            </li>
          </ul>
        </div>
      ) : null}
      <div className="container ml-5 my-4 mr-2">
        {selectedTrack.trackId ? (
          <div>
            <div className="container mx-4 my-4">
              <h3>Now playing:</h3>
              <h5>
                {selectedTrack.artist} - "{selectedTrack.trackName}"
              </h5>
              {selectedTrack.streams ? (
                <h5>Streams: {selectedTrack.streams}</h5>
              ) : null}
            </div>
            <iframe
              src={`https://open.spotify.com/embed/track/${selectedTrack.uri.substring(
                14
              )}`}
              width="240"
              height="80"
              allow="encrypted-media"
            />
          </div>
        ) : null}
        {selectedTrack.features ? (
          <div>
            <SelectedTrack width="240" />
          </div>
        ) : null}
      </div>
    </div>
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
