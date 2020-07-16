import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

const width = 1200
const height = 1600

const partition1 = data => {
  const root = d3
    .hierarchy(data, d => d.topTracks)
    .sum(d => d.pop)
    .sort((a, b) => b.popularity - a.popularity || b.value - a.value)
  return d3.partition().size([height, (root.height + 1) * width / 2])(root)
}

const artistTopSongs = props => {
  const artist = props.singleTopArtist
  console.log(artist)
  const color = d3.scaleOrdinal(
    d3.quantize(d3.interpolateRainbow, artist.topTracks.length + 1) //use css to chnage the color
  )
  const root = partition1(artist)
  const svgDataArr = root.descendants()
  console.log({svgDataArr})
  return (
    <svg
      viewBox={`0,0,${width},${height}`}
      preserveAspectRatio="none"
      width="60vw" //Change the view scaling here!
      height="100%"
    >
      {svgDataArr.map((d, index, arr) => (
        <g key={d.data.name} transform={`translate(${d.y0},${d.x0})`}>
          <rect
            className={d.data.name
              .toLowerCase()
              .split(' ')
              .join('-')}
            width={d.y1 - d.y0}
            height={index === 0 ? d.x1 - d.x0 : arr[1].x1 - arr[1].x0}
            fillOpacity={0.3}
            fill={!d.depth ? '#ccc' : color(d.data.name)}
          />
          <foreignObject
            width={`${d.y1 - d.y0}px`}
            height={`${d.x1 - d.x0 - 26}px`}
            x="0"
            y="12"
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              className="foreignDiv"
              height={index === 0 ? '1600px' : null}
            >
              {/* <p>{d.data.name}</p> */}
              <div className="card topSongs">
                {index === 0 ? (
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        src={d.data.images[0].url}
                        alt={d.data.name + ' Image'}
                      />
                    </figure>
                  </div>
                ) : null}
                <div className="card-content">
                  <div className="media top-song-list">
                    {index > 0 ? (
                      <div className="media-content">
                        <p className="title is-4"> {d.data.name}</p>
                        <p className="subtitle is-6">
                          Popularity: {d.data.popularity}
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <div className="content">
                    {index > 0 ? (
                      <iframe
                        src={`https://open.spotify.com/embed/track/${
                          d.data.id
                        }`}
                        width="100%"
                        frameBorder="0"
                        allowTransparency="true"
                        allow="encrypted-media"
                      />
                    ) : (
                      <div />
                    )}

                    <br />
                  </div>
                </div>
              </div>
            </div>
          </foreignObject>
        </g>
      ))}
    </svg>
  )
}

const mapState = state => ({
  singleTopArtist: state.singleTopArtist
})

export default connect(mapState, null)(artistTopSongs)
