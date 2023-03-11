import React, { useState } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'
import nigeria from '../../utils/others/gadm41_NGA_12.json'

export const Tp = () => {
  const width = 960
  const height = 600

  const projection = d3
    .geoAlbers()
    .center([0, 9])
    .rotate([-8, 0])
    .parallels([5, 11])
    .scale(1200)
    .translate([width / 2, height / 2])

  const topology = topojson.topology({ nigeria: nigeria })
  const geoData = topojson.feature(topology, topology.objects.nigeria).features

  const colorScale = d3
    .scaleLinear()
    .domain([0, 10, 20])
    .range(['#f7fbff', '#6baed6', '#08306b'])

  // eslint-disable-next-line no-unused-vars
  const [selectedData, setSelectedData] = useState(null)

  const handleClick = (d) => {
    console.log(d)
    setSelectedData(d)
  }

  return (
    <svg width={width} height={height}>
      {geoData.map((d, i) => {
        console.log(d)

        return (
          <path
            key={i}
            d={d3.geoPath().projection(projection)(d)}
            fill={colorScale(i)}
            stroke='#fff'
            strokeWidth={0.5}
            onClick={() => handleClick(d)}
          />
        )
      })}
    </svg>
  )
}
