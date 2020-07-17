import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {logout} from '../store'
import {default as SelectedTrack} from './audioFeatures/selectedTrack'
import {clearSelectedTrack} from '../store/selectedTrack'

const Sidebar = ({isLoggedIn, selectedTrack, clearSelectedTrack}) => {
  const handleClear = () => {
    clearSelectedTrack()
  }

  return (
    <div className="container ml-5">
      {isLoggedIn ? (
        <div className="menu my-4">
          <p className="menu-label has-text-light">Menu</p>
          <ul className="menu-list mb-5">
            <li>
              <Link to="/top-global" className="has-text-light has-text-left">
                Global Top Tracks' Audio Features
              </Link>
            </li>
            <li>
              <Link
                to="/my-audio-features"
                className="has-text-light has-text-left"
              >
                Your Top Tracks' Audio Features
              </Link>
            </li>
            <li>
              <Link to="/" className="has-text-light has-text-left">
                Your Top Artists
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
      <div className="container is-dark mt-4 mb-5">
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
            <button
              className="button is-small my-2 is-rounded is-inverted is-outlined is-black"
              onClick={handleClear}
            >
              Clear Track
            </button>
          </div>
        ) : null}
      </div>
      {selectedTrack.features ? (
        <SelectedTrack width={window.innerWidth * 0.2} />
      ) : null}
    </div>
  )
}

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
    clearSelectedTrack: () => dispatch(clearSelectedTrack())
  }
}

export default connect(mapState, mapDispatch)(Sidebar)

/**
 * PROP TYPES
 */
Sidebar.propTypes = {
  // handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
