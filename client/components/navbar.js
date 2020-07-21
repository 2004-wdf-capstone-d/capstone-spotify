import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {clearSelectedTrack} from '../store/selectedTrack'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav className="navbar is-black has-text-light" role="navigation">
    <div className="navbar-brand">
      <div className="navbar-start is-flex-touch">
        <img
          src="./ekopiquelogo.png"
          width="25%"
          style={{marginLeft: '4%'}}
          alt="logo"
        />
      </div>
      <a
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navBarHasMobileView"
        onClick={() => {
          if (event.target.tagName === 'A') {
            const newTarget = document.getElementById(
              event.target.dataset.target
            )
            event.target.classList.toggle('is-active')
            newTarget.classList.toggle('is-active')
          }
          if (event.target.parentNode.tagName === 'A') {
            const newTarget = document.getElementById(
              event.target.parentNode.dataset.target
            )
            event.target.parentNode.classList.toggle('is-active')
            newTarget.classList.toggle('is-active')
          }
        }}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div id="navBarHasMobileView" className="navbar-menu">
      <div className="navbar-end">
        {isLoggedIn ? (
          <div className="navbar-item">
            <div className="buttons">
              <Link
                to="/home"
                className="button is-small is-black is-inverted is-rounded is-outlined"
              >
                Your Profile
              </Link>
              <a
                href="#"
                onClick={handleClick}
                className="button is-small is-black is-inverted is-rounded is-outlined"
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
                try {
                  localStorage.setItem('isLoggedIn', 'true')
                } catch (error) {
                  return undefined
                }
              }}
            >
              Log in with Spotify
            </a>
          </div>
        )}
      </div>
    </div>
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
