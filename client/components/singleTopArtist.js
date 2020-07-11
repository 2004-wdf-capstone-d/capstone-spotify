import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'
import {fetchTopTen} from '../store/topCharts'
import {fetchAudioFeatures} from '../store/audioFeatures'
//import {fetchSingleArtistTopSongs} from '../store/userSingleTopArtist'
import {default as Example} from './example'
import {Route, Switch} from 'react-router-dom'
import {default as UserTopArtists} from './userTopArtists'
import {default as Sidebar} from './sidebar'

class SingleTopArtist extends React.Component {
  componentDidMount() {}

  render() {
    console.log(this.props)
    const artist = this.props.userSingleTopArtist
    return (
      <div>
        <h2>{artist.name}</h2>
        {artist.topTracks.map(track => (
          <li key={track.id}>
            {track.name} Popularity : {track.popularity}
          </li>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    topArtists: state.topArtists,
    topCharts: state.topCharts,
    audioFeatures: state.audioFeatures,
    userSingleTopArtist: state.userSingleTopArtist
  }
}

const mapDispatch = dispatch => {
  return {
    fetchTopArtist: () => dispatch(fetchTopArtist()),
    fetchTopTen: () => dispatch(fetchTopTen()),
    fetchAudioFeatures: () => dispatch(fetchAudioFeatures()),
    fetchSingleArtistTopSongs: () => dispatch(fetchSingleArtistTopSongs())
  }
}

export default connect(mapState, mapDispatch)(SingleTopArtist)
