import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'
import {Example} from './example'

const DisplayPage = props => {
  useEffect(() => {
    props.fetchTopArtist()
    console.log(props.topArtists)
  }, [])
  return props.user._id ? (
    <div>
      {props.topArtists.map(artist => <li key={artist.id}>{artist.name}</li>)}
    </div>
  ) : (
    <Example />
  )
}

const mapState = state => {
  return {
    user: state.user,
    topArtists: state.topArtists
  }
}

const mapDIspatch = dispatch => {
  return {fetchTopArtist: () => dispatch(fetchTopArtist())}
}

export default connect(mapState, mapDIspatch)(DisplayPage)
