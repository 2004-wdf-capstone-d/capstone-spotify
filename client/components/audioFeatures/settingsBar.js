import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {setAudioFeature, setBlankFeature} from '../../store/currentAudioFeature'
import {selectTrack} from '../../store/selectedTrack'

const SettingsBar = props => {
  const {
    dataSet,
    currentAudioFeature,
    setAudioFeature,
    selectTrack,
    setBlankFeature
  } = props
  const [feature, setFeature] = useState('danceability')
  const [sort, setSort] = useState('position')
  const [page, setPage] = useState(0)
  const [settings, setSettings] = useState({
    feature,
    sort,
    page
  })

  useEffect(
    () => {
      setSettings({feature, sort, page})
    },
    [feature]
  )

  useEffect(
    () => {
      setSettings({feature, sort, page})
    },
    [sort]
  )

  useEffect(
    () => {
      setSettings({feature, sort, page})
    },
    [page]
  )

  useEffect(
    () => {
      if (dataSet.length) {
        setAudioFeature(dataSet, settings)
      } else {
        setBlankFeature()
      }
    },
    [settings]
  )

  const handleSelectedTrack = event => {
    selectTrack(dataSet, event.target.value, page)
  }

  return (
    <section>
      <h3 className="is-size-4 mb-2">Audio Feature: {feature}</h3>
      <div className="level my-2">
        <div className="level-left">
          <div className="level-item mr-2">
            <label className="is-size-6 has-text-left mr-2">
              Change Feature
            </label>
            <select
              name="Feature"
              className="select"
              onChange={event => {
                setFeature(event.target.value)
              }}
            >
              <option value="danceability">Danceability</option>
              <option value="energy">Energy</option>
              <option value="speechiness">Speechiness</option>
              <option value="acousticness">Acousticness</option>
              <option value="liveness">Liveness</option>
              <option value="valence">Valence</option>
            </select>
          </div>
          <div className="level-item mx-2">
            <label className="is-size-6 has-text-left ml-4 mr-2">Sort By</label>
            <select
              name="Sort"
              className="select"
              onChange={event => {
                setSort(event.target.value)
              }}
            >
              <option value="position">Chart Ranking</option>
              <option value="descending">High to Low</option>
              <option value="ascending">Low to High</option>
            </select>
          </div>
          <div className="level-item mx-2">
            <label className="is-size-6 ml-4 mr-2">Page</label>
            <select
              name="Page"
              className="select"
              onChange={event => {
                setPage(parseInt(event.target.value))
              }}
            >
              {dataSet
                .filter((track, index) => {
                  return index % 10 === 0
                })
                .map((track, index) => {
                  return (
                    <option key={index} value={index * 10}>
                      {index * 10 + 1} - {index * 10 + 10}
                    </option>
                  )
                })}
            </select>
          </div>
        </div>
      </div>
      <div className="level my-4">
        <div className="level-left">
          <div className="level-item mr-2">
            <label className="is-size-6 has-text-left mr-2">
              Select a Track
            </label>
            <select
              name="select-track"
              className="select"
              onChange={event => {
                handleSelectedTrack(event)
              }}
            >
              {currentAudioFeature.map(track => {
                return (
                  <option key={track.trackId} value={track.trackId}>
                    {track.artist} - "{track.trackName}"
                  </option>
                )
              })}
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapState = state => {
  return {
    currentAudioFeature: state.currentAudioFeature
  }
}

const mapDispatch = dispatch => {
  return {
    setAudioFeature: (data, settings) =>
      dispatch(setAudioFeature(data, settings)),
    selectTrack: (data, trackId, page) =>
      dispatch(selectTrack(data, trackId, page)),
    setBlankFeature: () => dispatch(setBlankFeature())
  }
}

export default connect(mapState, mapDispatch)(SettingsBar)
