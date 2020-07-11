import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleArtistTopSongs} from '../store/userSingleTopArtist'

const UserTopArtists = props => {
  return (
    <div>
      {props.topArtists.map(artist => (
        <li
          key={artist.id}
          onClick={() => props.fetchSingleArtistTopSongs(artist)}
        >
          {artist.name}
        </li>
      ))}
    </div>
  )
}

const mapState = state => {
  return {
    topArtists: state.topArtists,
    userSingleTopArtist: state.userSingleTopArtist
  }
}

const mapDispatch = dispatch => ({
  fetchSingleArtistTopSongs: artist =>
    dispatch(fetchSingleArtistTopSongs(artist))
})

export default connect(mapState, mapDispatch)(UserTopArtists)
