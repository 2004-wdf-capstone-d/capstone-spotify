import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {setAudioFeature} from '../../store/currentAudioFeature'

const SettingsBar = props => {
  const {data, page, setPage} = props

  const [feature, setFeature] = useState('danceability')
  const [sort, setSort] = useState('position')
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
    <section>
      <h3 className="is-size-4 mb-2">Audio Feature: {feature}</h3>
      <div className="level my-4">
        <div className="level-left">
          <div className="level-item select is-small">
            <select
              name="Feature"
              className="change-audio-feature"
              onChange={event => {
                setFeature(event.target.value)
              }}
            >
              <option>Change Feature</option>
              <option value="danceability">Danceability</option>
              <option value="energy">Energy</option>
              <option value="speechiness">Speechiness</option>
              <option value="acousticness">Acousticness</option>
              <option value="liveness">Liveness</option>
              <option value="valence">Valence</option>
            </select>
          </div>
          <div className="level-item select is-small">
            <select
              name="Sort"
              className="af-value-sorter"
              onChange={event => {
                setSort(event.target.value)
              }}
            >
              <option>Sort By</option>
              <option value="position">Chart Ranking</option>
              <option value="descending">High to Low</option>
              <option value="ascending">Low to High</option>
            </select>
          </div>
          <div className="level-item select is-small">
            <select
              name="Page"
              className="af-pager"
              onChange={event => {
                setPage(parseInt(event.target.value))
              }}
            >
              <option>Page By</option>
              {data
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
    </section>
  )
}

const mapDispatch = dispatch => {
  return {
    setAudioFeature: (data, settings) =>
      dispatch(setAudioFeature(data, settings))
  }
}

export default connect(null, mapDispatch)(SettingsBar)
