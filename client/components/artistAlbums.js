import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

const artistAlbums = props => {
  // let data = props.singleTopArtist.albums

  let data = {
    name: 'TOPICS',
    children: [
      {
        name: 'Topic A',
        children: [{name: 'Sub A1', size: 4}, {name: 'Sub A2', size: 4}]
      },
      {
        name: 'Topic B',
        children: [
          {name: 'Sub B1', size: 3},
          {name: 'Sub B2', size: 3},
          {
            name: 'Sub B3',
            size: 3
          }
        ]
      },
      {
        name: 'Topic C',
        children: [{name: 'Sub A1', size: 4}, {name: 'Sub A2', size: 4}]
      }
    ]
  }

  let width = 500 // <-- 1
  let height = 500
  let radius = Math.min(width, height) / 2 // < -- 2
  let color = d3.scaleOrdinal(d3.schemeCategory10)

  const partition = d3.partition().size([2 * Math.PI, radius])

  const root = d3.hierarchy(data).sum(d => d.size)
  console.log('ROOT', root)

  console.log('PARTITION(ROOT)', partition(root))

  const arc = d3
    .arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1)

  // const partition = someData => {
  //   const root = d3
  //     .hierarchy(someData)
  //     .sum(d => d.value)
  //     .sort((a, b) => b.value - a.value)
  //   return d3.partition().size([2 * Math.PI, root.height + 1])(root)
  // }

  // const root = partition(data)

  // console.log('ROOT', root)

  // let color = d3.scaleOrdinal(
  //   d3.quantize(d3.interpolateRainbow, data.albums.length)
  // )

  // let format = d3.format(',d')

  // let width = 932

  // let radius = width / 6

  // const arc = d3
  //   .arc()
  //   .startAngle(d => d.x0)
  //   .endAngle(d => d.x1)
  //   .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
  //   .padRadius(radius * 1.5)
  //   .innerRadius(d => d.y0 * radius)
  //   .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${width / 2})`}>
          {root.children.map((child, index) => (
            <path
              key={index}
              data={partition(child)}
              display={child.depth ? null : 'none'}
              d={arc}
              stroke="#fff"
              fill={d => color(d.children ? d : d.parent).data.name}
            />
          ))}
        </g>
      </svg>
    </div>
    // <div>
    //   {artist.albums.map(album => (
    //     <li key={album.id}>
    //       <h2>{album.name}</h2>
    //     </li>
    //   ))}
    // </div>
  )
}

const mapState = state => ({
  singleTopArtist: state.singleTopArtist
})

export default connect(mapState, null)(artistAlbums)

// return (
//   <div>
//     <svg
//       // viewBox={`0 0 ${width} ${width}`}
//       // fontFamily="sans-serif"
//       // fontSize="10"

//     >
//       {/* <g transform={`translate(${width / 2}, ${width / 2})`}>
//         {data.albums.map((album) => (
//           <g key={album.id}>
//             <path
//               fill={(d) => {
//                 while (d.depth > 1) d = d.parent
//                 return color(d.data.name)
//               }}
//               fillOpacity={(d) =>
//                 arcVisible(d.current) ? (d.albums.children ? 0.6 : 0.4) : 0
//               }
//               d={(d) => arc(d.current)}
//             ></path>
//           </g>
//         ))}
//       </g> */}
//     </svg>
//   </div>
