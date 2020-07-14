import React from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

const Sidebar = props => {
  const {isLoggedIn} = props
  return isLoggedIn ? (
    <div id="sidebar">
      <Link to="/top-global">Top Streaming Artists</Link>
      <Link to="/my-audio-features">My Audio Features</Link>
      <Link to="/"> user's top artists</Link>
    </div>
  ) : (
    <div />
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user._id
  }
}

export default connect(mapState)(Sidebar)
