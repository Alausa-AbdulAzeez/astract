import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import * as topojson from 'topojson-client'
import nigeriaData from '../../utils/others/gadm41_NGA_12.json'

const NigeriaMap = () => {
  const [geoData, setGeoData] = useState(null)

  useEffect(() => {
    // Convert TopoJSON to GeoJSON format
    const geojson = topojson.feature(nigeriaData, nigeriaData.objects.NGA_adm1)

    // Add a property to GeoJSON feature for displaying on choropleth map
    geojson.features.forEach((feature) => {
      const stateName = feature.properties.NAME_1
      const statePopulation = populationData[stateName]
      feature.properties.population = statePopulation
    })

    setGeoData(geojson)
  }, [])

  const populationData = {
    // Population data for each Nigerian state
  }

  return (
    <MapContainer
      center={[9.082, 8.6753]}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: '100vh' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      {geoData && (
        <GeoJSON
          data={geoData}
          style={(feature) => ({
            fillColor: getColor(feature.properties.population),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
          })}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(
              `<strong>${feature.properties.NAME_1}</strong><br />
               Population: ${feature.properties.population.toLocaleString()}`
            )
          }}
        />
      )}
    </MapContainer>
  )
}

// Define color scale for choropleth map
const getColor = (population) => {
  return population > 5000000
    ? '#800026'
    : population > 2000000
    ? '#BD0026'
    : population > 1000000
    ? '#E31A1C'
    : population > 500000
    ? '#FC4E2A'
    : population > 200000
    ? '#FD8D3C'
    : population > 100000
    ? '#FEB24C'
    : population > 50000
    ? '#FED976'
    : '#FFEDA0'
}

export default NigeriaMap
