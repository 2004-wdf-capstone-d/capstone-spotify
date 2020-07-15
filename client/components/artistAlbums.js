import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import artistTopSongs from './artistTopSongs'

const artistAlbums = props => {
  // let data = {
  //   name: 'TOPICS',
  //   children: [
  //     {
  //       name: 'Topic A',
  //       children: [{name: 'Sub A1', size: 4}, {name: 'Sub A2', size: 4}]
  //     },
  //     {
  //       name: 'Topic B',
  //       children: [
  //         {name: 'Sub B1', size: 3},
  //         {name: 'Sub B2', size: 3},
  //         {
  //           name: 'Sub B3',
  //           size: 3
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Topic C',
  //       children: [{name: 'Sub A1', size: 4}, {name: 'Sub A2', size: 4}]
  //     }
  //   ]
  // }

  const artist = props.singleTopArtist
  console.log('ARTIST', artist)

  const data = {
    name: artist.name,
    children: artist.albums.map(album => ({
      name: album.name,
      children: album.tracks.items.map(track => ({
        name: track.name,
        size: 4
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

  // console.log('ROOT', root)

  // console.log('PARTITION(ROOT)', partition(root))

  const arc = d3
    .arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1)

  return (
    <div>
      <svg width={width} height={height}>
        {array.map((child, index) => {
          // console.log('CHILD', child)
          return (
            <g key={index} transform={`translate(${width / 2}, ${width / 2})`}>
              <path
                data={partition(child)}
                d={arc(child)}
                display={d => (d.depth ? null : 'none')}
                stroke="#fff"
                fill={d => color(d.children ? d : d.parent).data.name}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

const mapState = state => ({
  singleTopArtist: state.singleTopArtist
})

export default connect(mapState, null)(artistAlbums)
