import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtistAlbum} from '../store/user-topArtist'
import {fetchSingleArtistAlbum} from '../store/singleTopArtistAlbum'
// import SingleTopArtistAlbum from '../components/singleTopArtistAlbum'

// const handleClick = (event) => {
//   console.log(event.target)
//   fetchTopArtistAlbum()
// }
import {setTopArtist} from '../store/singleTopArtist'
import history from '../history'

const UserTopArtists = props => {
  return (
    <div>
      {props.topArtists.map(artist => (
        <li
          key={artist.id}
          // onClick={() => props.fetchSingleArtistAlbum(artist)}
          onClick={() => {
            props.setTopArtist(artist)
          }}
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
    singleTopArtist: state.singleTopArtist
  }
}

const mapDispatch = dispatch => ({
  setTopArtist: artist => {
    dispatch(setTopArtist(artist))
    history.push(`/${artist.id}`)
  }
})

export default connect(mapState, mapDispatch)(UserTopArtists)
