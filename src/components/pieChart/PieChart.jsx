import React, { useState } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'ACCEPTED VOTES', value: 160512222, color: '#449352' },
  { name: 'REJECTED VOTES', value: 8400000, color: '#E30325' },
]

const doughnutTitle1 = 'TOTAL VOTES'
const doughnutTitle2 = '168,912,222'

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)

  const sx = cx + (outerRadius - 0) * cos
  const sy = cy + (outerRadius - 0) * sin
  const mx = cx + (outerRadius + 0) * cos
  const my = cy + (outerRadius + 0) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={-10}
        textAnchor='middle'
        fill='#fff'
        fontSize='14px'
        fontWeight={400}
      >
        {doughnutTitle1}
      </text>
      <text
        x={cx}
        y={cy}
        dy={10}
        textAnchor='middle'
        fill='#fff'
        fontSize='16px'
        fontWeight='bold'
      >
        {doughnutTitle2}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.payload.color}
      />
      {/* <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      /> */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={'#A28888'}
        fill='none'
        strokeWidth={'0.25px'}
      />
      <circle cx={ex} cy={ey} r={2} fill={'#A28888'} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='rgba(255, 255, 255, 0.5)'
        fontSize={'10px'}
      >
        {payload.payload.name}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#fff'
        fontSize={'12px'}
      >
        {`${value.toLocaleString()}`}
      </text>
    </g>
  )
}

const DoughnutChart = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (_, index) => {
    // this.setState({
    //   activeIndex: index,
    // })
    setActiveIndex(index)
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart width={100} height={100}>
        <Pie
          activeIndex={[0, 1]}
          activeShape={renderActiveShape}
          data={data}
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={80}
          fill={'#8884d8'}
          dataKey='value'
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default DoughnutChart
