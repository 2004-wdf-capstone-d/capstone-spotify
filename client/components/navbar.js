import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {default as SelectedTrack} from './audioFeatures/selectedTrack'

const Navbar = ({handleClick, isLoggedIn, selectedTrack}) => (
  <div id="side-bar">
    <div>
      <h1>ekoPique</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            <div>
              <Link to="/home">Your Profile</Link>
            </div>
            <div>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          </div>
        ) : (
          <div>
            <a href="/auth/spotify">Log in with Spotify</a>
          </div>
        )}
      </nav>
      <nav>
        {isLoggedIn ? (
          <div>
            <hr />
            <Link to="/top-global">Global Top Tracks' Audio Features</Link>
            <Link to="/my-audio-features">Your Top Tracks' Audio Features</Link>
            <Link to="/">Your Top Artists</Link>
          </div>
        ) : null}
      </nav>
      <div id="now-playing">
        {selectedTrack.trackId ? (
          <div>
            <hr />
            <h3>Now playing:</h3>
            <div id="now-playing-text">
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
    <hr />
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
