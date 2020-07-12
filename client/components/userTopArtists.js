import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtistAlbum} from '../store/user-topArtist'
import {fetchSingleArtistAlbum} from '../store/singleTopArtistAlbum'
// import SingleTopArtistAlbum from '../components/singleTopArtistAlbum'

// const handleClick = (event) => {
//   console.log(event.target)
//   fetchTopArtistAlbum()
// }

const UserTopArtists = props => {
  return (
    <div>
      {props.topArtists.map(artist => (
        <li
          key={artist.id}
          onClick={() => props.fetchSingleArtistAlbum(artist)}
        >
          {artist.name}
        </li>
      ))}
    </div>
  )
}

const mapState = state => ({
  topArtists: state.topArtists,
  artistAlbum: state.singleTopArtistAlbum
})

const mapDispatch = dispatch => ({
  fetchTopArtistAlbum: artistId => dispatch(fetchTopArtistAlbum(artistId)),
  fetchSingleArtistAlbum: artistId => dispatch(fetchSingleArtistAlbum(artistId))
})

export default connect(mapState, mapDispatch)(UserTopArtists)
