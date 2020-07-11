import React from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

const Sidebar = props => (
  <div id="sidebar">
    <Link to="/top-ten-global">Top Ten Global Artists</Link>
    <Link to="/"> user's top artists</Link>
  </div>
)

export default connect(null)(Sidebar)