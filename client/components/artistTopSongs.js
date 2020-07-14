import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

const dummyData = {
  name: 'Childish Gambino',
  children: [
    {
      name: 'Redbone',
      children: [
        {
          duration_ms: 326933,
          popularity: 82
        },
        {
          duration_ms: 225773,
          popularity: 80
        },
        {
          duration_ms: 234215,
          popularity: 75
        },
        {
          duration_ms: 297404,
          popularity: 73
        },
        {
          duration_ms: 252026,
          popularity: 72
        }
      ],
      popularity: 82
    },
    {
      name: 'This is America',
      popularity: 80
    },
    {
      name: '3005',
      popularity: 75
    },
    {
      name: 'Feels Like Summer',
      popularity: 73
    },
    {
      name: 'Sober',
      popularity: 72
    }
  ]
}

const width = 975
const height = 1000

const format = d3.format(',d')

const color = d3.scaleOrdinal(
  d3.quantize(d3.interpolateRainbow, dummyData.children.length + 1)
)

const partition = data => {
  const root = d3
    .hierarchy(data)
    .sum(d => d.popularity)
    .sort((a, b) => b.duration_ms - a.duration_ms || b.value - a.value)
  return d3.partition().size([height, (root.height + 1) * width / 3])(root)
}

const root = partition(dummyData)

const artistTopSongs = props => {
  const artist = props.singleTopArtist
  const svgDataArr = root.descendants()

  return (
    // <div>
    //   {/* {artist.topTracks.map(track => (
    //     <li key={track.id}>
    //       {track.name} Popularity : {track.popularity}
    //     </li>
    //   ))} */}
    // </div>
    <svg viewBox={`0,0,${width},${height}`}>
      {svgDataArr.map(d => (
        <g key={d.data.name} transform={`translate(${d.y0},${d.x0})`}>
          <rect
            width={d.y1 - d.y0}
            height={d.x1 - d.x0}
            fillOpacity={0.6}
            fill={!d.depth ? 'ccc' : color(d.data.name)}
          />
          <text x={4} y={13}>
            <tspan>{d.data.name}</tspan>
            <tspan fillOpacity={0.7}>{d.value}</tspan>
            <title>{`${d.data.name}\n ${d.value}`} </title>
          </text>
        </g>
      ))}
    </svg>
  )
}

const mapState = state => ({
  singleTopArtist: state.singleTopArtist
})

export default connect(mapState, null)(artistTopSongs)
