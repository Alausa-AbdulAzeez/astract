import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import nigeriaData from '../../utils/others/gadm41_NGA_12.json'
// import { ZoomIn, ZoomOut } from 'react-d3-zoom'
// import './legend.scss'

const MiniMap = () => {
  // const mapRef = useRef()

  const northCentral = [
    'Benue',
    'FederalCapitalTerritory',
    'Kogi',
    'Kwara',
    'Nasarawa',
    'Niger',
    'Plateau',
  ]

  const northEast = ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe']
  const northWest = [
    'Kaduna',
    'Katsina',
    'Kano',
    'Kebbi',
    'Sokoto',
    'Jigawa',
    'Zamfara',
  ]
  const southEast = ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo']
  const southSouth = [
    'AkwaIbom',
    'Bayelsa',
    'CrossRiver',
    'Delta',
    'Edo',
    'Rivers',
  ]
  const southWest = ['Ekiti', 'Lagos', 'Osun', 'Ondo', 'Ogun', 'Oyo']

  //   const APC = [
  //     'Adamawa',
  //     'Sokoto',
  //     'Kebbi',
  //     'Zamfara',
  //     'Katsina',
  //     'Kano',
  //     'Bauchi',
  //     'Plateau',
  //     'Nasarawa',
  //     'Niger',
  //     'Kaduna',
  //     'FederalCapitalTerritory',
  //     'Osun',
  //     'Oyo',
  //     'Ogun',
  //     'Lagos',
  //   ]
  //   const PDP = ['Yobe', 'Gombe', 'Adamawa', 'Taraba']
  //   const LP = [
  //     'Borno',
  //     'Kwara',
  //     'Kogi',
  //     'Benue',
  //     'Ekiti',
  //     'Ondo',
  //     'Delta',
  //     'Imo',
  //     'CrossRiver',
  //     'Enugu',
  //     'Anambra',
  //     'Edo',
  //     'Rivers',
  //     'Ebonyi',
  //     'Abia',
  //     'AkwaIbom',
  //     'Bayelsa',
  //   ]

  //   const politicalParties = ['APC', 'LP', 'PDP']
  const geoPoliticalZones = [
    'North Central',
    'North East',
    'North West',
    'South East',
    'South South',
    'South West',
  ]

  const candidatesByGeoPoliticalZone = [3000, 3000, 3000, 3000, 3000, 3000]

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

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // Set up the projection and path generator
    const projection = d3
      .geoMercator()
      .center([8, 10])
      .scale(1200)
      .translate([115, 120])
    //   .translate([width, height / 2])
    // const projection = d3.geoMercator().scale(scale).translate([300, 700])
    // const projection = d3
    //   .geoMercator()
    //   .fitSize([800, 600], nigeriaData)
    //   .translate([0, 1000])

    const pathGenerator = d3.geoPath().projection(projection)

    // Create a color scale for the map
    const colorScale = d3
      .scaleOrdinal()
      .domain(geoPoliticalZones)
      .range(['#64CCFF', '#0AA83F', '#D62B3C', '#64CCFF', '#0AA83F', '#D62B3C'])
    // const colorScale = d3
    //   .scaleSequential()
    //   .interpolator(d3.interpolateYlOrRd)
    //   .domain([0, 100])

    // Add the map to the SVG
    svg
      .selectAll('.state')
      .data(nigeriaData.features)
      .join('path')
      .attr('class', 'state')
      .attr('d', pathGenerator)
      .style('fill', (d) => {
        if (northCentral.includes(d.properties.NAME_1)) {
          return '#A163BE'
        }
        if (northEast.includes(d.properties.NAME_1)) {
          return '#449352'
        }
        if (southWest.includes(d.properties.NAME_1)) {
          return '#E30325'
        }
        if (southEast.includes(d.properties.NAME_1)) {
          return '#018796'
        }
        if (northWest.includes(d.properties.NAME_1)) {
          return '#6D769D'
        }
        if (southSouth.includes(d.properties.NAME_1)) {
          return '#2249D1'
        } else {
          return '#fff'
        }
      })
      // .style('fill', (d, index) => colorScale(index))
      .style('stroke', 'white')
      .style('stroke-width', 0.5)

    // const legend = svg.append('g').attr('id', 'legend')

    // legend
    //   .selectAll('rect')
    //   .data(geoPoliticalZones)
    //   .join('rect')
    //   .attr('height', 100)
    //   .attr('x', (_, i) => i * 50)
    //   .attr('width', 50)
    //   .attr('y', 100)
    //   .attr('fill', ' red')
    //   .attr('display', ' block')

    // legend
    //   .selectAll('text')
    //   .data(colorScale.ticks(10))
    //   .join('text')
    //   .attr('x', (_, i) => i * 50)
    //   .attr('y', 320)
    //   .text('(d) => d')
    //   .attr('fill', 'red')

    // Add a legend to the SVG
    const legend = svg.append('g').attr('id', 'legend')

    legend
      .selectAll('rect')
      .data(geoPoliticalZones)
      .enter()
      .append('rect')
      .attr('x', 250)
      .attr('y', function (d, i) {
        return 100 + i * (22 + 5) // The 90 is to adjust the vertical position of the legend and the 22, the spacing between items
      })
      .attr('width', 22)
      .attr('height', 14)
      .attr('fill', colorScale)

    legend
      .selectAll('text')
      .data(geoPoliticalZones)
      .join('text')
      .attr('x', 285)
      .attr('y', function (d, i) {
        return 113 + i * (22 + 5)
      })
      .text((d) => d)
      .attr('fill', '#fff')
      .style('font-size', '12px')

    legend
      .selectAll('.text')
      .data(candidatesByGeoPoliticalZone)
      .join('text')
      .attr('class', 'text')
      // .selectAll('.p')
      // .data(candidatesByGeoPoliticalZone)
      // .append('p')
      .attr('x', 380)
      .attr('y', function (d, i) {
        return 113 + i * (22 + 5)
      })
      .text((d) => d)
      .attr('fill', 'rgba(255, 255, 255, 0.3)')
      .style('font-size', '11px')
  }, [])

  return <svg ref={svgRef} width='100%' height='100%' />
}

export default MiniMap
