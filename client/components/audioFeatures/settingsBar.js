import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {setAudioFeature} from '../../store/currentAudioFeature'

const SettingsBar = props => {
  const {data, page, setPage} = props

  const [feature, setFeature] = useState('danceability')
  const [sort, setSort] = useState('position')
  // const [page, setPage] = useState(0)
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
      props.setAudioFeature(data, settings)
    },
    [settings]
  )

  return (
    <div>
      <h3>Audio Feature: {feature}</h3>

      <div className="audio-feature-settings">
        <div className="settings-row">
          <label htmlFor="change-feature">Change Feature:</label>
          <select
            name="Feature"
            className="change-audio-feature"
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
        <div>
          <label htmlFor="af-value-sorter">Sort by:</label>
          <select
            name="Sort"
            className="af-value-sorter"
            onChange={event => {
              setSort(event.target.value)
            }}
          >
            <option value="position">Chart Ranking</option>
            <option value="descending">High to Low</option>
            <option value="ascending">Low to High</option>
          </select>
        </div>
        <div>
          <label htmlFor="pager">Page:</label>
          <select
            name="Page"
            className="af-pager"
            onChange={event => {
              setPage(parseInt(event.target.value))
            }}
          >
            <option value="0">1 - 10</option>
            <option value="10">11 - 20</option>
            <option value="20">21 - 30</option>
            <option value="30">31 - 40</option>
            <option value="40">41 - 50</option>
            <option value="50">51 - 60</option>
            <option value="60">61 - 70</option>
            <option value="70">71 - 80</option>
            <option value="80">81 - 90</option>
            <option value="90">91 - 100</option>
          </select>
        </div>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    setAudioFeature: (data, settings) =>
      dispatch(setAudioFeature(data, settings))
  }
}

export default connect(null, mapDispatch)(SettingsBar)
