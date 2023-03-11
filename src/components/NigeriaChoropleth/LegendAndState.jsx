import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import nigeriaJson from '../../utils/others/gadm41_NGA_12.json'

const LegendAndState = () => {
  const svgRef = useRef()

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    const width = 800
    const height = 600

    // Define the projection
    const projection = d3
      .geoMercator()
      .center([8, 10])
      .scale(1200)
      .translate([width / 2, height / 2])

    // Define the path generator
    const path = d3.geoPath().projection(projection)

    // Create the color scale
    const colorScale = d3
      .scaleQuantize()
      .domain([0, 100])
      .range([
        '#f7fbff',
        '#deebf7',
        '#c6dbef',
        '#9ecae1',
        '#6baed6',
        '#4292c6',
        '#2171b5',
        '#084594',
      ])

    // Load the Nigeria GeoJSON data
    // d3.json(nigeriaJson).then((data) => {
    // Draw the map
    svg
      .selectAll('path')
      .data(nigeriaJson.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', (d) => colorScale(d.properties.value))
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)

    // Add state names as labels
    svg
      .selectAll('text')
      .data(nigeriaJson.features)
      .enter()
      .append('text')
      .attr('class', 'state-label')
      .text((d) => d.properties.NAME_1)
      .attr('x', (d) => path.centroid(d)[0])
      .attr('y', (d) => path.centroid(d)[1])
    // })
  }, [])

  return <svg ref={svgRef} width='800' height='600'></svg>
}

export default LegendAndState
