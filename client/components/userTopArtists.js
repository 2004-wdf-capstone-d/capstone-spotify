import React from 'react'
import {connect} from 'react-redux'
import {setTopArtist} from '../store/singleTopArtist'
import history from '../history'
import {Link} from 'react-router-dom'

const UserTopArtists = props => {
  return (
    <div className="mt-4">
      {props.topArtists.map(artist => (
        <Link
          key={artist.id}
          to={`/${artist.id}`}
          onClick={() => {
            props.setTopArtist(artist)
          }}
        >
          <div className="card has-background-white-ter has-text-grey">
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
                  <p className="subtitle is-6 mb-1">
                    Genre: {artist.genres.slice(0, 3).join(', ')}
                  </p>
                  <p className="subtitle is-6">
                    Followers: {artist.followers.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
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
  }
})

export default connect(mapState, mapDispatch)(UserTopArtists)
