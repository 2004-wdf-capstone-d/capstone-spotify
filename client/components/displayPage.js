import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'
import {fetchAudioFeatures} from '../store/audioFeatures'
import {defaultAudioFeature} from '../store/currentAudioFeature'
import {Route, Switch} from 'react-router-dom'
import {default as UserTopArtists} from './userTopArtists'
import {default as Sidebar} from './sidebar'
import {default as AudioFeatures} from './audioFeatures'

export class DisplayPage extends React.Component {
  async componentDidMount() {
    await this.props.fetchAudioFeatures()
    await this.props.defaultAudioFeature()
    if (this.props.user._id) {
      await this.props.fetchTopArtist()
    }
  }

  render() {
    return (
      <div id="displayPage">
        <Sidebar />
        <Switch>
          {this.props.user._id && (
            <Switch>
              <Route path="/top-ten-global" component={AudioFeatures} />
              <Route component={UserTopArtists} />
            </Switch>
          )}
          <Route component={AudioFeatures} />
        </Switch>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    topArtists: state.topArtists
  }
}

const mapDispatch = dispatch => {
  return {
    fetchTopArtist: () => dispatch(fetchTopArtist()),
    fetchAudioFeatures: () => dispatch(fetchAudioFeatures()),
    defaultAudioFeature: () => dispatch(defaultAudioFeature())
  }
}

export default connect(mapState, mapDispatch)(DisplayPage)
