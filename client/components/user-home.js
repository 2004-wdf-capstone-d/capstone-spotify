import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {display_name, email} = props
  return (
    <div>
      <h3>Welcome, {display_name}</h3>
      <h3>{email}</h3>
      <h3>Images</h3>
      <h3 />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    display_name: state.user.display_name
  }
}

// const mapDIspatch = dispatch => {
//   return {fetchTopArtist: () => dispatch(fetchTopArtist())}
// }

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
