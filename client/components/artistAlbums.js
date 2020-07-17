import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import ReactTooltip from 'react-tooltip'
import {setSingleTrack} from '../store/selectedTrack'

const artistAlbums = props => {
  const handleClick = trackObj => {
    if (trackObj.trackId) {
      props.setSingleTrack(trackObj)
    }
  }

  const artist = props.singleTopArtist
  const data = {
    name: artist.name,
    children: artist.albums.map(album => ({
      name: album.name,
      image: album.images.url,
      children: album.tracks.items.map(track => ({
        name: track.name,
        size: album.popularity,
        uri: track.uri,
        artist: track.artists[0].name,
        trackId: track.id,
        trackName: track.name
      }))
    }))
  }

  let width = 800
  let height = 800
  let radius = Math.min(width, height) / 2
  let color = d3.scaleOrdinal(d3.schemeCategory10)

  const partition = data => {
    const root = d3.hierarchy(data).sum(d => d.size)
    return d3.partition().size([2 * Math.PI, radius])(root)
  }

  const root = partition(data)

  const array = root.descendants()
  const arc = d3
    .arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1)

  return (
    <div>
      <svg
        className="svg-sunburst"
        viewBox={`0, 0, ${width}, ${height}`}
        width="45vw"
        height="100%"
      >
        {array.map((child, index) => {
          return (
            <g
              onClick={() => handleClick(child.data)}
              data-tip={
                child.children
                  ? `Album: ${child.data.name}`
                  : `Track: ${child.data.name}`
              }
              key={index}
              transform={`translate(${width / 2}, ${width / 2})`}
            >
              <path
                d={arc(child)}
                display={child.depth ? null : 'none'}
                stroke="#fff"
                fill={color((child.children ? child : child.parent).data.name)}
              />
            </g>
          )
        })}
      </svg>
      <ReactTooltip />
    </div>
  )
}

const mapState = state => ({
  singleTopArtist: state.singleTopArtist
})
const mapDispatch = dispatch => ({
  setSingleTrack: track => dispatch(setSingleTrack(track))
})

export default connect(mapState, mapDispatch)(artistAlbums)
