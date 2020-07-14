import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

const width = 500
const height = 500

const partition1 = data => {
  const root = d3
    .hierarchy(data, d => d.topTracks)
    .sum(d => d.popularity)
    .sort((a, b) => b.duration_ms - a.duration_ms || b.value - a.value)
  return d3.partition().size([height, (root.height + 1) * width / 3])(root)
}

const artistTopSongs = props => {
  const artist = props.singleTopArtist

  const color = d3.scaleOrdinal(
    d3.quantize(d3.interpolateRainbow, artist.topTracks.length + 1) //use css to chnage the color
  )

  const root = partition1(artist)
  const svgDataArr = root.descendants()
  console.log({svgDataArr})
  return (
    <div>
      <svg viewBox={`0,0,${width},${height}`}>
        {svgDataArr.map(d => (
          <g key={d.data.name} transform={`translate(${d.y0},${d.x0})`}>
            <rect
              className={d.data.name
                .toLowerCase()
                .split(' ')
                .join('-')}
              width={d.y1 - d.y0}
              height={d.x1 - d.x0}
              fillOpacity={0.6}
              fill={!d.depth ? 'ccc' : color(d.data.name)}
            />
            <text x={4} y={13}>
              <tspan />
              <tspan fillOpacity={0.7} />
              <title>{`${d.data.name}\n ${d.value}`} </title>
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

const mapState = state => ({
  singleTopArtist: state.singleTopArtist
})

export default connect(mapState, null)(artistTopSongs)
