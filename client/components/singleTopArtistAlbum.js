import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleArtistAlbum} from '../store/singleTopArtistAlbum'

class SingleTopArtistAlbum extends React.Component {
  componentDidMount() {
    this.props.fetchSingleArtistAlbum()
  }

  render() {
    console.log('PROPS', this.props)
    return (
      <div>
        <h2>Hi!</h2>
      </div>
    )
  }
}

const mapState = state => ({
  artistAlbum: state.SingleTopArtistAlbum
})

const mapdispatch = dispatch => ({
  fetchSingleArtistAlbum: artistId => dispatch(fetchSingleArtistAlbum(artistId))
})

export default connect(mapState, mapdispatch)(SingleTopArtistAlbum)
