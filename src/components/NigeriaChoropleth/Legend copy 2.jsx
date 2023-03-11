import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import nigeriaData from '../../utils/others/gadm41_NGA_12.json'
// import { ZoomIn, ZoomOut } from 'react-d3-zoom'
import './legend.scss'

const MapChart3 = () => {
  // const mapRef = useRef()

  const APC = ['Abia', 'Adamawa']
  const PDP = ['AkwaIbom', 'Anambra']

  const [zoom, setZoom] = useState(1)
  const [fitSizeX, setFitSizeX] = useState(800)
  const [fitSizeY, setFitSizeY] = useState(800)
  const [scale, setScale] = useState(3800)
  const svgRef = useRef(null)

  const zoomIn = () => {
    setFitSizeX((prev) => prev + 100)
    setFitSizeY((prev) => prev + 100)
    setScale((prev) => prev + 100)
  }

  const zoomOut = () => {
    setZoom(zoom / 2)
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // Set up the projection and path generator
    // const projection = d3
    //   .geoMercator()
    //   .center([8, 10])
    //   .scale(3200)
    //   .translate([width, height / 2])
    const projection = d3.geoMercator().scale(scale).translate([300, 700])
    // const projection = d3
    //   .geoMercator()
    //   .fitSize([fitSizeX, fitSizeY], nigeriaData)
    //   .translate([0, 1000])

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
      .style('fill', (d) => {
        if (APC.includes(d.properties.NAME_1)) {
          return 'red'
        }
        if (PDP.includes(d.properties.NAME_1)) {
          return '#103d1d'
        }
      })
      // .style('fill', (d, index) => colorScale(index))
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
      .selectAll('text')
      .data(nigeriaData.features)
      .enter()
      .append('text')
      .attr('class', 'state-label')
      .text((d) => d.properties.NAME_1)
      .attr('x', (d) => pathGenerator.centroid(d)[0])
      .attr('y', (d) => pathGenerator.centroid(d)[1])
      .style('stroke', 'white')
      .style('font-size', '10px')

    svg.size

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
  }, [fitSizeY, fitSizeX, scale])

  useEffect(() => {
    console.log(fitSizeX, fitSizeY, scale)
  }, [fitSizeY, fitSizeX, scale])

  return (
    <>
      <div className='zoomWrapper'>
        <div onClick={zoomIn} className='zoomIn'>
          +
        </div>
        <div onClick={zoomOut} className='zoomOut'>
          -
        </div>
      </div>
      {/* <ZoomIn onClick={zoomIn} />
      <ZoomOut /> */}
      <svg ref={svgRef} width='100%' height='100%' />
    </>
  )
}

export default MapChart3
