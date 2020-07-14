import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'
//import {fetchTopTen} from '../store/topCharts'
import {fetchAudioFeatures} from '../store/audioFeatures'
//import {fetchSingleArtistTopSongs} from '../store/userSingleTopArtist'
import {Route, Switch, Link} from 'react-router-dom'
import {default as UserTopArtists} from './userTopArtists'
import {default as Sidebar} from './sidebar'
import {default as artistTopSongs} from './artistTopSongs'
import history from '../history'
import {fetchSingleArtistTopSongs} from '../store/singleTopArtist'

class SingleTopArtist extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {}

  async handleClick(event) {
    //console.log(event)
    if (event.target.innerText === 'Top Songs') {
      if (!this.props.singleTopArtist.topTracks) {
        await this.props.fetchSingleArtistTopSongs()
      }
      history.push(`${this.props.match.url}/top-songs`)
    }
  }

  render() {
    const artist = this.props.singleTopArtist
    return (
      <div>
        <h2>{artist.name}</h2>
        <button type="button" onClick={this.handleClick}>
          Top Songs
        </button>
        <Switch>
          <Route
            exact
            path={`${this.props.match.url}/top-songs`}
            component={artistTopSongs}
          />
        </Switch>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    topArtists: state.topArtists,
    audioFeatures: state.audioFeatures,
    singleTopArtist: state.singleTopArtist
  }
}

const mapDispatch = dispatch => {
  return {
    fetchTopArtist: () => dispatch(fetchTopArtist()),
    fetchAudioFeatures: () => dispatch(fetchAudioFeatures()),
    fetchSingleArtistTopSongs: () => dispatch(fetchSingleArtistTopSongs())
  }
}

export default connect(mapState, mapDispatch)(SingleTopArtist)
