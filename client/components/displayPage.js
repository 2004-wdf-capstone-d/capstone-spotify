import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'
import {Example} from './example'

export class DisplayPage extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.user._id !== prevProps.user._id) {
      this.props.fetchTopArtist()
    }
  }

  render() {
    return this.props.user._id ? (
      <div>
        {this.props.topArtists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </div>
    ) : (
      <Example />
    )
  }
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
