import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'
import {fetchTopTen} from '../store/topCharts'
import {default as Example} from './example'
import {Route, Switch} from 'react-router-dom'
import {default as UserTopArtists} from './UserTopArtists'
import {default as Sidebar} from './sidebar'

export class DisplayPage extends React.Component {
  // state to define what graph we're showing
  // this.state.graph = graph1
  // this.state.graph = graph2

  componentDidMount() {
    this.props.fetchTopTen()
    if (this.props.user._id) {
      this.props.fetchTopArtist()
    }
  }

  render() {
    return (
      <div>
        {/* <Sidebar /> */}
        <Switch>
          {this.props.user._id && (
            <Switch>
              <UserTopArtists />
            </Switch>
          )}
          <Route component={Example} />
        </Switch>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    topArtists: state.topArtists,
    topCharts: state.topCharts
  }
}

const mapDIspatch = dispatch => {
  return {
    fetchTopArtist: () => dispatch(fetchTopArtist()),
    fetchTopTen: () => dispatch(fetchTopTen())
  }
}

export default connect(mapState, mapDIspatch)(DisplayPage)
