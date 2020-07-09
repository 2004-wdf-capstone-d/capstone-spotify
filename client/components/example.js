import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {fetchTopTen} from '../store/topCharts'

export const Example = props => {
  // constructor(props) {
  //   super(props)

  // }
  // componentDidMount() {
  //   this.props.fetchTopTen()
  // }
  let width = 420
  // render() {

  let x = d3
    .scaleLinear()
    .domain([0, d3.max(props.topCharts, d => d.streams)])
    .range([0, width])
  let y = d3
    .scaleBand()
    .domain(props.topCharts.map(d => d.artist))
    .range([0, 20 * props.topCharts.length])

  return (
    <svg
      width={width}
      height={y.range()[1]}
      fontFamily="sans-serif"
      fontSize="10"
      textAnchor="end"
    >
      {props.topCharts.map((d, i) => (
        <g key={i} transform={`translate(0,${y(d.artist)})`}>
          <rect
            fill="steelblue"
            width={x(d.streams)}
            height={y.bandwidth() - 1}
          />
          <text fill="white" x={x(d.streams)} y={y.bandwidth() / 2} dy="0.35em">
            {d.artist}
          </text>
        </g>
      ))}
    </svg>
  )
  // }
}

const mapState = state => {
  return {
    topCharts: state.topCharts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchTopTen: () => dispatch(fetchTopTen())
  }
}

export default connect(mapState, mapDispatch)(Example)

// sample chart for audio features
// https://www.d3-graph-gallery.com/spider.html

// usage of transitions
// https://www.d3-graph-gallery.com/graph/interactivity_transition.html
