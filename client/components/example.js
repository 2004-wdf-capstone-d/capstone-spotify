import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

export const Example = props => {
  const {audioFeatures} = props

  const data = audioFeatures.map(track => {
    const trackArray = [
      {
        name: 'danceability',
        value: track.danceability
      },
      {
        name: 'energy',
        value: track.energy
      },
      {
        name: 'speechiness',
        value: track.speechiness
      },
      {
        name: 'acousticness',
        value: track.acousticness
      },
      {
        name: 'liveness',
        value: track.liveness
      }
    ]
    return trackArray
  })

  let width = window.innerWidth

  if (data.length) {
    return (
      <div>
        <h1>Audio Features of the Top Streaming Tracks on Spotify</h1>
        <h5>based on last data pull: July 3, 2020</h5>

        {data.map((track, index) => {
          let x = d3
            .scaleLinear()
            .domain([0, 1])
            .range([0, width])
          let y = d3
            .scaleBand()
            .domain(track.map(dataPoint => dataPoint.name))
            .range([0, 20 * data[0].length])

          return (
            <div key={index}>
              <h3>#{props.topCharts[index].position}</h3>
              <h3>Artist: {props.topCharts[index].artist}</h3>
              <h3>Track: {props.topCharts[index].trackName}</h3>
              <svg
                width={width}
                height={y.range()[1]}
                fontFamily="sans-serif"
                fontSize="10"
                textAnchor="end"
              >
                {track.map((dataPoint, i) => (
                  <g key={i} transform={`translate(0,${y(dataPoint.name)})`}>
                    <rect
                      fill="steelblue"
                      width={x(dataPoint.value)}
                      height={y.bandwidth() - 1}
                    />
                    <text
                      fill="black"
                      x={x(dataPoint.value)}
                      y={y.bandwidth() / 2}
                      dy="0.35em"
                    >
                      {dataPoint.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          )
        })}
      </div>
    )
  } else {
    return <h5>Loading...</h5>
  }
}

const mapState = state => {
  return {
    topCharts: state.topCharts,
    audioFeatures: state.audioFeatures
  }
}

export default connect(mapState)(Example)

// sample chart for audio features
// https://www.d3-graph-gallery.com/spider.html

// usage of transitions
// https://www.d3-graph-gallery.com/graph/interactivity_transition.html
