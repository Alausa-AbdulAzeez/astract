import React, { useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { f } from '../../utils/others/nigeria_state_boundaries copy'

// const nigeriaData = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       properties: {
//         name: 'Abia',
//         value: 30,
//       },
//       geometry: {
//         type: 'Polygon',
//         coordinates: [
//           [
//             [7.364123, 5.009052],
//             [7.389032, 5.009052],
//             [7.389032, 5.03198],
//             [7.364123, 5.03198],
//             [7.364123, 5.009052],
//           ],
//         ],
//       },
//     },
//     // Add more states data here...
//   ],
// }

const ChoroplethMap2 = () => {
  const [activeState, setActiveState] = useState(null)

  const onEachState = (state, layer) => {
    layer.on({
      mouseover: () => {
        setActiveState(state)
      },
      mouseout: () => {
        setActiveState(null)
      },
    })
  }

  const getColor = (value) => {
    return value > 50
      ? '#800026'
      : value > 40
      ? '#BD0026'
      : value > 30
      ? '#E31A1C'
      : value > 20
      ? '#FC4E2A'
      : value > 10
      ? '#FD8D3C'
      : '#FEB24C'
  }

  const style = (feature) => {
    const { value } = feature.properties
    return {
      fillColor: getColor(value),
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    }
  }

  const legend = () => {
    const grades = [0, 10, 20, 30, 40, 50]
    const labels = []

    for (let i = 0; i < grades.length; i++) {
      const from = grades[i]
      const to = grades[i + 1]
      labels.push(
        <div key={i}>
          <i style={{ backgroundColor: getColor(from + 1) }}></i>
          {`${from} ${to ? `- ${to}` : '+'}`}
        </div>
      )
    }

    return <div className='legend'>{labels}</div>
  }

  return (
    <div className='map-container'>
      <MapContainer
        center={[9.082, 8.6753]}
        zoom={6}
        minZoom={6}
        maxZoom={18}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        <GeoJSON data={f} style={style} onEachFeature={onEachState} />

        {activeState && (
          <div className='state-label'>
            <h4>{activeState.properties.name}</h4>
            <p>{`Value: ${activeState.properties.value}`}</p>
          </div>
        )}

        {legend()}
      </MapContainer>
    </div>
  )
}

export default ChoroplethMap2
