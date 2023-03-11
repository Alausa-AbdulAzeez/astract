import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import nigeriaData from '../../utils/others/gadm41_NGA_12.json'

const MapChart = () => {
  const mapRef = useRef()

  useEffect(() => {
    const svg = d3.select(mapRef.current)

    // Set up the projection and path generator
    const projection = d3.geoMercator().scale(2700).translate([300, 700])
    // const projection = d3.geoMercator().fitSize([600, 600], nigeriaData)

    const pathGenerator = d3.geoPath().projection(projection)

    // Create a color scale for the map
    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateYlOrRd)
      .domain([0, 100])

    // Add the map to the SVG
    svg
      .selectAll('.state')
      .data(nigeriaData.features)
      .join('path')
      .attr('class', 'state')
      .attr('d', pathGenerator)
      .style('fill', (d) => colorScale(d.properties.ISO_1))
      .style('stroke', 'white')
      .style('stroke-width', 0.5)
      // eslint-disable-next-line no-unused-vars
      .on('mouseover', (event, d) => {
        d3.select(event.currentTarget).style('opacity', 0.5)
      })
      // eslint-disable-next-line no-unused-vars
      .on('mouseout', (event, d) => {
        d3.select(event.currentTarget).style('opacity', 1)
      })
    svg
      .append('text')
      .attr('x', function (d) {
        return pathGenerator.centroid(d)[0]
      })
      .attr('y', function (d) {
        return pathGenerator.centroid(d)[1]
      })
      .text((d) => d)

    // Add a legend to the SVG
    const legend = svg.append('g').attr('id', 'legend')

    legend
      .selectAll('rect')
      .data(colorScale.ticks(10).slice(1))
      .join('rect')
      .attr('height', 10)
      .attr('x', (_, i) => i * 50)
      .attr('width', 50)
      .attr('y', 600)
      .attr('fill', colorScale)

    legend
      .selectAll('text')
      .data(colorScale.ticks(10))
      .join('text')
      .attr('x', (_, i) => i * 50)
      .attr('y', 620)
      .text((d) => d)
  }, [])

  return <svg ref={mapRef} width='100%' height='700' />
}

export default MapChart
