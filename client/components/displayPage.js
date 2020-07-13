import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtist} from '../store/user-topArtist'
import {fetchAudioFeatures} from '../store/audioFeatures'
import {setAudioFeature} from '../store/currentAudioFeature'
import {Route, Switch} from 'react-router-dom'
import {default as UserTopArtists} from './userTopArtists'
import {default as Sidebar} from './sidebar'
import {default as SingleTopArtist} from './singleTopArtist'
import {default as DefaultAudioFeatures} from './audioFeatures'

export class DisplayPage extends React.Component {
  async componentDidMount() {
    await this.props.fetchAudioFeatures()
    await this.props.setAudioFeature(this.props.audioFeatureData, {
      feature: 'danceability',
      sort: 'position',
      page: 0
    })
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
              <Route path="/top-ten-global" component={DefaultAudioFeatures} />
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
    audioFeatureData: state.audioFeatureData
  }
}

const mapDispatch = dispatch => {
  return {
    fetchTopArtist: () => dispatch(fetchTopArtist()),
    fetchAudioFeatures: () => dispatch(fetchAudioFeatures()),
    setAudioFeature: (data, settings) =>
      dispatch(setAudioFeature(data, settings))
  }
}

export default connect(mapState, mapDispatch)(DisplayPage)
