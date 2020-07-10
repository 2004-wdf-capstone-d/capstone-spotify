import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'
import {fetchTopTen} from '../store/topCharts'
import {fetchAudioFeatures} from '../store/audioFeatures'
import {default as Example} from './example'
import {Route, Switch} from 'react-router-dom'
import {default as UserTopArtists} from './userTopArtists'
import {default as Sidebar} from './sidebar'

export class DisplayPage extends React.Component {
  async componentDidMount() {
    await this.props.fetchTopTen()
    await this.props.fetchAudioFeatures()
    if (this.props.user._id) {
      await this.props.fetchTopArtist()
    }
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Switch>
          {this.props.user._id && (
            <Switch>
              <Route path="/top-ten-global" component={Example} />
              <Route component={UserTopArtists} />
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
    topCharts: state.topCharts,
    audioFeatures: state.audioFeatures
  }
}

const mapDIspatch = dispatch => {
  return {
    fetchTopArtist: () => dispatch(fetchTopArtist()),
    fetchTopTen: () => dispatch(fetchTopTen()),
    fetchAudioFeatures: () => dispatch(fetchAudioFeatures())
  }
}

export default connect(mapState, mapDIspatch)(DisplayPage)
