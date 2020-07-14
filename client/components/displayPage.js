import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'
import {fetchAudioFeatures} from '../store/audioFeatures'
import {setAudioFeature} from '../store/currentAudioFeature'
import {Route, Switch} from 'react-router-dom'
import {default as UserTopArtists} from './userTopArtists'
import {default as SingleTopArtist} from './singleTopArtist'
import {default as DefaultAudioFeatures} from './audioFeatures'
import {fetchUserAudioFeatures} from '../store/userAudioFeatureData'
import {default as UserAudioFeatures} from './userAudioFeatures'

const defaultSettings = {
  feature: 'danceability',
  sort: 'position',
  page: 0
}

export class DisplayPage extends React.Component {
  async componentDidMount() {
    await this.props.fetchAudioFeatures()
    await this.props.setAudioFeature(
      this.props.audioFeatureData,
      defaultSettings
    )
    if (this.props.user._id) {
      await this.props.fetchTopArtist()
      await this.props.fetchUserAudioFeatures()
      await this.props.setAudioFeature(
        this.props.userAudioFeatureData,
        defaultSettings
      )
    }
  }

  render() {
    return (
      <div id="displayPage">
        <Switch>
          {this.props.user._id && (
            <Switch>
              <Route
                exact
                path="/top-global"
                component={DefaultAudioFeatures}
              />
              <Route
                exact
                path="/my-audio-features"
                component={UserAudioFeatures}
              />
              <Route path="/:artist" component={SingleTopArtist} />
              <Route component={UserTopArtists} />
            </Switch>
          )}
          <Route component={DefaultAudioFeatures} />
        </Switch>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    topArtists: state.topArtists,
    audioFeatureData: state.audioFeatureData,
    userAudioFeatureData: state.userAudioFeatureData
  }
}

const mapDispatch = dispatch => {
  return {
    fetchTopArtist: () => dispatch(fetchTopArtist()),
    fetchAudioFeatures: () => dispatch(fetchAudioFeatures()),
    setAudioFeature: (data, settings) =>
      dispatch(setAudioFeature(data, settings)),
    fetchUserAudioFeatures: () => dispatch(fetchUserAudioFeatures())
  }
}

export default connect(mapState, mapDispatch)(DisplayPage)
