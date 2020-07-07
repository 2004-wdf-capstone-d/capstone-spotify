import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {displayName, email} = props
  return (
    <div>
      <h3>Welcome, {displayName}</h3>
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
    displayName: state.user.displayName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
