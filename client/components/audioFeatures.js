import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

export const AudioFeatures = props => {
  const {audioFeatures} = props

  const data = audioFeatures.reduce(
    (dataArray, curTrack, index) => {
      dataArray[0].push({
        artist: props.topCharts[index].artist,
        trackName: props.topCharts[index].trackName,
        feature: 'danceability',
        value: curTrack.danceability
      })
      dataArray[1].push({
        artist: props.topCharts[index].artist,
        trackName: props.topCharts[index].trackName,
        feature: 'energy',
        value: curTrack.energy
      })
      dataArray[2].push({
        artist: props.topCharts[index].artist,
        trackName: props.topCharts[index].trackName,
        feature: 'speechiness',
        value: curTrack.speechiness
      })
      dataArray[3].push({
        artist: props.topCharts[index].artist,
        trackName: props.topCharts[index].trackName,
        feature: 'acousticness',
        value: curTrack.acousticness
      })
      dataArray[4].push({
        artist: props.topCharts[index].artist,
        trackName: props.topCharts[index].trackName,
        feature: 'liveness',
        value: curTrack.liveness
      })
      dataArray[5].push({
        artist: props.topCharts[index].artist,
        trackName: props.topCharts[index].trackName,
        feature: 'valence',
        value: curTrack.valence
      })
      return dataArray
    },
    [[], [], [], [], [], []]
  )

  let width = window.innerWidth

  if (data[0].length) {
    return (
      <div>
        <h1>Audio Features of the Top Streaming Tracks on Spotify</h1>
        <h5>based on global weekly charts from July 9, 2020</h5>

        {data.map((feature, index) => {
          let x = d3
            .scaleLinear()
            .domain([0, 1])
            .range([0, width])
          let y = d3
            .scaleBand()
            .domain(feature.map(dataPoint => dataPoint.trackName))
            .range([0, 50 * data[0].length])

          return (
            <div key={index}>
              <h3>Audio Feature: {data[index][0].feature}</h3>
              <svg
                width={width}
                height={y.range()[1]}
                fontFamily="sans-serif"
                fontSize="18"
              >
                {feature.map((dataPoint, index) => (
                  <g
                    key={index}
                    transform={`translate(0,${y(dataPoint.trackName)})`}
                  >
                    <rect
                      fill="limegreen"
                      width={x(dataPoint.value)}
                      height={y.bandwidth() - 1}
                    />
                    <text
                      fill="black"
                      x={x(0)}
                      y={y.bandwidth() / 2}
                      dy="0.35em"
                    >
                      {dataPoint.artist} : {dataPoint.trackName}
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

export default connect(mapState)(AudioFeatures)
