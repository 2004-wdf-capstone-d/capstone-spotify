import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'
import {fetchAudioFeatures} from '../store/audioFeatures'
import {Route, Switch, Link} from 'react-router-dom'
import {default as UserTopArtists} from './userTopArtists'

import {default as artistAlbums} from './artistAlbums'
import {default as artistTopSongsPopularity} from './artistTopSongsPopularity'
import history from '../history'
import {
  fetchSingleArtistTopSongs,
  fetchArtistAlbums
} from '../store/singleTopArtist'

class SingleTopArtist extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {}

  async handleClick(event) {
    if (event.target.type === 'button') {
      if (event.target.innerHTML === 'Top Songs') {
        if (!this.props.singleTopArtist.topTracks) {
          await this.props.fetchSingleArtistTopSongs()
        }
        history.push(`${this.props.match.url}/top-songs`)
      } else if (event.target.innerHTML === 'Albums') {
        if (!this.props.singleTopArtist.albums) {
          await this.props.fetchArtistAlbums()
        }
        history.push(`${this.props.match.url}/artist-albums`)
      }
    }
  }

  render() {
    const artist = this.props.singleTopArtist
    return (
      <div>
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img
                    src={
                      artist.images.length ? artist.images[2].url : 'no image'
                    }
                  />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4"> {artist.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div onClick={this.handleClick}>
          <button type="button">Top Songs</button>
          <button type="button">Albums</button>
        </div>
        <Switch>
          <Route
            exact
            path={`${this.props.match.url}/top-songs`}
            component={artistTopSongsPopularity}
          />
          <Route
            exact
            path={`${this.props.match.url}/artist-albums`}
            component={artistAlbums}
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
    fetchSingleArtistTopSongs: () => dispatch(fetchSingleArtistTopSongs()),
    fetchArtistAlbums: () => dispatch(fetchArtistAlbums())
  }
}

export default connect(mapState, mapDispatch)(SingleTopArtist)
