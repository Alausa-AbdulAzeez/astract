import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import nigeriaData from '../../utils/others/gadm41_NGA_12.json'

const NigeriaMap = () => {
  const svgRef = useRef(null)
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const width = svg.node().clientWidth
    const height = svg.node().clientHeight

    const projection = d3
      .geoMercator()
      .center([8.6753, 9.082])
      .translate([width / 2, height / 2])
      .scale(1000)

    const path = d3.geoPath().projection(projection)

    const g = svg.append('g')

    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on('zoom', () => {
        if (svgRef.current) {
          g.attr('transform', d3.event.transform)
          setZoomLevel(d3.event.transform.k)
        }
      })

    svg.call(zoom)

    g.selectAll('path')
      .data(nigeriaData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .style('fill', 'grey')
      .style('stroke', 'white')
      .style('stroke-width', '0.5px')
  })

  const handleZoomIn = () => {
    console.log(svgRef.current)
    d3.select(svgRef.current).call(
      d3
        .zoom()
        .scaleBy(svgRef.current, 2)
        .on('zoom', () => {
          setZoomLevel(d3.event.transform.k)
        })
    )
  }

  const handleZoomOut = () => {
    d3.select(svgRef.current).call(
      d3
        .zoom()
        .scaleBy(svgRef.current, 0.5)
        .on('zoom', () => {
          setZoomLevel(d3.event.transform.k)
        })
    )
  }

  return (
    <div>
      <svg ref={svgRef} width='500' height='500'>
        <g />
      </svg>
      <div>
        <button onClick={handleZoomIn} disabled={zoomLevel >= 8}>
          Zoom In
        </button>
        <button onClick={handleZoomOut} disabled={zoomLevel <= 1}>
          Zoom Out
        </button>
      </div>
    </div>
  )
}

export default NigeriaMap
