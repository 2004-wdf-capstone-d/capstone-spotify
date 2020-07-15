import React from 'react'
import {connect} from 'react-redux'
import {setTopArtist} from '../store/singleTopArtist'
import history from '../history'

const UserTopArtists = props => {
  return (
    <div>
      {props.topArtists.map(artist => (
        <div
          className="card"
          key={artist.id}
          onClick={() => {
            props.setTopArtist(artist)
          }}
        >
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img
                    src={
                      artist.images.length ? artist.images[2].url : 'no image'
                    }
                  />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4"> {artist.name}</p>
                <p className="subtitle is-6">subtitle</p>
              </div>
            </div>
            <div className="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapState = state => {
  return {
    topArtists: state.topArtists,
    singleTopArtist: state.singleTopArtist
  }
}

const mapDispatch = dispatch => ({
  setTopArtist: artist => {
    dispatch(setTopArtist(artist))
    history.push(`/${artist.id}`)
  }
})

export default connect(mapState, mapDispatch)(UserTopArtists)
