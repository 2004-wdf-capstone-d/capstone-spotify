import React, {useEffect} from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {fetchTopTen} from '../store/topCharts'
import {fetchAudioFeatures} from '../store/audioFeatures'

export const Example = props => {
  const {audioFeatures} = props

  const data = [
    [
      {danceability: audioFeatures.danceability},
      {energy: audioFeatures.energy},
      {speechiness: audioFeatures.speechiness},
      {acousticness: audioFeatures.acousticness},
      {instrumentalness: audioFeatures.instrumentalness},
      {liveness: audioFeatures.liveness}
    ]
  ]

  console.log('data', data)

  let width = 420

  let x = d3
    .scaleLinear()
    .domain([0, d3.max(props.topCharts, dataPoint => dataPoint.streams)])
    .range([0, width])
  let y = d3
    .scaleBand()
    .domain(props.topCharts.map(dataPoint => dataPoint.artist))
    .range([0, 20 * props.topCharts.length])

  return (
    <svg
      width={width}
      height={y.range()[1]}
      fontFamily="sans-serif"
      fontSize="10"
      textAnchor="end"
    >
      {props.topCharts.map((dataPoint, i) => (
        <g key={i} transform={`translate(0,${y(dataPoint.artist)})`}>
          <rect
            fill="steelblue"
            width={x(dataPoint.streams)}
            height={y.bandwidth() - 1}
          />
          <text
            fill="white"
            x={x(dataPoint.streams)}
            y={y.bandwidth() / 2}
            dy="0.35em"
          >
            {dataPoint.artist}
          </text>
        </g>
      ))}
    </svg>
  )
}

const mapState = state => {
  return {
    topCharts: state.topCharts,
    audioFeatures: state.audioFeatures
  }
}

// const mapDispatch = dispatch => {
//   return {
//     fetchTopTen: () => dispatch(fetchTopTen()),
//     fetchAudioFeatures: () => dispatch(fetchAudioFeatures())
//   }
// }

export default connect(mapState)(Example)

// sample chart for audio features
// https://www.d3-graph-gallery.com/spider.html

// usage of transitions
// https://www.d3-graph-gallery.com/graph/interactivity_transition.html
