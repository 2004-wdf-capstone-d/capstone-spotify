import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

const artistAlbums = props => {
  // let data = props.singleTopArtist.albums

  let data = {
    name: 'flare',
    albums: [
      {
        albumName: 'Hi!',
        tracks: [
          {
            trackName: 'track1'
          },
          {
            trackName: 'track2'
          }
        ]
      },
      {
        albumName: 'Bye!',
        tracks: [
          {
            trackName: 'track3'
          },
          {
            trackName: 'track4'
          }
        ]
      }
    ]
  }

  const partition = someData => {
    const root = d3
      .hierarchy(someData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value)
    return d3.partition().size([2 * Math.PI, root.height + 1])(root)
  }

  const root = partition(data)
  console.log('ROOT', root)

  let color = d3.scaleOrdinal(
    d3.quantize(d3.interpolateRainbow, data.albums.length)
  )

  let format = d3.format(',d')

  let width = 932

  let radius = width / 6

  const arc = d3
    .arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius(d => d.y0 * radius)
    .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${width}`}
        fontFamily="sans-serif"
        fontSize="10"
      >
        <g transform={`translate(${width / 2}, ${width / 2})`}>
          <path
            func={d3
              .selectAll('path')
              .data(root.descendants().slice(1))
              .join('path')
              .attr('fill', d => {
                while (d.depth > 1) d = d.parent
                return color(d.data.name)
              })}
          />
        </g>
      </svg>
    </div>
    // <div>
    //   {artist.albums.map(album => (
    //     <li key={album.id}>
    //       <h2>{album.name}</h2>
    //     </li>
    //   ))}
    // </div>
  )
}

const mapState = state => ({
  singleTopArtist: state.singleTopArtist
})

export default connect(mapState, null)(artistAlbums)
