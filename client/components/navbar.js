import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {clearSelectedTrack} from '../store/selectedTrack'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav className="navbar has-background-black has-text-light" role="navigation">
    <div className="navbar-brand">
      <h1 className="navbar-item">ekoPique</h1>
    </div>
    <div className="navbar-menu">
      <div className="navbar-end">
        {isLoggedIn ? (
          <div className="navbar-item">
            <div className="navbar-item">
              <Link
                to="/home"
                className="button is-black is-inverted is-rounded is-outlined"
              >
                Your Profile
              </Link>
            </div>
            <div className="navbar-item">
              <a
                href="#"
                onClick={handleClick}
                className="button is-black is-inverted is-rounded is-outlined"
              >
                Logout
              </a>
            </div>
          </div>
        ) : (
          <div className="navbar-item">
            <a
              href="/auth/spotify"
              className="button is-black is-inverted is-rounded is-outlined"
              onClick={() => {
                localStorage.setItem('isLoggedIn', 'true')
              }}
            >
              Log in with Spotify
            </a>
          </div>
        )}
      </div>
    </div>
    <hr />
  </nav>
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
      dispatch(clearSelectedTrack())
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
