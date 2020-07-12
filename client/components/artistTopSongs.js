import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

const artistTopSongs = props => {
  const artist = props.singleTopArtist
  return (
    <div>
      {artist.topTracks.map(track => (
        <li key={track.id}>
          {track.name} Popularity : {track.popularity}
        </li>
      ))}
    </div>
  )
}

const mapState = state => ({
  singleTopArtist: state.singleTopArtist
})

export default connect(mapState, null)(artistTopSongs)
