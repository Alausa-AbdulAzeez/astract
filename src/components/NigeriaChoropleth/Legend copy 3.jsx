import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import nigeriaData from '../../utils/others/gadm41_NGA_12.json'
// import { ZoomIn, ZoomOut } from 'react-d3-zoom'
import './legend.scss'
import VoteCountBox from '../voteCountBox/VoteCountBox'

const MapChart3 = () => {
  // const mapRef = useRef()

  const [showVoteCountBox, setSHowVoteCountBox] = useState(false)
  const [state, setState] = useState(null)

  const APC = [
    'Adamawa',
    'Sokoto',
    'Kebbi',
    'Zamfara',
    'Katsina',
    'Kano',
    'Bauchi',
    'Plateau',
    'Nasarawa',
    'Niger',
    'Kaduna',
    'FederalCapitalTerritory',
    'Osun',
    'Oyo',
    'Ogun',
    'Lagos',
  ]
  const PDP = ['Yobe', 'Gombe', 'Adamawa', 'Taraba']
  const LP = [
    'Borno',
    'Kwara',
    'Kogi',
    'Benue',
    'Ekiti',
    'Ondo',
    'Delta',
    'Imo',
    'CrossRiver',
    'Enugu',
    'Anambra',
    'Edo',
    'Rivers',
    'Ebonyi',
    'Abia',
    'AkwaIbom',
    'Bayelsa',
  ]

  const politicalParties = ['APC', 'LP', 'PDP']

  // const [zoom, setZoom] = useState(1)

  const svgRef = useRef(null)

  // const zoomIn = () => {
  //   setFitSizeX((prev) => prev + 100)
  //   setFitSizeY((prev) => prev + 100)
  //   setScale((prev) => prev + 100)
  // }

  // const zoomOut = () => {
  //   setZoom(zoom / 2)
  // }

  function handleZoom(e) {
    d3.selectAll('.zoom').attr('transform', e.transform)
  }

  const zoom = d3.zoom().scaleExtent([0.25, 1.3]).on('zoom', handleZoom)

  function zoomIn() {
    d3.selectAll('.state').transition().call(zoom.scaleBy, 1.1)
  }
  function zoomOut() {
    d3.selectAll('.state').transition().call(zoom.scaleBy, 0.9)
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // Set up the projection and path generator
    // const projection = d3
    //   .geoMercator()
    //   .center([8, 10])
    //   .scale(3200)
    //   .translate([width, height / 2])
    const projection = d3.geoMercator().scale(3300).translate([50, 900])
    // const projection = d3
    //   .geoMercator()
    //   .fitSize([800, 800], nigeriaData)
    //   .translate([0, 1000])

    const pathGenerator = d3.geoPath().projection(projection)

    // Create a color scale for the map
    const colorScale = d3
      .scaleOrdinal()
      .domain(politicalParties)
      .range(['#64CCFF', '#0AA83F', '#D62B3C'])

    // Add the map to the SVG
    svg
      .selectAll('.state')
      .data(nigeriaData.features)
      .join('path')
      .attr('class', 'state')
      .attr('d', pathGenerator)
      .style('fill', (d) => {
        if (APC.includes(d.properties.NAME_1)) {
          return '#64CCFF'
        }
        if (PDP.includes(d.properties.NAME_1)) {
          return '#0AA83F'
        }
        if (LP.includes(d.properties.NAME_1)) {
          return '#D62B3C'
        } else {
          return '#fff'
        }
      })
      // .style('fill', (d, index) => colorScale(index))
      .style('stroke', 'black')
      .style('stroke-width', 0.5)
      // eslint-disable-next-line no-unused-vars
      .on('mouseover', (event, d) => {
        const a = d3.select(event.currentTarget).style('opacity', 0.5)

        d3.select(event.currentTarget).style('opacity', 0.5)
        setSHowVoteCountBox(true)
        setState(a._groups[0][0].__data__.properties.NAME_1)
      })
      // eslint-disable-next-line no-unused-vars
      .on('mouseout', (event, d) => {
        d3.select(event.currentTarget).style('opacity', 1)
        setSHowVoteCountBox(false)
      })
    svg
      .selectAll('text')
      .data(nigeriaData.features)
      .enter()
      .append('text')
      .attr('class', 'state-label')
      .text((d) => d.properties.NAME_1)
      .attr('x', (d) => {
        if (
          d.properties.NAME_1 === 'Adamawa' ||
          d.properties.NAME_1 === 'Kebbi' ||
          d.properties.NAME_1 === 'CrossRiver'
        ) {
          return pathGenerator.centroid(d)[0] - 30
        } else {
          return pathGenerator.centroid(d)[0] - 10
        }
      })
      .attr('y', (d) => {
        return pathGenerator.centroid(d)[1]
      })
      // .attr('x', (d) => pathGenerator.centroid(d)[1])
      // .attr('y', (d) => pathGenerator.centroid(d)[1])
      .style('font-size', '10px')

    // Add a legend to the SVG
    const legend = svg.append('g').attr('id', 'legend')

    legend
      .selectAll('rect')
      .data(politicalParties)
      .enter()
      .append('rect')
      .attr('x', 900)
      .attr('y', function (d, i) {
        return 500 + i * (50 + 5)
      })
      .attr('width', 32)
      .attr('height', 24)
      .attr('fill', colorScale)

    legend
      .selectAll('text')
      .data(politicalParties)
      .join('text')
      .attr('x', 950)
      .attr('y', function (d, i) {
        return 520 + i * (50 + 5)
      })
      .text((d) => d)
      .attr('fill', '#57656B')
      // .style('stroke', 'white')
      .style('font-size', '14px')
  }, [])

  return (
    <div className='mapWrapper'>
      <div className='zoomWrapper'>
        <div onClick={zoomIn} className='zoomIn'>
          +
        </div>
        <div onClick={zoomOut} className='zoomOut'>
          -
        </div>
        {/* <div onClick={zoomOut} className='zoomOut'>
          -
        </div> */}
      </div>
      {/* <ZoomIn onClick={zoomIn} />
      <ZoomOut /> */}
      <svg ref={svgRef} width='80%' height='100%' className='zoom' />
      {showVoteCountBox && <VoteCountBox state={state} />}
    </div>
  )
}

export default MapChart3
