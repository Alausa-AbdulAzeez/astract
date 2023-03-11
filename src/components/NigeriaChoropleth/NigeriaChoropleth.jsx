import React, { useState, useEffect } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import { scaleQuantize } from 'd3-scale'
import { json } from 'd3-fetch'
import a from '../../utils/others/gadm41_NGA_12.json'

const NigeriaChoropleth = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    // Load data from JSON file
    // eslint-disable-next-line no-unused-vars
    json(a).then((data) => {
      setData(a)
    })
  }, [])

  // Define color scale
  const colorScale = scaleQuantize()
    .domain([0, 100]) // Change domain as per your data
    .range(['#F1EEF6', '#D7B5D8', '#DF65B0', '#DD1C77', '#980043'])

  return (
    <ComposableMap
      data-tip=''
      projectionConfig={{ scale: 1000 }}
      width={800}
      height={600}
    >
      <ZoomableGroup>
        <Geographies geography={a.features}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateData = data.find(
                (d) => d.state === geo.properties.NAME_1
              )
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={stateData ? colorScale(stateData.value) : '#EEE'}
                  stroke='#FFF'
                />
              )
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  )
}

export default NigeriaChoropleth

// import React, { useEffect, useRef } from 'react'
// import a from '../../utils/nigeria_geojson.geojson'
// import * as d3 from 'd3'

// // eslint-disable-next-line react/prop-types
// const NigeriaMap = ({ data }) => {
//   const svgRef = useRef()

//   useEffect(() => {
//     const svg = d3.select(svgRef.current)

//     // Define the map projection and path generator
//     const projection = d3.geoMercator().scale(1200).translate([250, 350])
//     const pathGenerator = d3.geoPath().projection(projection)

//     // Load the geojson data for Nigeria
//     d3.json(a).then((geojsonData) => {
//       // Create a color scale for the choropleth map
//       const colorScale = d3
//         .scaleSequential()
//         .interpolator(d3.interpolateYlOrRd)
//         .domain([0, d3.max(data, (d) => d.value)])

//       // Create a tooltip for displaying the data value on hover
//       const tooltip = d3
//         .select('body')
//         .append('div')
//         .attr('class', 'tooltip')
//         .style('opacity', 0)

//       // Draw the map
//       svg
//         .selectAll('path')
//         .data(geojsonData.features)
//         .enter()
//         .append('path')
//         .attr('d', pathGenerator)
//         .attr('fill', (d) => {
//           // Find the corresponding data value for this state
//           // eslint-disable-next-line react/prop-types
//           const value = data.find((s) => s.state === d.properties.name).value
//           return colorScale(value)
//         })
//         .on('mouseover', (event, d) => {
//           // Show the tooltip on hover
//           tooltip.transition().duration(200).style('opacity', 0.9)
//           tooltip
//             .html(
//               `${d.properties.name}: ${
//                 // eslint-disable-next-line react/prop-types
//                 data.find((s) => s.state === d.properties.name).value
//               }`
//             )
//             .style('left', `${event.pageX}px`)
//             .style('top', `${event.pageY - 28}px`)
//         })
//         .on('mouseout', () => {
//           // Hide the tooltip on mouseout
//           tooltip.transition().duration(500).style('opacity', 0)
//         })
//     })
//   }, [data])

//   return (
//     <svg
//       ref={svgRef}
//       width={500}
//       height={500}
//       viewBox='0 0 500 500'
//       preserveAspectRatio='xMidYMid meet'
//     />
//   )
// }

// export default NigeriaMap
