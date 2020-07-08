import React from 'react'
import {connect} from 'react-redux'

const UserTopArtists = props => {
  return (
    <div>
      {props.topArtists.map(artist => <li key={artist.id}>{artist.name}</li>)}
    </div>
  )
}

const mapState = state => {
  return {
    topArtists: state.topArtists
  }
}

export default connect(mapState)(UserTopArtists)
