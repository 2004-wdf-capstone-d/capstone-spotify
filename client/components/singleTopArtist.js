import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'
import {fetchAudioFeatures} from '../store/audioFeatures'
import {Route, Switch} from 'react-router-dom'
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
      if (event.target.id === 'topSongs') {
        if (!this.props.singleTopArtist.topTracks) {
          await this.props.fetchSingleArtistTopSongs()
        }
        history.push(`${this.props.match.url}/top-songs`)
      } else if (event.target.id === 'albums') {
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
      <div className="mt-4">
        <div className="artist-card card has-background-black-ter has-text-light">
          <div className="card-content">
            <div className="level">
              <div className="level-left">
                <figure className="image is-64x64 level-item">
                  <img
                    src={
                      artist.images.length ? artist.images[2].url : 'no image'
                    }
                  />
                </figure>
                <p className="title is-4 mb-0 level-item has-text-light">
                  {' '}
                  {artist.name}
                </p>
              </div>
              <div className="level-right">
                <div className="content level-item" onClick={this.handleClick}>
                  <button
                    id="topSongs"
                    className="button mr-4 level-item is-rounded is-inverted is-outlined is-black"
                    type="button"
                  >
                    Top Songs
                  </button>
                  <button
                    id="albums"
                    className="button level-item is-rounded is-inverted is-outlined is-black"
                    type="button"
                  >
                    Albums
                  </button>
                </div>
              </div>
            </div>
          </div>
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
