import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {fetchTopTen} from '../store/topCharts'

export class Example extends React.Component {
  constructor(props) {
    super(props)
    this.width = 420
  }
  componentDidMount() {
    this.props.fetchTopTen()
  }

  render() {
    let x
    let y
    if (this.props.topCharts.length) {
      x = d3
        .scaleLinear()
        .domain([0, d3.max(this.props.topCharts, d => d.streams)])
        .range([0, this.width])
      y = d3
        .scaleBand()
        .domain(this.props.topCharts.map(d => d.artist))
        .range([0, 20 * this.props.topCharts.length])
    }

    return this.props.topCharts.length ? (
      <svg
        width={this.width}
        height={y.range()[1]}
        fontFamily="sans-serif"
        fontSize="10"
        textAnchor="end"
      >
        {this.props.topCharts.map((d, i) => (
          <g key={i} transform={`translate(0,${y(d.artist)})`}>
            <rect
              fill="steelblue"
              width={x(d.streams)}
              height={y.bandwidth() - 1}
            />
            <text
              fill="white"
              x={x(d.streams)}
              y={y.bandwidth() / 2}
              dy="0.35em"
            >
              {d.artist}
            </text>
          </g>
        ))}
      </svg>
    ) : (
      <div>nothing here</div>
    )
  }
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
